// _Components/DialogOpen.tsx
"use client";

import * as React from "react";
import { useDialog } from "../DialogProvider";

// Child must accept onClick/disabled (your Button does)
type ClickableChild = React.ReactElement<{
  onClick?: React.MouseEventHandler<any>;
  disabled?: boolean;
}>;

type DialogTriggerProps = {
  children: ClickableChild;        // exactly one trigger
  content: React.ReactNode;        // dialog content
};

export function DialogTrigger({ children, content }: DialogTriggerProps) {
  const { openDialog } = useDialog();

  const prevOnClick = children.props.onClick;
  const disabled = children.props.disabled;

  const handleClick: React.MouseEventHandler<any> = (e) => {
    // preserve any existing onClick
    prevOnClick?.(e);
    if (e.defaultPrevented || disabled) return;
    openDialog(content);
  };

  // props match the child’s expected shape, so TS is satisfied
  return React.cloneElement(children, { onClick: handleClick });
}