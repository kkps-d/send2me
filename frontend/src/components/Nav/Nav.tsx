import styles from "./Nav.module.css";
import { FlexSpacer } from "../FlexSpacer/FlexSpacer";
import { getPreferredColorScheme } from "../../utils/getPreferredColorScheme";
import { useState } from "react";

export function Nav() {
  const [colorTheme, setColorTheme] = useState<"light" | "dark">(
    getPreferredColorScheme()
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
      <FlexSpacer />
      <div className={`basebutton`}>
        <span className="material-symbols-outlined">settings</span>
      </div>
      <div className={`basebutton`} onClick={toggleColorTheme}>
        {colorTheme === "light" ? (
          <span className="material-symbols-outlined">light_mode</span>
        ) : (
          <span className="material-symbols-outlined">dark_mode</span>
        )}
      </div>
      <input className={`baseinput`} type="search" placeholder="Search..." />
    </div>
  );
}
function Logo() {
  return (
    <div
      style={{
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: "1.2rem",
      }}
    >
      Send2Me
    </div>
  );
}
