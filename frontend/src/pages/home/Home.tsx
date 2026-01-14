import { Feed } from "../../components/Feed/Feed";
import { MsgActionBar } from "../../components/MsgActionBar/MsgActionBar";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={`maxwidth basecontainer ${styles.container}`}>
      <Feed />
      <MsgActionBar />
    </div>
  );
}
