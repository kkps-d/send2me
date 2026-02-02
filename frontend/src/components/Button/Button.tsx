import { Spinner } from "../Spinner/Spinner";
import styles from "./Button.module.css";

type ButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  tabIndex?: number;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "before" | "after";
  disabled?: boolean;
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
}: ButtonProps) {
  const _icon = loading ? <Spinner /> : icon || null;

  return (
    <button
      onClick={onClick}
      tabIndex={tabIndex}
      className={`${className} ${styles.container} ${disabled ? styles.disabled : ""}`}
    >
      {iconPosition === "before" && _icon}
      {label}
      {iconPosition === "after" && _icon}
    </button>
  );
}
