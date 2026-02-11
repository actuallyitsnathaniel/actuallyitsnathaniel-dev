import React from "react";
import { useActivityLog, LogEntry } from "../../context/ActivityLogContext";

interface LogLineProps {
  entry: LogEntry;
  isCRT: boolean;
}

const LogLine = React.memo<LogLineProps>(({ entry, isCRT }) => (
  <div
    className={`log-line ${isCRT ? "brightness-60 blur-[1.7px] grayscale-50" : ""}`}
  >
    <span className="log-timestamp">{entry.timestamp}</span>
    <span className="log-type">[{entry.type.toUpperCase()}]</span>
    <span className="log-message">{entry.message}</span>
  </div>
));

LogLine.displayName = "LogLine";

interface ActivityLogBackgroundProps {
  isCRT: boolean;
}

export const ActivityLogBackground: React.FC<ActivityLogBackgroundProps> = ({
  isCRT,
}) => {
  const { logs } = useActivityLog();

  return (
    <div className="activity-log-wrapper">
      <div className="activity-log-content">
        {logs.map((log) => (
          <LogLine key={log.id} entry={log} isCRT={isCRT} />
        ))}
      </div>
    </div>
  );
};
