import { useCallback, useEffect, useRef, useState } from "react";
import {
  type SectionId,
  defaultOpenEntries,
  entriesFromUrl,
  filterFromUrl,
  SECTION_MAP,
  sectionFromUrl,
} from "../lib/sections";

export interface RouterState {
  current: SectionId;
  filter: string;
  openEntries: string[];
}

function readFromUrl(): RouterState {
  return {
    current: sectionFromUrl(),
    filter: filterFromUrl(),
    openEntries: entriesFromUrl().length ? entriesFromUrl() : defaultOpenEntries(),
  };
}

function hrefFor(id: SectionId, filter: string, entries: string[]): string {
  const path = SECTION_MAP[id].href;
  const sp = new URLSearchParams();
  if (filter) sp.set("f", filter);
  if (entries.length) sp.set("e", entries.join(","));
  const qs = sp.toString();
  return qs ? `${path}?${qs}` : path;
}

function syncUrl(id: SectionId, filter: string, entries: string[], replace: boolean) {
  const url = hrefFor(id, filter, entries);
  if (replace) history.replaceState({}, "", url);
  else history.pushState({}, "", url);
}

let filterTimer: ReturnType<typeof setTimeout> | null = null;

export function useRouter() {
  const [state, setState] = useState<RouterState>(readFromUrl);
  const isFirstMount = useRef(true);

  const go = useCallback((id: SectionId, opts?: { replace?: boolean }) => {
    const defaultEntries = defaultOpenEntries();
    syncUrl(id, "", defaultEntries, !!opts?.replace);
    setState({ current: id, filter: "", openEntries: defaultEntries });
  }, []);

  const setFilter = useCallback((f: string) => {
    setState((s) => {
      if (filterTimer) clearTimeout(filterTimer);
      filterTimer = setTimeout(() => syncUrl(s.current, f, s.openEntries, true), 280);
      return { ...s, filter: f };
    });
  }, []);

  const toggleEntry = useCallback((alias: string) => {
    setState((s) => {
      const next = s.openEntries.includes(alias)
        ? s.openEntries.filter((a) => a !== alias)
        : [...s.openEntries, alias];
      syncUrl(s.current, s.filter, next, true);
      return { ...s, openEntries: next };
    });
  }, []);

  useEffect(() => {
    isFirstMount.current = false;
    const sp = new URLSearchParams(window.location.search);
    if (sp.has("p")) {
      const id = sectionFromUrl();
      sp.delete("p");
      const qs = sp.toString();
      history.replaceState({}, "", SECTION_MAP[id].href + (qs ? `?${qs}` : ""));
    }
    const onPop = () => setState(readFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return { state, go, setFilter, toggleEntry, isFirstMount };
}
