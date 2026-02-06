import styles from "./Nav.module.css";
import { FlexSpacer } from "../FlexSpacer/FlexSpacer";
import { getPreferredColorScheme } from "../../utils/getPreferredColorScheme";
import { useRef, useState, type RefObject } from "react";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import { Overlay } from "../Overlay/Overlay";
import { ContextMenu, ContextMenuItem } from "../Overlay/Modals/ContextMenu";

export function Nav() {
  const { user, isLoading } = useAuth();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [overlay, setOverlay] = useState<React.ReactNode>(null);

  const [colorTheme, setColorTheme] = useState<"light" | "dark">(
    getPreferredColorScheme(),
  );

  function toggleColorTheme() {
    setColorTheme((curr) => {
      const theme = curr === "light" ? "dark" : "light";

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      return theme;
    });
  }

  function onClickUserBtn() {
    setOverlay(
      <UserContextMenu
        buttonRef={buttonRef}
        onClose={() => setOverlay(null)}
      />,
    );
  }

  return (
    <div className={`maxwidth basecontainer ${styles.nav}`}>
      <Logo />
      <input
        className={`baseinput ${styles.search}`}
        type="search"
        placeholder="Search..."
      />
      <FlexSpacer />
      <Button
        icon={<span className="material-symbols-outlined">settings</span>}
      />
      <Button
        onClick={toggleColorTheme}
        icon={
          colorTheme === "light" ? (
            <span className="material-symbols-outlined">light_mode</span>
          ) : (
            <span className="material-symbols-outlined">dark_mode</span>
          )
        }
      />
      <Button
        loading={isLoading}
        icon={<span className="material-symbols-outlined">person</span>}
        label={user?.username || "..."}
        ref={buttonRef}
        onClick={onClickUserBtn}
      />
      {overlay}
    </div>
  );
}

type UserContextMenuProps = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  onClose?: () => void;
};

function UserContextMenu({ buttonRef, onClose }: UserContextMenuProps) {
  return (
    <Overlay onClose={onClose}>
      <ContextMenu anchorRef={buttonRef} anchorPosition="right">
        <ContextMenuItem
          label="Settings"
          icon={<span className="material-symbols-outlined">settings</span>}
          onClick={() => console.log("ZAZA")}
        />
        <ContextMenuItem
          label="Sign out"
          color="#FF3B30"
          icon={<span className="material-symbols-outlined">logout</span>}
        />
      </ContextMenu>
    </Overlay>
  );
}
