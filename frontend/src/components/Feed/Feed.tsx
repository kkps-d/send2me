import styles from "./Feed.module.css";

export function Feed() {
  return (
    <div className={styles.container}>
      <DateDivider date={new Date(2026, 0, 9)} />
      <FeedMessage />
      <FeedMessage />
      <FeedMessage />
      <br />
    </div>
  );
}

const placeholder =
  "This is an example of a text only message that the user sent, this text is able to be a single line message, or can wrap into multiple lines.\n\nA user can edit or delete a text message using the context menu button below. Other types of messsages can have additional context menu items.\n\nIn the future, the context menu will also contain a “Create cURL link” feature to easily download text or file content via the command line.";

function FeedMessage() {
  return (
    <div className={styles.feedMessage}>
      <div className={styles.feedContent}>{placeholder}</div>
      <div className={`basebutton ${styles.feedMessageButton}`}>
        <span className="material-symbols-outlined">more_horiz</span>
        <small>Jan 9, 2025. 07:40 PM</small>
        <div className={styles.feedMessageButtonSeparator}></div>
        <small>14.5 KB</small>
      </div>
    </div>
  );
}

function DateDivider({ date }: { date: Date }) {
  return (
    <small className={styles.dateDivider}>
      {date.toLocaleString("default", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </small>
    // <div>{`${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`}</div>
  );
}
