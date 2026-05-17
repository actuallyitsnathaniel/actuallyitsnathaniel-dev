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
      } catch { /* ignore */ }
    }

    log("fetch", "GET github.com/users/actuallyitsnathaniel/repos");
    fetch("https://api.github.com/users/actuallyitsnathaniel/repos?per_page=100&sort=pushed")
      .then(r => r.json())
      .then((data: Repository[]) => {
        const sorted = data.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
        setRepos(sorted);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: sorted, ts: Date.now() }));
        log("fetch", `github repos → ${sorted.length} repos cached`);
      })
      .catch(err => {
        log("fetch", `github repos → error: ${err.message}`);
        setRepos([]);
      });
  }, [log]);

  const displayed = repos === null
    ? null
    : showAll ? repos : repos.slice(0, 4);

  return (
    <div>
      <h2>repos</h2>
      <div className="lede">public work on github. sorted by recent activity.</div>

      <div className="repo-grid" aria-label="github repositories">
        {repos === null ? (
          [1, 2, 3, 4].map(i => <div key={i} className="repo-skel" aria-hidden="true" />)
        ) : repos.length === 0 ? (
          <div className="repo-empty">no repos found · check network or github rate limit</div>
        ) : (
          (displayed ?? []).map(repo => (
            <a
              key={repo.id}
              className="repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} on github`}
            >
              <div className="repo-name">
                {repo.name}
                <span className="ext">.git</span>
              </div>
              <div className="repo-desc">{repo.description ?? "—"}</div>
              <div className="repo-meta">
                {repo.language && (
                  <span className="lang">
                    <span className="ld" aria-hidden="true" />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && <span className="stars">{repo.stargazers_count}</span>}
                <span className="when">{timeAgo(repo.pushed_at)}</span>
              </div>
            </a>
          ))
        )}
      </div>

      {repos && repos.length > 4 && (
        <div className="repo-foot">
          <button
            className="repo-more"
            onClick={() => setShowAll(v => !v)}
            aria-expanded={showAll}
          >
            {showAll ? "show less" : `show all · +${repos.length - 4}`}
          </button>
          <a
            className="repo-gh"
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
