import { useCallback, useEffect, useRef, useState } from "react";
import {
  type SectionId,
  defaultOpenEntries,
  entriesFromUrl,
  filterFromUrl,
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

function syncEntriesToUrl(entries: string[]) {
  const sp = new URLSearchParams(window.location.search);
  if (entries.length) sp.set("e", entries.join(","));
  else sp.delete("e");
  const qs = sp.toString();
  history.replaceState({}, "", qs ? `?${qs}` : window.location.pathname);
}

let filterTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedSyncFilter(filter: string) {
  if (filterTimer) clearTimeout(filterTimer);
  filterTimer = setTimeout(() => {
    const sp = new URLSearchParams(window.location.search);
    if (filter) sp.set("f", filter);
    else sp.delete("f");
    const qs = sp.toString();
    history.replaceState({}, "", qs ? `?${qs}` : window.location.pathname);
  }, 280);
}

export function useRouter() {
  const [state, setState] = useState<RouterState>(readFromUrl);
  const isFirstMount = useRef(true);

  const go = useCallback((id: SectionId, opts?: { replace?: boolean }) => {
    const sp = new URLSearchParams();
    if (id !== "home") sp.set("p", id);
    const defaultEntries = defaultOpenEntries();
    if (defaultEntries.length) sp.set("e", defaultEntries.join(","));
    const qs = sp.toString();
    const url = qs ? `?${qs}` : "/";
    if (opts?.replace) history.replaceState({}, "", url);
    else history.pushState({}, "", url);
    setState({ current: id, filter: "", openEntries: defaultEntries });
  }, []);

  const setFilter = useCallback((f: string) => {
    setState(s => ({ ...s, filter: f }));
    debouncedSyncFilter(f);
  }, []);

  const toggleEntry = useCallback((alias: string) => {
    setState(s => {
      const next = s.openEntries.includes(alias)
        ? s.openEntries.filter(a => a !== alias)
        : [...s.openEntries, alias];
      syncEntriesToUrl(next);
      return { ...s, openEntries: next };
    });
  }, []);

  useEffect(() => {
    isFirstMount.current = false;
    const onPop = () => setState(readFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return { state, go, setFilter, toggleEntry, isFirstMount };
}
