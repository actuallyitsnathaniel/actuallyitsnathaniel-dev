import type { IconBaseProps } from "react-icons";

export const UnqorkIcon = ({ size = 24, style, ...props }: IconBaseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={style}
    {...props}
  >
    <path d="M6.5 4.5v9.25c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V4.5h-3.25v9.25a2.25 2.25 0 0 1-4.5 0V4.5H6.5Z" />
  </svg>
);
