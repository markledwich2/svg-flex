import { Children, ReactNode, SVGProps, useState } from "react";
import { GFlex } from ".";

export const Svg = ({
  sizeMode,
  height,
  children,
  ...props
}: {
  sizeMode: "fit" | "content";
  height?: number;
} & SVGProps<SVGSVGElement>) => {
  const [contentSize, setContentSize] = useState({ width: 400, height: 200 });
  return (
    <svg
      {...props}
      width={sizeMode == "fit" ? "100%" : contentSize.width}
      height={contentSize.height}
    >
      <GFlex>{children}</GFlex>
    </svg>
  );
};
