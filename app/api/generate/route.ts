import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  // 1. Parse body
  const { prompt, aspectRatio = "16:9" } = await request.json();

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "프롬프트를 입력해주세요." }, { status: 400 });
  }

  // 2. Verify user via Bearer token
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "인증이 만료되었습니다." }, { status: 401 });
  }

  // 3. Insert pending record
  const { data: record, error: insertError } = await supabase
    .from("thumbils")
    .insert({ user_id: user.id, prompt, status: "processing" })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: "DB 오류가 발생했습니다." }, { status: 500 });
  }

  try {
    // 4. Call Gemini gemini-3-pro-image-preview (Nano Banana Pro)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio },
      },
    });

    // 5. Extract base64 image from response
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    let imageBase64: string | null = null;

    for (const part of parts) {
      if (part.inlineData?.data) {
        imageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!imageBase64) {
      await supabase.from("thumbils").update({ status: "failed" }).eq("id", record.id);
      return NextResponse.json({ error: "이미지를 생성하지 못했습니다." }, { status: 500 });
    }

    // 6. Upload to Supabase Storage: images/{user_id}/{timestamp}.png
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const fileName = `${user.id}/${Date.now()}.png`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, { contentType: "image/png" });

    if (uploadError) {
      await supabase.from("thumbils").update({ status: "failed" }).eq("id", record.id);
      return NextResponse.json({ error: "파일 업로드에 실패했습니다." }, { status: 500 });
    }

    // 7. Get public URL
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);

    // 8. Update record to completed
    const { data: updated } = await supabase
      .from("thumbils")
      .update({ image_path: fileName, image_url: publicUrl, status: "completed" })
      .eq("id", record.id)
      .select()
      .single();

    return NextResponse.json({ thumbil: updated });
  } catch (err) {
    await supabase.from("thumbils").update({ status: "failed" }).eq("id", record.id);
    console.error("[generate] Gemini error:", err);
    return NextResponse.json({ error: "AI 서버 오류가 발생했습니다." }, { status: 500 });
  }
}
