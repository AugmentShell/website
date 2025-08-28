"use client";

import { defaultMessage } from "../../_Animations/messages";
import TerminalTyper from "../../_Animations/TerminalTyper";
import type { ComponentProps } from "react";

type TyperProps = ComponentProps<typeof TerminalTyper>;
type LinesProp = TyperProps["linesToType"];

type TerminalWindowProps = {
  className?: string;
  linesToType?: LinesProp; // optional, with a default below
};

export default function DialogTerminal({ className = "", linesToType=defaultMessage }: TerminalWindowProps) {

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={
          // defaults, followed by your overrides so they win
          `h-[75vh] w-full bg-[#2a2b2a] border-8 px-0.5 border-black rounded terminal ${className}`
        }
      >
        <div className="body-2 h-full">
            <TerminalTyper
              typingSpeed={2}
              eraseSpeed={1}
              linePause={50}
              linesToType={linesToType}
            />
        </div>
      </div>
    </div>
  );
}