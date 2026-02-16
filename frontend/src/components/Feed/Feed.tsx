import styles from "./Feed.module.css";
import { useMessages, type MessageDto } from "../../queries/useMessages";

export function Feed() {
  const { messages } = useMessages();

  const components = [];

  let lastDate: string | null = null;

  if (messages) {
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const date = msg.createdAt.toLocaleString("default", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });

      if (!lastDate) {
        lastDate = date;
      } else if (lastDate != date) {
        components.push(<DateDivider key={i} dateString={date} />);
        lastDate = date;
      }
      components.push(<FeedMessage key={msg.messageId} message={msg} />);
    }
  }

  return (
    <div className={styles.container}>
      {components}
      <br />
    </div>
  );
}

const placeholder =
  "This is an example of a text only message that the user sent, this text is able to be a single line message, or can wrap into multiple lines.\n\nA user can edit or delete a text message using the context menu button below. Other types of messsages can have additional context menu items.\n\nIn the future, the context menu will also contain a “Create cURL link” feature to easily download text or file content via the command line.";

type FeedMessageProps = {
  message: MessageDto;
};

function FeedMessage({ message }: FeedMessageProps) {
  return (
    <div className={styles.feedMessage}>
      <div className={styles.feedContent}>{message.content}</div>
      <div className={`basebutton ${styles.feedMessageButton}`}>
        <span className="material-symbols-outlined">more_horiz</span>
        <small>{message.createdAt.toLocaleString()}</small>
        {/* <div className={styles.feedMessageButtonSeparator}></div>
        <small>14.5 KB</small> */}
      </div>
    </div>
  );
}

function DateDivider({ dateString }: { dateString: string }) {
  return <small className={styles.dateDivider}>{dateString}</small>;
}
