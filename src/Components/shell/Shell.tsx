import { useCallback, useRef, useState } from "react";
import type { SectionId } from "../../lib/sections";
import type { RouterState } from "../../hooks/useRouter";
import { useCommands } from "../../hooks/useCommands";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useActivityLog, type LogType } from "../../context/ActivityLogContext";
import type { ThemeName } from "../../hooks/useTheme";
import { StatusBar } from "./StatusBar";
import { FilterBar } from "./FilterBar";
import { ChipNav } from "./ChipNav";
import { Stage } from "./Stage";
import { HelpOverlay } from "./HelpOverlay";
import { ContactOverlay } from "./ContactOverlay";
import { useResumeDownload } from "../../hooks/useResumeDownload";

interface ShellProps {
  routerState: RouterState;
  go: (id: SectionId) => void;
  setFilter: (f: string) => void;
  toggleEntry: (alias: string) => void;
  crt: boolean;
  onToggleCrt: () => void;
  setTheme: (t: ThemeName) => void;
  isFirstRender: boolean;
  children: (state: RouterState, onToggleEntry: (alias: string) => void) => React.ReactNode;
}

export function Shell({
  routerState, go, setFilter, toggleEntry,
  crt, onToggleCrt, setTheme, isFirstRender, children,
}: ShellProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<SectionId | null>(null);
  const filterInputRef = useRef<HTMLInputElement | null>(null);
  const { log } = useActivityLog();
  const { downloadResume } = useResumeDownload();

  const logActivity = useCallback((type: LogType, msg: string) => {
    log(type, msg);
  }, [log]);

  const openHelp = useCallback(() => setHelpOpen(true), []);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeOverlays = useCallback(() => {
    setHelpOpen(false);
    setContactOpen(false);
    setHighlightedSection(null);
  }, []);
  const focusFilter = useCallback(() => {
    filterInputRef.current?.focus();
  }, []);

  const navigate = useCallback((id: SectionId) => {
    go(id);
    setHighlightedSection(null);
    log("system", `cd ${id === "home" ? "~/" : `~/` + id}`);
  }, [go, log]);

  const { run } = useCommands({
    go: navigate,
    toggleCrt: onToggleCrt,
    setTheme,
    openContact,
    openHelp,
    downloadResume,
    logActivity,
  });

  useKeyboard({
    go: navigate,
    openHelp,
    closeOverlays,
    focusFilter,
    run,
  });

  const handleChipCommand = useCallback((cmd: string) => {
    run(cmd);
  }, [run]);

  const handleFilterCommand = useCallback((cmd: string): boolean => {
    return run(cmd);
  }, [run]);

  return (
    <>
      <div className="shell">
        <StatusBar current={routerState.current} crt={crt} onToggleCrt={onToggleCrt} />
        <div className="bar">
          <FilterBar
            current={routerState.current}
            value={routerState.filter}
            onChange={setFilter}
            onNavigate={navigate}
            onCommand={handleFilterCommand}
            onOpenHelp={openHelp}
            onHighlight={setHighlightedSection}
            inputRef={filterInputRef}
          />
          <ChipNav
            current={routerState.current}
            onNavigate={navigate}
            onCommand={handleChipCommand}
            highlightedSection={routerState.filter && !routerState.filter.startsWith(":") && !routerState.filter.startsWith("~") ? highlightedSection : undefined}
          />
        </div>
        <Stage
          state={routerState}
          onToggleEntry={toggleEntry}
          isFirstRender={isFirstRender}
        >
          {children}
        </Stage>
      </div>
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
