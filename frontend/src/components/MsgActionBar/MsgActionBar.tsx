import { Button } from "../Button/Button";
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
        <Button
          label="Attach Files"
          icon={<span className="material-symbols-outlined">attach_file</span>}
        />
        <FlexSpacer />
        <Button
          label="Clear"
          icon={<span className="material-symbols-outlined">close</span>}
        />
        <Button
          label="Send"
          iconPosition="after"
          icon={<span className="material-symbols-outlined">send</span>}
        />
      </div>
    </div>
  );
}
