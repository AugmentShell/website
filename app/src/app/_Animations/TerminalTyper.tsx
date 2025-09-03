"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Line = { text: string; color?: string };
type Phase = "typing" | "awaitErase" | "erasing" | "done";

interface TerminalTyperProps {
  linesToType: Line[];
  typingSpeed?: number;                 // ms per character (typing)
  eraseSpeed?: number;                  // ms per character (erasing)
  linePause?: number;                   // ms pause between lines while typing
  eraseTrigger?: boolean;               // external: when true AFTER typing finishes, start erasing
  setEraseTrigger?: (b: boolean) => void; // optional: reset to false on mount
  cursorDelay?: number;                 // ms to delay showing the cursor during pauses (default 500)
  onEraseComplete?: (done: boolean) => void;
  setEraseDone?: (done: boolean) => void;

  /** NEW: typing completion notifications */
  onTypeComplete?: (done: boolean) => void;
  setTypeDone?: (done: boolean) => void;

  className?: string;                   // extra classes for outer wrapper
}

const TerminalTyper: React.FC<TerminalTyperProps> = ({
  linesToType,
  typingSpeed = 20,
  eraseSpeed = 15,
  linePause = 800,
  eraseTrigger,
  setEraseTrigger,
  cursorDelay = 500,
  onEraseComplete,
  setEraseDone,

  // NEW
  onTypeComplete,
  setTypeDone,

  className = "",
}) => {
  // ---------- NEW: "sourceLines" is what we are currently typing toward ----------
  const [sourceLines, setSourceLines] = useState<Line[]>(() => linesToType);
  const [queuedLines, setQueuedLines] = useState<Line[] | null>(null);

  // phases
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
  const hasMountedRef = useRef<boolean>(false);

  // NEW: guard for external trigger rising-edge
  const prevEraseTriggerRef = useRef<boolean | undefined>(eraseTrigger);

  // NEW: idempotency for erasing timeouts
  const erasingRunRef = useRef(0);

  // NEW: fire "typing done" exactly once per typing run
  const typeDoneFiredRef = useRef<boolean>(false);

  const hasLines = sourceLines.length > 0;

  const activeObj: Line = useMemo(
    () =>
      hasLines && lineIndex < sourceLines.length
        ? sourceLines[lineIndex]
        : { text: "" },
    [hasLines, lineIndex, sourceLines]
  );
  const activeText = activeObj.text ?? "";

  // Non-interactive (no text selection or pointer changes), but allow scrolling
  const nonInteractive = "select-none [cursor:default]";

  // Reset external eraseTrigger on mount so each new instance starts clean
  useEffect(() => {
    if (setEraseTrigger) setEraseTrigger(false);
    hasMountedRef.current = true;
    // also ensure typing-done can fire on the first run
    typeDoneFiredRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Cursor helpers (delayed show during pauses) ----------
  const clearCursorTimer = useCallback(() => {
    if (cursorTimerRef.current) {
      window.clearTimeout(cursorTimerRef.current);
      cursorTimerRef.current = null;
    }
  }, []);

  const disarmCursor = useCallback(() => {
    clearCursorTimer();
    setShowCursor(false);
  }, [clearCursorTimer]);

  const armCursorAfterDelay = useCallback(() => {
    clearCursorTimer();
    cursorTimerRef.current = window.setTimeout(() => setShowCursor(true), cursorDelay);
  }, [clearCursorTimer, cursorDelay]);

  useEffect(() => () => clearCursorTimer(), [clearCursorTimer]);

  // ---------- Track if user is pinned to bottom (<= 2px tolerance) ----------
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

  // ---------- Auto-scroll ONLY while typing (and only if already pinned) ----------
  useEffect(() => {
    if (phase !== "typing") return;
    const el = containerRef.current;
    if (!el) return;
    if (userPinnedBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [phase, typedLines, currentLine]);

  // ---------- Helper: force-enter erasing (commit currentLine first if needed) ----------
  const forceStartErasing = useCallback(() => {
    if (phase === "erasing") return;

    setTypedLines((prev) => {
      const next = [...prev];
      if (phase === "typing" && currentLine.length > 0) {
        next.push({ text: currentLine, color: activeObj.color });
      }
      return next;
    });

    setTimeout(() => {
      setEraseLineIndex(() => (typedLines.length + (phase === "typing" && currentLine ? 1 : 0)) - 1);
      const lastText =
        (phase === "typing" && currentLine
          ? currentLine
          : typedLines[typedLines.length - 1]?.text) ?? "";
      setEraseCharIndex(lastText.length);
      setCurrentLine("");
      setCharIndex(0);
      setPhase("erasing");
      disarmCursor();
    }, 0);
  }, [phase, currentLine, activeObj.color, typedLines, disarmCursor]);

  // ---------- detect prop changes; queue & trigger erase-then-retype ----------
  const incomingSignature = useMemo(
    () => linesToType.map((l) => `${l.text}§${l.color ?? ""}`).join("\n"),
    [linesToType]
  );
  const prevSignatureRef = useRef<string>(incomingSignature);

  useEffect(() => {
    if (!hasMountedRef.current) return;
    if (incomingSignature === prevSignatureRef.current) return;

    setQueuedLines(linesToType);
    forceStartErasing();
    prevSignatureRef.current = incomingSignature;
  }, [incomingSignature, linesToType, forceStartErasing]);

  // ---------- Reset "typing-done" flag when a new typing run begins ----------
  useEffect(() => {
    if (phase === "typing" && lineIndex === 0 && charIndex === 0) {
      typeDoneFiredRef.current = false;
    }
  }, [phase, lineIndex, charIndex]);

  // ---------- TYPING ----------
  useEffect(() => {
    if (phase !== "typing" || !hasLines) return;
    if (lineIndex >= sourceLines.length) return;

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
    const isLast = lineIndex === sourceLines.length - 1;
    const t = window.setTimeout(() => {
      setTypedLines((prev) => [...prev, { text: activeText, color: activeObj.color }]);
      setCurrentLine("");
      setCharIndex(0);

      if (!isLast) {
        setLineIndex((i) => i + 1);
        disarmCursor();
      } else {
        setPhase("awaitErase");
        armCursorAfterDelay();

        // NEW: Notify parent exactly once when typing all lines is done
        if (!typeDoneFiredRef.current) {
          typeDoneFiredRef.current = true;
          onTypeComplete?.(true);
          setTypeDone?.(true);
        }
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
    sourceLines.length,
    activeObj.color,
    armCursorAfterDelay,
    disarmCursor,
    onTypeComplete,
    setTypeDone,
  ]);

  // ---------- START ERASING (external trigger path) with rising-edge guard ----------
  useEffect(() => {
    const prev = prevEraseTriggerRef.current;
    prevEraseTriggerRef.current = eraseTrigger;

    if (phase !== "awaitErase") return;
    // Only react when eraseTrigger flips from false/undefined -> true
    if (!eraseTrigger || prev === true) return;

    setPhase("erasing");
    setEraseLineIndex(typedLines.length - 1);
    setEraseCharIndex((typedLines[typedLines.length - 1]?.text ?? "").length);
    disarmCursor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, eraseTrigger, typedLines]);

  // ---------- ERASING (idempotent with runId; no nested setState) ----------
  useEffect(() => {
    if (phase !== "erasing") return;

    // Only the latest run's timeout is allowed to commit updates
    const runId = ++erasingRunRef.current;

    if (eraseLineIndex < 0) {
      disarmCursor();

      if (!eraseDoneFiredRef.current) {
        eraseDoneFiredRef.current = true;
        onEraseComplete?.(true);
        setEraseDone?.(true);
      }

      if (queuedLines && queuedLines.length > 0) {
        setSourceLines(queuedLines);
        setQueuedLines(null);

        setTypedLines([]);
        setLineIndex(0);
        setCharIndex(0);
        setCurrentLine("");

        // start a fresh typing run → reset guards
        typeDoneFiredRef.current = false;
        eraseDoneFiredRef.current = false;

        setPhase("typing");
        return;
      }

      setPhase("done");
      return;
    }

    const t = window.setTimeout(() => {
      // ignore stale timeout or phase change mid-flight
      if (erasingRunRef.current !== runId || phase !== "erasing") return;

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
        // Remove last line, then update indices separately (no nested setState)
        const nextLines = typedLines.slice(0, -1);
        const nextIdx = nextLines.length - 1;
        const nextLen = nextIdx >= 0 ? (nextLines[nextIdx]?.text ?? "").length : 0;

        setTypedLines(nextLines);
        setEraseLineIndex(nextIdx);
        setEraseCharIndex(nextLen);
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
    disarmCursor,
    queuedLines,
  ]);

  return (
    <div
      ref={containerRef}
      className={[
        "body-2 min-h-0 h-full w-[90%] max-w-none min-w-0",
        "overflow-y-auto no-scrollbar overscroll-auto",
        "text-left font-mono",
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
      {phase === "typing" && lineIndex < sourceLines.length && (
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