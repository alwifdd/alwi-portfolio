// src/components/StatusIndicator.tsx
import React from "react";
import styles from "../styles/StatusIndicator.module.css";

interface StatusIndicatorProps {
  text: string;
  isAvailable: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  text,
  isAvailable,
}) => {
  return (
    <div className={styles.statusBox}>
      {isAvailable && <span className={styles.statusDot}></span>}
      <span className={styles.statusText}>{text}</span>
    </div>
  );
};

export default StatusIndicator;
