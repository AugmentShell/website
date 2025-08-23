"use client";

import * as React from "react";

type InfoStackProps = React.PropsWithChildren;

export const InfoStack = ({ children }: InfoStackProps) => {
  return <div className="flex flex-col">{children}</div>;
};