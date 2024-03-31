// MessageComponent.js
import React from "react";
import styles from "./MessageComponent.module.css";

interface AlertAnimationProps {
  isSuccess: boolean;
}

const MessageComponent: React.FC<AlertAnimationProps> = ({ isSuccess }) => {
  return (
    <div className={isSuccess ? styles.success : styles.error}>
      {isSuccess ? (
        <>
          <span className={styles.successIcon}>✓</span>
          <p>Success! Your action was successful.</p>
        </>
      ) : (
        <>
          <span className={styles.errorIcon}>✕</span>
          <p>Error! Something went wrong.</p>
        </>
      )}
    </div>
  );
};

export default MessageComponent;
