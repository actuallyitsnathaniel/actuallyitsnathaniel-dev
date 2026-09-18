import { useCallback, useRef, useState } from "react";
import type { SectionId } from "../../lib/sections";
import type { RouterState } from "../../hooks/useRouter";
import { useCommands } from "../../hooks/useCommands";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useActivityLog, type LogType } from "../../context/ActivityLogContext";
import type { ThemeName } from "../../hooks/useTheme";
import type { PromptMode } from "../../lib/prompt";
import { StatusBar } from "./StatusBar";
import { FilterBar } from "./FilterBar";
import { ChipNav } from "./ChipNav";
import { Stage } from "./Stage";
import { HelpOverlay } from "./HelpOverlay";
import { LogOverlay } from "./LogOverlay";
import { useResumeDownload } from "../../hooks/useResumeDownload";

interface ShellProps {
  routerState: RouterState;
  go: (id: SectionId) => void;
  setFilter: (f: string) => void;
  toggleEntry: (alias: string) => void;
  crt: boolean;
  onToggleCrt: () => void;
  setTheme: (t: ThemeName) => void;
  currentTheme: ThemeName;
  isFirstRender: boolean;
  children: (state: RouterState, onToggleEntry: (alias: string) => void) => React.ReactNode;
}

export function Shell({
  routerState, go, setFilter, toggleEntry,
  crt, onToggleCrt, setTheme, currentTheme, isFirstRender, children,
}: ShellProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpOpenWithThemes, setHelpOpenWithThemes] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<SectionId | null>(null);
  const [chipNavVisible, setChipNavVisible] = useState(false);
  const [mode, setMode] = useState<PromptMode>("/");
  const [draft, setDraft] = useState("");
  const filterInputRef = useRef<HTMLInputElement | null>(null);
  const { log, clear } = useActivityLog();
  const { downloadResume } = useResumeDownload();

  const logActivity = useCallback((type: LogType, msg: string) => {
    log(type, msg);
  }, [log]);

  const openHelp = useCallback(() => { setHelpOpenWithThemes(false); setHelpOpen(true); }, []);
  const openHelpThemePicker = useCallback(() => { setHelpOpenWithThemes(true); setHelpOpen(true); }, []);
  const openLog = useCallback(() => setLogOpen(true), []);
  const closeOverlays = useCallback(() => {
    setHelpOpen(false);
    setLogOpen(false);
    setHighlightedSection(null);
    setChipNavVisible(false);
  }, []);
  const focusFilter = useCallback((opts?: { mode?: PromptMode }) => {
    if (opts?.mode === ":") {
      setMode(":");
      setDraft("");
    } else if (opts?.mode === "~") {
      setMode("~");
      setDraft("");
    } else if (opts?.mode === "/") {
      setMode("/");
    }
    filterInputRef.current?.focus();
  }, []);

  const navigate = useCallback((id: SectionId) => {
    go(id);
    setMode("/");
    setDraft("");
    setHighlightedSection(null);
    setChipNavVisible(false);
    filterInputRef.current?.blur();
    log("system", `cd ${id === "home" ? "~/" : `~/` + id}`);
  }, [go, log]);

  const { run } = useCommands({
    go: navigate,
    toggleCrt: onToggleCrt,
    setTheme,
    openHelp,
    openLog,
    clearLog: clear,
    downloadResume,
    logActivity,
  });

  useKeyboard({
    go: navigate,
    openHelp,
    closeOverlays,
    focusFilter,
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
            mode={mode}
            onModeChange={setMode}
            filter={routerState.filter}
            onFilterChange={setFilter}
            draft={draft}
            onDraftChange={setDraft}
            onNavigate={navigate}
            onCommand={handleFilterCommand}
            onOpenHelp={openHelp}
            onHighlight={setHighlightedSection}
            onFocusChange={(focused) => { if (focused) setChipNavVisible(true); }}
            onCollapse={() => setChipNavVisible(false)}
            onCloseOverlays={closeOverlays}
            onClearLog={clear}
            inputRef={filterInputRef}
          />
          <div className={chipNavVisible ? "" : "max-sm:hidden"}>
            <ChipNav
              current={routerState.current}
              onNavigate={navigate}
              onCommand={handleChipCommand}
              onOpenThemePicker={openHelpThemePicker}
              highlightedSection={mode === "/" && routerState.filter ? highlightedSection : undefined}
            />
          </div>
        </div>
        <Stage
          state={routerState}
          onToggleEntry={toggleEntry}
          isFirstRender={isFirstRender}
        >
          {children}
        </Stage>
      </div>
      <HelpOverlay
        open={helpOpen}
        onClose={() => { setHelpOpen(false); setHelpOpenWithThemes(false); }}
        setTheme={setTheme}
        currentTheme={currentTheme}
        openThemePicker={helpOpenWithThemes}
      />
      <LogOverlay open={logOpen} onClose={() => setLogOpen(false)} />
    </>
  );
}
