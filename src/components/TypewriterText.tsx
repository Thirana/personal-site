"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ text, delay = 0, speed = 48 }: Props) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<
    "waiting" | "typing" | "blinking" | "done"
  >("waiting");
  const [cursorOn, setCursorOn] = useState(true);

  const prefersReducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setCount(text.length);
      setPhase("done");
      return;
    }

    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      setPhase("typing");
      interval = setInterval(() => {
        setCount((prev) => {
          const next = prev + 1;
          if (next >= text.length) {
            clearInterval(interval);
            setTimeout(() => setPhase("blinking"), 120);
            return text.length;
          }
          return next;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  useEffect(() => {
    if (phase !== "blinking") return;
    let ticks = 0;
    const blink = setInterval(() => {
      setCursorOn((v) => !v);
      ticks++;
      if (ticks >= 6) {
        clearInterval(blink);
        setCursorOn(false);
        setPhase("done");
      }
    }, 480);
    return () => clearInterval(blink);
  }, [phase]);

  const showCursor = phase === "typing" || phase === "blinking";

  return (
    <span className="relative inline-block" aria-label={text}>
      {/* Invisible full text reserves width and height — no layout shift */}
      <span aria-hidden="true" className="invisible select-none">
        {text}
      </span>
      {/* Visible typed text overlaid */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 whitespace-nowrap"
      >
        {text.slice(0, count)}
        {showCursor && (
          <span
            className="ml-[1px] inline-block bg-gl-primary"
            style={{
              width: "2px",
              height: "1.1em",
              verticalAlign: "-0.15em",
              opacity: cursorOn ? 1 : 0,
              transition: phase === "blinking" ? "opacity 100ms ease" : "none",
            }}
          />
        )}
      </span>
    </span>
  );
}
