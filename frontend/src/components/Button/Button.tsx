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
};

export function Button({
  label = "Button",
  onClick = () => {},
  className,
  tabIndex = 0,
  loading = false,
  icon,
  iconPosition = "before",
}: ButtonProps) {
  const _icon = loading ? <Spinner /> : icon || null;

  return (
    <button
      onClick={onClick}
      tabIndex={tabIndex}
      className={`${className} ${styles.container}`}
    >
      {iconPosition === "before" && _icon}
      {label}
      {iconPosition === "after" && _icon}
    </button>
  );
}
