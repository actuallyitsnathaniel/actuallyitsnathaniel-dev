import { CHIP_SECTIONS, SECTIONS, type Section } from "./sections";
import { commandTakesArg, commandTokens } from "./commands";
import { THEME_NAMES } from "../hooks/useTheme";

export type PromptMode = "/" | ":" | "~";

const NON_TEXT_INPUT = new Set([
  "button",
  "checkbox",
  "radio",
  "submit",
  "hidden",
  "reset",
  "file",
  "image",
]);

export function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  if (el.isContentEditable) return true;
  const role = el.getAttribute("role");
  if (role === "textbox" || role === "searchbox" || role === "combobox") {
    return true;
  }
  const tag = el.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT") return true;
  if (tag === "INPUT") {
    return !NON_TEXT_INPUT.has((el as HTMLInputElement).type);
  }
  return false;
}

export function parseCanonical(line: string): {
  mode: PromptMode;
  payload: string;
} {
  const v = line;
  if (v.startsWith(":")) return { mode: ":", payload: v.slice(1) };
  if (v.startsWith("~")) {
    let payload = v.slice(1);
    if (payload.startsWith("/")) payload = payload.slice(1);
    return { mode: "~", payload };
  }
  return { mode: "/", payload: v };
}

export function toCanonical(mode: PromptMode, payload: string): string {
  const p = payload.trim();
  if (mode === ":") return `:${p}`;
  if (mode === "~") {
    if (!p || p === "/") return "~/";
    if (p.startsWith("~/")) return p;
    if (p.startsWith("/")) return `~${p}`;
    return `~/${p}`;
  }
  return p;
}

export function matchNavSection(payload: string): Section | undefined {
  const raw = payload.toLowerCase().trim();
  if (!raw) return undefined;
  const variants = new Set<string>([raw]);
  if (raw.startsWith("~/")) {
    variants.add(raw);
    variants.add(raw.slice(2));
  } else if (raw.startsWith("/")) {
    variants.add(`~${raw}`);
    variants.add(raw.slice(1));
  } else {
    variants.add(`~/${raw}`);
  }

  return SECTIONS.find((s) => {
    for (const q of variants) {
      if (s.id === q || s.id.startsWith(q)) return true;
      if (s.path === q || s.path.startsWith(q)) return true;
      if (s.aliases.some((a) => a === q || a.startsWith(q))) return true;
    }
    return false;
  });
}

function stripPathPrefix(token: string): string {
  return token.replace(/^~\//, "").replace(/^~/, "").replace(/^\//, "");
}

function uniqueStartsWith(tokens: Iterable<string>, prefix: string): string[] {
  const p = prefix.toLowerCase();
  const seen = new Set<string>();
  const out: string[] = [];
  for (const token of tokens) {
    const t = token.toLowerCase();
    if (!t.startsWith(p) || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  out.sort();
  return out;
}

export function candidatesFor(mode: PromptMode, payload: string): string[] {
  const p = payload.toLowerCase();
  if (mode === ":") {
    const space = p.indexOf(" ");
    if (space === -1) return uniqueStartsWith(commandTokens(), p);
    const name = p.slice(0, space);
    const rest = p.slice(space + 1);
    if (!commandTakesArg(name)) return [];
    return uniqueStartsWith(THEME_NAMES, rest).map((t) => `${name} ${t}`);
  }
  if (mode === "~") {
    const tokens: string[] = [];
    for (const s of SECTIONS) {
      tokens.push(s.id);
      for (const a of s.aliases) {
        const stripped = stripPathPrefix(a);
        if (stripped) tokens.push(stripped);
      }
    }
    return uniqueStartsWith(tokens, p);
  }
  const tokens: string[] = [];
  for (const s of CHIP_SECTIONS) {
    tokens.push(s.id);
    const label = stripPathPrefix(s.label);
    if (label) tokens.push(label);
    for (const a of s.aliases) {
      const stripped = stripPathPrefix(a);
      if (stripped) tokens.push(stripped);
    }
  }
  return uniqueStartsWith(tokens, p);
}

export function commonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (let i = 1; i < values.length; i++) {
    const v = values[i];
    let n = 0;
    while (n < prefix.length && n < v.length && prefix[n] === v[n]) n++;
    prefix = prefix.slice(0, n);
    if (!prefix) break;
  }
  return prefix;
}

export function tabComplete(
  mode: PromptMode,
  stem: string,
  cycleIndex: number,
  dir: 1 | -1,
  prefixShown: boolean,
): {
  value: string;
  cycle: number;
  prefixShown: boolean;
  matches: string[];
} {
  const matches = candidatesFor(mode, stem);
  if (matches.length === 0) {
    return { value: stem, cycle: -1, prefixShown: false, matches };
  }
  if (matches.length === 1) {
    const only = matches[0];
    const space =
      mode === ":" && !only.includes(" ") && commandTakesArg(only) ? " " : "";
    return { value: only + space, cycle: 0, prefixShown: false, matches };
  }
  const prefix = commonPrefix(matches);
  if (cycleIndex < 0 && !prefixShown && prefix.length > stem.length) {
    return { value: prefix, cycle: -1, prefixShown: true, matches };
  }
  const len = matches.length;
  const next =
    cycleIndex < 0 ? (dir === 1 ? 0 : len - 1) : (cycleIndex + dir + len) % len;
  return { value: matches[next], cycle: next, prefixShown: false, matches };
}

export function killToStart(
  value: string,
  caret: number,
): { value: string; caret: number } {
  return { value: value.slice(caret), caret: 0 };
}

export function killToEnd(
  value: string,
  caret: number,
): { value: string; caret: number } {
  return { value: value.slice(0, caret), caret };
}

export function killWordBefore(
  value: string,
  caret: number,
): { value: string; caret: number } {
  const left = value.slice(0, caret);
  const right = value.slice(caret);
  const nextLeft = left.replace(/\s*\S*$/, "");
  return { value: nextLeft + right, caret: nextLeft.length };
}
