import { useEffect, useRef, useState } from "react";
import type { SectionId } from "../../lib/sections";
import type { RouterState } from "../../hooks/useRouter";

interface StageProps {
  state: RouterState;
  onToggleEntry: (alias: string) => void;
  children: (state: RouterState, onToggleEntry: (alias: string) => void) => React.ReactNode;
  isFirstRender: boolean;
}

export function Stage({ state, onToggleEntry, children, isFirstRender }: StageProps) {
  const [displayed, setDisplayed] = useState<{ sectionId: SectionId; state: RouterState }>({
    sectionId: state.current,
    state,
  });
  const [transitioning, setTransitioning] = useState(false);
  const pendingRef = useRef<RouterState | null>(null);
  const firstRef = useRef(isFirstRender);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      setDisplayed({ sectionId: state.current, state });
      return;
    }

    if (state.current !== displayed.sectionId) {
      pendingRef.current = state;
      setTransitioning(true);
      const t = setTimeout(() => {
        if (pendingRef.current) {
          setDisplayed({ sectionId: pendingRef.current.current, state: pendingRef.current });
          pendingRef.current = null;
        }
        setTransitioning(false);
      }, 120);
      return () => clearTimeout(t);
    } else {
      setDisplayed(d => ({ ...d, state }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.current, state.filter, state.openEntries]);

  return (
    <div className="stage-wrap">
      <div className={`stage${transitioning ? " out" : ""}`} id="stage">
        <div className="stage-inner" id="stage-inner">
          {children(displayed.state, onToggleEntry)}
        </div>
      </div>
    </div>
  );
}
