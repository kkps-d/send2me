import styles from "./Spinner.module.css";

type SpinnerProps = {
  fontSize?: string;
  fullscreen?: boolean;
};

export function Spinner({ fontSize, fullscreen = false }: SpinnerProps) {
  const span = (
    <span
      style={fontSize ? { fontSize } : {}}
      className={styles.container}
    ></span>
  );

  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <span
          style={fontSize ? { fontSize } : {}}
          className={styles.container}
        ></span>
      </div>
    );
  } else {
    return span;
  }
}
