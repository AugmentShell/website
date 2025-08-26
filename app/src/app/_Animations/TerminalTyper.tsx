"use client";
import React, { useEffect, useRef, useState } from "react";

type Line = { text: string; color?: string };
type Phase = "typing" | "awaitErase" | "erasing" | "done";

interface TerminalTyperProps {
  linesToType: Line[];
  typingSpeed: number;                 // ms per character (typing)
  eraseSpeed: number;                  // ms per character (erasing)
  linePause: number;                   // ms pause between lines while typing
  eraseTrigger: boolean;               // when true AFTER typing finishes, start erasing
  setEraseTrigger?: (b: boolean) => void; // optional: reset to false on mount
  cursorDelay?: number;                // ms to delay showing the cursor during pauses (default 500)
  onEraseComplete?: (done: boolean) => void;
  setEraseDone?: (done: boolean) => void;
  className?: string;                  // extra classes for outer wrapper
}

const TerminalTyper: React.FC<TerminalTyperProps> = ({
  linesToType,
  typingSpeed,
  eraseSpeed,
  linePause,
  eraseTrigger,
  setEraseTrigger,
  cursorDelay,
  onEraseComplete,
  setEraseDone,
  className = "",
}) => {
  const [phase, setPhase] = useState<Phase>("typing");

  // typing state
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [typedLines, setTypedLines] = useState<Line[]>([]);

  // erasing state
  const [eraseLineIndex, setEraseLineIndex] = useState<number>(-1);
  const [eraseCharIndex, setEraseCharIndex] = useState<number>(0);

  // cursor (opacity toggled to avoid layout shift)
  const [showCursor, setShowCursor] = useState<boolean>(false);

  // containers/refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userPinnedBottomRef = useRef<boolean>(true);
  const cursorTimerRef = useRef<number | null>(null);
  const eraseDoneFiredRef = useRef<boolean>(false);

  const cursorDelayMs = cursorDelay ?? 500;

  const hasLines = linesToType.length > 0;
  const activeObj: Line =
    hasLines && lineIndex < linesToType.length ? linesToType[lineIndex] : { text: "" };
  const activeText = activeObj.text ?? "";

  // Non-interactive (no text selection or pointer changes), but allow scrolling
  const nonInteractive = "select-none [cursor:default]";

  // Reset eraseTrigger on mount so each new instance starts clean
  useEffect(() => {
    if (setEraseTrigger) setEraseTrigger(false);
  }, [setEraseTrigger]);

  // Cursor helpers (delayed show during pauses)
  const clearCursorTimer = () => {
    if (cursorTimerRef.current) {
      window.clearTimeout(cursorTimerRef.current);
      cursorTimerRef.current = null;
    }
  };
  const armCursorAfterDelay = () => {
    clearCursorTimer();
    cursorTimerRef.current = window.setTimeout(() => setShowCursor(true), cursorDelayMs);
  };
  const disarmCursor = () => {
    clearCursorTimer();
    setShowCursor(false);
  };

  useEffect(() => () => clearCursorTimer(), []);

  // Track if user is pinned to bottom (<= 2px tolerance)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const delta = el.scrollHeight - el.scrollTop - el.clientHeight;
      userPinnedBottomRef.current = delta <= 2;
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll ONLY while typing (and only if already pinned)
  useEffect(() => {
    if (phase !== "typing") return;
    const el = containerRef.current;
    if (!el) return;
    if (userPinnedBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [phase, typedLines, currentLine]);

  // ---------- TYPING ----------
  useEffect(() => {
    if (phase !== "typing" || !hasLines) return;
    if (lineIndex >= linesToType.length) return;

    // actively typing → hide cursor
    disarmCursor();

    if (charIndex < activeText.length) {
      const t = window.setTimeout(() => {
        setCurrentLine((prev) => prev + activeText[charIndex]);
        setCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => window.clearTimeout(t);
    }

    // finished this line → pause (cursor ON after delay), commit, then next or await erase
    armCursorAfterDelay();
    const isLast = lineIndex === linesToType.length - 1;
    const t = window.setTimeout(() => {
      setTypedLines((prev) => [...prev, { text: activeText, color: activeObj.color }]);
      setCurrentLine("");
      setCharIndex(0);

      if (!isLast) {
        setLineIndex((i) => i + 1);
        disarmCursor(); // resume typing → hide cursor again
      } else {
        setPhase("awaitErase");
        armCursorAfterDelay(); // waiting state → cursor after delay
      }
    }, linePause);

    return () => window.clearTimeout(t);
  }, [
    phase,
    hasLines,
    lineIndex,
    charIndex,
    activeText,
    typingSpeed,
    linePause,
    linesToType.length,
    activeObj.color,
  ]);

  // ---------- START ERASING ----------
  useEffect(() => {
    if (phase !== "awaitErase" || !eraseTrigger) return;
    setPhase("erasing");
    setEraseLineIndex(typedLines.length - 1);
    setEraseCharIndex((typedLines[typedLines.length - 1]?.text ?? "").length);
    disarmCursor();
  }, [phase, eraseTrigger, typedLines]);

  // ---------- ERASING ----------
  useEffect(() => {
    if (phase !== "erasing") return;

    if (eraseLineIndex < 0) {
      disarmCursor();
      setPhase("done");
      if (!eraseDoneFiredRef.current) {
        eraseDoneFiredRef.current = true;
        onEraseComplete?.(true);
        setEraseDone?.(true);
      }
      return;
    }

    disarmCursor();

    const t = window.setTimeout(() => {
      const lineObj = typedLines[eraseLineIndex] || { text: "" };
      const lineText = lineObj.text ?? "";

      if (eraseCharIndex > 0) {
        setTypedLines((prev) => {
          const out = [...prev];
          const obj = { ...(out[eraseLineIndex] || { text: "" }) };
          obj.text = lineText.slice(0, eraseCharIndex - 1);
          out[eraseLineIndex] = obj;
          return out;
        });
        setEraseCharIndex((c) => c - 1);
      } else {
        setTypedLines((prev) => {
          const out = prev.slice(0, -1);
          const nextIdx = out.length - 1;
          setEraseLineIndex(nextIdx);
          setEraseCharIndex(nextIdx >= 0 ? (out[nextIdx]?.text ?? "").length : 0);
          return out;
        });
      }
    }, eraseSpeed);

    return () => window.clearTimeout(t);
  }, [
    phase,
    eraseLineIndex,
    eraseCharIndex,
    typedLines,
    eraseSpeed,
    onEraseComplete,
    setEraseDone,
  ]);

  return (
    <div
      ref={containerRef}
      className={[
        // overflow-safe container: works inside flex parents
        "min-h-0 h-full w-[90%] max-w-none min-w-0",
        // vertical scroll; hide scrollbar; **let browser chain scroll to page**
        "overflow-y-auto no-scrollbar overscroll-auto",
        // text flow + look
        "text-left font-mono",
        // prevent selection/pointer changes but keep scroll working
        nonInteractive,
        className,
      ].join(" ")}
      style={{ height: "100%" }}
    >
      {/* committed history */}
      {typedLines.map((ln, i) => (
        <div
          key={i}
          className="block w-full min-w-0 whitespace-normal break-normal [hyphens:none] pointer-events-none"
          style={ln.color ? { color: ln.color } : undefined}
        >
          <span className="inline">{ln.text}</span>
          {((phase === "erasing" && i === eraseLineIndex) ||
            (phase === "awaitErase" && i === typedLines.length - 1)) && (
            <span
              className={`caret-fixed [font-size:inherit] [line-height:inherit] align-baseline ${
                showCursor ? "caret-blink opacity-100" : "opacity-0"
              }`}
            >
              █
            </span>
          )}
        </div>
      ))}

      {/* active typing line */}
      {phase === "typing" && lineIndex < linesToType.length && (
        <div
          className="block w-full min-w-0 whitespace-normal break-normal [hyphens:none] pointer-events-none"
          style={activeObj.color ? { color: activeObj.color } : undefined}
        >
          <span className="inline">{currentLine}</span>
          <span
            className={`caret-fixed [font-size:inherit] [line-height:inherit] align-baseline ${
              showCursor ? "caret-blink opacity-100" : "opacity-0"
            }`}
          >
            █
          </span>
        </div>
      )}
    </div>
  );
};

export default TerminalTyper;