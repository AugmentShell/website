"use client";

import * as React from "react";

type InfoStackProps = React.PropsWithChildren<{
  className?: string;
}>;

export const InfoStack = ({ children, className }: InfoStackProps) => {
  return <div className={`flex flex-col ${className ?? ""}`}>{children}</div>;
};