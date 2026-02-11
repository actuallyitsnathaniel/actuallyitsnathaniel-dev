import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

export type LogType = "info" | "fetch" | "event" | "system";

export interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  message: string;
}

interface ActivityLogContextType {
  logs: LogEntry[];
  log: (type: LogType, message: string) => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | null>(null);

const MAX_LOG_ENTRIES = 50;

const formatTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const ActivityLogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const log = useCallback((type: LogType, message: string) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: formatTimestamp(),
      type,
      message,
    };

    setLogs((prev) => {
      const newLogs = [...prev, entry];
      // Keep only the last MAX_LOG_ENTRIES to prevent memory growth
      return newLogs.slice(-MAX_LOG_ENTRIES);
    });
  }, []);

  const value = useMemo(() => ({ logs, log }), [logs, log]);

  return (
    <ActivityLogContext.Provider value={value}>
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = (): ActivityLogContextType => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error("useActivityLog must be used within an ActivityLogProvider");
  }
  return context;
};
