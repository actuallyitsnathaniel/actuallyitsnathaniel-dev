export interface CommandDef {
  name: string;
  aliases?: string[];
  help: string;
  /** Help overlay keycap. Defaults to `:${name}`. */
  kbd?: string;
  arg?: "theme";
}

export const COMMANDS: CommandDef[] = [
  { name: "resume", aliases: ["cv"], help: "download résumé" },
  { name: "contact", help: "~/contact" },
  { name: "crt", help: "toggle scanlines + phosphor" },
  { name: "theme", help: "set color", arg: "theme" },
  { name: "home", help: "~/whoami" },
  { name: "back", help: "previous section" },
  { name: "github", aliases: ["gh"], help: "open github profile" },
  { name: "linkedin", aliases: ["li"], help: "open linkedin" },
  { name: "play", help: "~/misc + spotify" },
  { name: "share", help: "copy url to clipboard" },
  { name: "mcp", help: "copy mcp server endpoint" },
  { name: "log", help: "view full activity log" },
  { name: "clear", help: "wipe activity log" },
  { name: "help", aliases: ["?"], help: "this overlay", kbd: ":?" },
];

export function commandTokens(): string[] {
  const out: string[] = [];
  for (const c of COMMANDS) {
    out.push(c.name);
    if (c.aliases) out.push(...c.aliases.filter((a) => /^[a-z]/.test(a)));
  }
  return out;
}

export function commandTakesArg(token: string): boolean {
  const t = token.toLowerCase();
  return COMMANDS.some(
    (c) => c.arg && (c.name === t || c.aliases?.includes(t)),
  );
}
