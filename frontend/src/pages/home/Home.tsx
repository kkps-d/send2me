import { Feed } from "../../components/Feed/Feed";
import { MsgActionBar } from "../../components/MsgActionBar/MsgActionBar";
import { Nav } from "../../components/Nav/Nav";
import styles from "./Home.module.css";

export function Home() {
  return (
    <>
      <Nav />
      <div className={`maxwidth basecontainer ${styles.container}`}>
        <Feed />
        <MsgActionBar />
      </div>
    </>
  );
}
