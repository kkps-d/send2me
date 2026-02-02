import { useState } from "react";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Logo } from "../../components/Logo/Logo";
import styles from "./Login.module.css";
import { Button } from "../../components/Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);

  const { user, login, logout, isLoading } = useAuth();

  console.log(user);

  function onLogin() {
    login(username, password);
  }

  return (
    <div className={`basecontainer ${styles.container}`}>
      <div className={styles.innerContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className="baseinputgroup v">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="baseinput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div className="baseinputgroup v">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="baseinput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>
        <Checkbox
          label="Stay logged in"
          tabIndex={3}
          checked={stayLoggedIn}
          setChecked={setStayLoggedIn}
        />
        <Button
          tabIndex={4}
          onClick={onLogin}
          label="Login"
          loading={isLoading}
          disabled={!(username && password)}
          icon={<span className="material-symbols-outlined">login</span>}
        />
        <button onClick={logout}>Logout</button>
        <div>User: </div>
        <div>{JSON.stringify(user, null, 4)}</div>
      </div>
    </div>
  );
}
