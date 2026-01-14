import { FlexSpacer } from "../FlexSpacer/FlexSpacer";
import styles from "./MsgActionBar.module.css";

export function MsgActionBar() {
  return (
    <div className={`${styles.container}`}>
      <input
        className="baseinput"
        type="text"
        placeholder="Type something, or drop files here"
      />
      <div className={styles.buttonGroup}>
        <div className="basebutton">
          <span className="material-symbols-outlined">attach_file</span>
          Attach files
        </div>
        <FlexSpacer />
        <div className="basebutton">
          <span className="material-symbols-outlined">close</span>
          Clear
        </div>
        <div className="basebutton">
          Send
          <span className="material-symbols-outlined">send</span>
        </div>
      </div>
    </div>
  );
}
