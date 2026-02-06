import { type CSSProperties, useEffect, useState, type RefObject } from "react";
import { Button, type ButtonProps } from "../../Button/Button";
import styles from "./ContextMenu.module.css";

type ContextMenuProps = {
  children: React.ReactNode;
  anchorRef: RefObject<HTMLElement | null>;
  anchorPosition?: "left" | "right";
};
export function ContextMenu({
  children,
  anchorRef,
  anchorPosition = "left",
}: ContextMenuProps) {
  const [style, setStyle] = useState<CSSProperties>({ display: "none" });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();

      if (anchorPosition === "left") {
        setStyle({ left: rect.left, top: rect.top + rect.height + 10 });
      } else {
        setStyle({
          right: window.innerWidth - rect.right,
          top: rect.top + rect.height + 10,
        });
      }
    }
  }, [anchorPosition, anchorRef]);

  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}

type ContextMenuItemProps = Pick<
  ButtonProps,
  "label" | "onClick" | "className" | "loading" | "icon" | "disabled" | "color"
>;

export function ContextMenuItem({
  label,
  onClick = () => {},
  className,
  loading = false,
  icon,
  disabled = false,
  color,
}: ContextMenuItemProps) {
  return (
    <Button
      align="left"
      label={label}
      onClick={onClick}
      className={`${styles.contextMenuItem} ${className}`}
      loading={loading}
      icon={icon}
      disabled={disabled}
      color={color}
    />
  );
}
