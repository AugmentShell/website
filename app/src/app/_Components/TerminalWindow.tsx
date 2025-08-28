"use client";

import { useState } from "react";
import { mixedSuccess, warningMix } from "../_Animations/messages";
import TerminalTyper from "../_Animations/TerminalTyper";
import { Button } from "./Button";

type TerminalWindowProps = {
  /** Applied to the inner terminal panel (overrides width/height, etc.) */
  className?: string;
};

export default function TerminalWindow({ className = "" }: TerminalWindowProps) {
  const [erase, setErase] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={
          // defaults, followed by your overrides so they win
          `h-[75vh] w-[80%] bg-[#2a2b2a] border-8 border-[#1E242080] p-1 rounded terminal ${className}`
        }
      >
        <div className="body-2 h-full">
          {!done && (
            <TerminalTyper
              typingSpeed={2}
              eraseSpeed={1}
              linePause={50}
              eraseTrigger={erase}
              setEraseDone={setDone}
              linesToType={warningMix}
            />
          )}
          {done && (
            <TerminalTyper
              typingSpeed={5}
              eraseSpeed={15}
              linePause={500}
              eraseTrigger={erase}
              setEraseDone={setDone}
              setEraseTrigger={setErase}
              linesToType={mixedSuccess}
            />
          )}
        </div>
      </div>

      {/* on click logic is preventing the button from erasing the second terminal */}
      <Button
        variant={done ? "default" : "warning"}
        className="mt-6"
        onClick={() => {
          if (!done) setErase(true);
        }}
      >
        <h3>ACTIVATE AUGMENTSHELL</h3>
      </Button>
    </div>
  );
}