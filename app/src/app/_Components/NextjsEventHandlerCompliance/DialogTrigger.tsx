"use client";

import * as React from "react";
import { useDialog } from "../DialogProvider";

// Child must accept onClick/disabled (e.g., a <button> or your Button component)
type ClickableProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
};

type ClickableChild = React.ReactElement<ClickableProps>;

type DialogTriggerProps = {
  children: ClickableChild;   // exactly one trigger element
  content: React.ReactNode;   // dialog content
};

export function DialogTrigger({ children, content }: DialogTriggerProps) {
  const { openDialog } = useDialog();

  const prevOnClick = children.props.onClick;
  const disabled = !!children.props.disabled;

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    // preserve any existing onClick
    prevOnClick?.(e);
    if (e.defaultPrevented || disabled) return;
    openDialog(content);
  };

  return React.cloneElement(children, { onClick: handleClick });
}