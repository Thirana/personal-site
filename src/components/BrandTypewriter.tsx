"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const WORDS = ["Blog", "Portfolio", "Projects", "Experience"] as const;
const TYPE_DELAY_MS = 85;
const DELETE_DELAY_MS = 55;
const HOLD_AFTER_TYPING_MS = 4200;
const HOLD_BEFORE_DELETING_MS = 2200;
const WORD_SWITCH_DELAY_MS = 160;

type AnimationPhase = "typing" | "holding" | "deleting";

type BrandTypewriterProps = {
  className?: string;
};

export default function BrandTypewriter({ className }: BrandTypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [phase, setPhase] = useState<AnimationPhase>("typing");

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typedText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        }, TYPE_DELAY_MS);
      } else {
        timeoutId = setTimeout(() => {
          setPhase("holding");
        }, HOLD_AFTER_TYPING_MS);
      }
    } else if (phase === "holding") {
      timeoutId = setTimeout(() => {
        setPhase("deleting");
      }, HOLD_BEFORE_DELETING_MS);
    } else if (typedText.length > 0) {
      timeoutId = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length - 1));
      }, DELETE_DELAY_MS);
    } else {
      timeoutId = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setPhase("typing");
      }, WORD_SWITCH_DELAY_MS);
    }

    return () => clearTimeout(timeoutId);
  }, [phase, typedText, wordIndex]);

  return (
    <>
      <span
        aria-hidden
        className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", className)}
      >
        <span>Thirana&apos;s</span>
        <span className="inline-flex min-w-[10ch] items-center">
          <span>{typedText}</span>
          <span className="animate-cursor-blink ml-0.5 inline-block h-[1em] w-px bg-gl-primary" />
        </span>
      </span>
      <span className="sr-only">Thirana&apos;s personal site</span>
    </>
  );
}
