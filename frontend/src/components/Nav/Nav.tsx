import styles from "./Nav.module.css";
import { FlexSpacer } from "../FlexSpacer/FlexSpacer";
import { getPreferredColorScheme } from "../../utils/getPreferredColorScheme";
import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export function Nav() {
  const { user, isLoading } = useAuth();

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
      />
    </div>
  );
}
