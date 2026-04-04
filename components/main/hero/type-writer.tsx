"use client";

import { ReactTyped } from "react-typed";

interface TypeWriterProps {
  strings: string[];
}

export default function TypeWriter({ strings }: TypeWriterProps) {
  return (
    <ReactTyped
      loop
      typeSpeed={80}
      backSpeed={20}
      strings={strings}
      smartBackspace
      backDelay={1000}
      loopCount={0}
      showCursor
      cursorChar="|"
    />
  );
}
