import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Logo } from "../../components/Logo/Logo";
import styles from "./Login.module.css";

export function Login() {
  return (
    <div className={`basecontainer ${styles.container}`}>
      <div className={styles.innerContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className="baseinputgroup v">
          <label htmlFor="">Username</label>
          <input type="text" className="baseinput" />
        </div>
        <div className="baseinputgroup v">
          <label htmlFor="">Password</label>
          <input type="password" className="baseinput" />
        </div>
        <Checkbox label="Stay logged in" />
        <div className="basebutton">Login</div>
      </div>
    </div>
  );
}
