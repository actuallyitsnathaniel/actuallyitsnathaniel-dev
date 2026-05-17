import { useEffect, useState } from "react";
import { useActivityLog } from "../context/ActivityLogContext";

interface Repository {
  html_url: string;
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
}

const CACHE_KEY = "ain_repos_v3";
const CACHE_TTL = 60 * 60 * 1000; // 1h

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function ReposStage() {
  const [repos, setRepos] = useState<Repository[] | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { log } = useActivityLog();

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          log("info", "loaded repos from cache");
          setRepos(data);
          return;
        }
      } catch {
        /* ignore */
      }
    }

    log("fetch", "GET github.com/users/actuallyitsnathaniel/repos");
    fetch(
      "https://api.github.com/users/actuallyitsnathaniel/repos?per_page=100&sort=pushed",
    )
      .then((r) => r.json())
      .then((data: Repository[]) => {
        const sorted = data.sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
        );
        setRepos(sorted);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: sorted, ts: Date.now() }),
        );
        log("fetch", `github repos → ${sorted.length} repos cached`);
      })
      .catch((err) => {
        log("fetch", `github repos → error: ${err.message}`);
        setRepos([]);
      });
  }, [log]);

  const displayed = repos === null ? null : showAll ? repos : repos.slice(0, 4);

  return (
    <div>
      <h2>repos</h2>
      <div className="lede">
        public work on github. sorted by recent activity.
      </div>

      <div
        className="mt-4.5 grid grid-cols-2 gap-3 sm:grid-cols-1"
        aria-label="github repositories"
      >
        {repos === null ? (
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="repo-skel h-24 bg-bg1 border border-rule rounded-[3px] relative overflow-hidden"
              aria-hidden="true"
            />
          ))
        ) : repos.length === 0 ? (
          <div className="col-span-2 p-4.5 text-[12px] text-faint border border-dashed border-rule2 rounded-[3px] text-center sm:col-span-1">
            no repos found · check network or github rate limit
          </div>
        ) : (
          (displayed ?? []).map((repo) => (
            <a
              key={repo.id}
              className="block bg-bg1 border border-rule rounded-[3px] px-4 py-3.5 transition-[border-color,background,transform] duration-150 text-inherit no-underline hover:border-rule2 hover:bg-[rgba(255,255,255,0.012)] hover:-translate-y-px"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} on github`}
            >
              <div className="flex items-baseline gap-2 text-t14 text-link mb-1.5 wrap-break-word">
                {repo.name}
                <span className="text-faint text-[10px]">.git</span>
              </div>
              <div className="text-dim text-[12.5px] leading-normal min-h-[2.6em] line-clamp-2 overflow-hidden text-pretty mb-3">
                {repo.description ?? "—"}
              </div>
              <div className="flex gap-3.5 items-center flex-wrap text-[10.5px] text-faint tracking-[0.04em]">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="before:content-['★_'] before:text-accent">
                    {repo.stargazers_count}
                  </span>
                )}
                <span className="ml-auto">{timeAgo(repo.pushed_at)}</span>
              </div>
            </a>
          ))
        )}
      </div>

      {repos && repos.length > 4 && (
        <div className="mt-3.5 flex justify-between gap-3 flex-wrap text-t12">
          <button
            className="bg-none border border-rule2 rounded-xs px-2.75 py-1.5 text-dim text-[11px] tracking-[0.06em] transition-[color,border-color] duration-120 hover:text-accent hover:border-[rgba(126,231,135,0.4)]"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? "show less" : `show all · +${repos.length - 4}`}
          </button>
          <a
            className="text-faint text-[11px] self-center no-underline border-b-0 hover:text-accent hover:border-b-0"
            href="https://github.com/actuallyitsnathaniel"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/actuallyitsnathaniel ↗
          </a>
        </div>
      )}
    </div>
  );
}
