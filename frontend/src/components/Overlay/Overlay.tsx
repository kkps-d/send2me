import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";
import { useRef } from "react";

type OverlayProps = {
  children: React.ReactNode;
  showBackground?: boolean;
  centerChildren?: boolean;
  onClose?: () => void;
};

const overlayRoot = document.getElementById("overlay-root");

export function Overlay({
  children,
  showBackground = false,
  centerChildren = false,
  onClose = () => {},
}: OverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!overlayRoot) return null;

  function onClick(e) {
    const { target } = e;
    if (target === containerRef.current) {
      onClose();
    }
  }

  return createPortal(
    <div
      className={`${styles.container} ${
        showBackground ? styles.showBackground : ""
      }`}
      onClick={onClick}
      ref={containerRef}
    >
      {children}
    </div>,
    overlayRoot,
  );
}
