import type { Ref } from "react";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Button.module.css";

export type ButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  tabIndex?: number;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "before" | "after";
  disabled?: boolean;
  align?: "center" | "left" | "right";
  color?: string;
  ref?: Ref<HTMLButtonElement>;
};

export function Button({
  label,
  onClick = () => {},
  className,
  tabIndex = 0,
  loading = false,
  icon,
  iconPosition = "before",
  disabled = false,
  align = "center",
  color,
  ref,
}: ButtonProps) {
  const _icon = loading ? <Spinner /> : icon || null;

  let alignClass = "";

  if (align === "left") {
    alignClass = styles.alignLeft;
  } else if (align === "right") {
    alignClass = styles.alignRight;
  }

  const buttonClassNames = [
    styles.container,
    className ? className : "",
    disabled ? styles.disabled : "",
    iconPosition === "after" ? styles.iconAfter : "",
    !label ? styles.noLabel : "",
    alignClass,
  ];

  return (
    <button
      onClick={onClick}
      tabIndex={tabIndex}
      className={buttonClassNames.join(" ")}
      style={color ? { color } : {}}
      ref={ref}
    >
      {iconPosition === "before" && _icon}
      {label}
      {iconPosition === "after" && _icon}
    </button>
  );
}
