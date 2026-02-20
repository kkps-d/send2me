import styles from "./Feed.module.css";
import { useMessages, type MessageDto } from "../../queries/useMessages";
import { useEffect, useRef } from "react";

export function Feed() {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const { messages } = useMessages();

  const components = [];

  let lastDate: string | null = null;

  if (messages) {
    for (const msg of messages) {
      const date = msg.createdAt.toLocaleString("default", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });

      if (!lastDate) {
        lastDate = date;
      } else if (lastDate != date) {
        components.push(<DateDivider key={date} dateString={date} />);
        lastDate = date;
      }
      components.push(<FeedMessage key={msg.messageId} message={msg} />);
    }
  }

  useEffect(() => anchorRef.current?.scrollIntoView(), [messages]);

  return (
    <div className={styles.container}>
      {components}
      <br />
      <a ref={anchorRef}></a>
    </div>
  );
}

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
