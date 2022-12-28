import { CSSProperties, ReactNode } from "react";

export interface StyleProps<TStyle = CSSProperties> {
  className?: string;
  style?: TStyle;
}

export interface ChildrenProps {
  children?: ReactNode;
}
