import { useState } from "react";
import { Button } from "../Button/Button";
import { FlexSpacer } from "../FlexSpacer/FlexSpacer";
import styles from "./MsgActionBar.module.css";
import { useMessages } from "../../queries/useMessages";

export function MsgActionBar() {
  const [text, setText] = useState("");

  const { createMessage } = useMessages();

  function onSend() {
    // TODO: Need to figure out the scroll to bottom logic
    createMessage(text);
    onClear();
  }

  function onClear() {
    setText("");
  }

  return (
    <div className={`${styles.container}`}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        className="basetextarea"
        placeholder="Type something, or drop files here. Shift + Enter to send."
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
          onClick={onClear}
        />
        <Button
          label="Send"
          iconPosition="after"
          icon={<span className="material-symbols-outlined">send</span>}
          onClick={onSend}
        />
      </div>
    </div>
  );
}
