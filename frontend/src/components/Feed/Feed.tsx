import styles from "./Feed.module.css";
import { useMessages, type MessageDto } from "../../queries/useMessages";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../Spinner/Spinner";

let renderCount = 0;

export function Feed() {
  const feedRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const { messages, queryLoading } = useMessages();

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

  console.log(renderCount++);
  console.log(messages);

  // useEffect(() => anchorRef.current?.scrollIntoView(), [messages]);

  // useEffect(() => {
  //   const elm = feedRef.current;
  //   if (!elm) {
  //     return;
  //   }

  //   function onScroll() {
  //     console.log("scroll", elm!.scrollTop);
  //   }

  //   elm.addEventListener("scroll", onScroll);

  //   return () => {
  //     elm.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  return (
    <div className={styles.container} ref={feedRef}>
      {queryLoading && (
        <div className={styles.loadingSpace}>
          <Spinner fontSize="1.5rem" />
        </div>
      )}

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
