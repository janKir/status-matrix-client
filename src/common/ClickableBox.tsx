import React from "react";
import { css, cx } from "@linaria/core";
import { cssVars } from "../utils/cssVars";

export interface ClickableBoxProps {
  onClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ClickableBox: React.FC<ClickableBoxProps> = ({
  backgroundColor,
  borderColor,
  onClick,
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cx(styles.container, className)}
      style={{
        ...cssVars({
          color: backgroundColor,
          bordercolor: borderColor ?? "transparent",
        }),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const styles = {
  container: css`
    margin: 1px;
    width: 30px;
    height: 20px;
    background-color: var(--color);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--bordercolor);

    &:hover {
      box-shadow: 0 0 3px;
    }
  `,
};
