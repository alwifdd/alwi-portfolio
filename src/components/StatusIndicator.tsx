// src/components/StatusIndicator.tsx
import React from "react";
import styles from "../styles/StatusIndicator.module.css";

interface StatusIndicatorProps {
  text: string;
  isAvailable: boolean;
  showDot?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  text,
  isAvailable,
  showDot = false,
}) => {
  return (
    <div className={styles.statusBox}>
      {showDot && isAvailable && (
        <span className={styles.statusDot}></span>
      )}

      <span className={styles.statusText}>{text}</span>
    </div>
  );
};

export default StatusIndicator;