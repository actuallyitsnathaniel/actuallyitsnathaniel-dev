export const config = { runtime: "edge" };

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export default async function handler(): Promise<Response> {
  const token = process.env.GH_TOKEN;
  if (!token) return new Response("Not configured", { status: 500 });

  let res: Response;
  try {
    res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "actuallyitsnathaniel-dev",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: "actuallyitsnathaniel" } }),
    });
  } catch (e) {
    return new Response(`GitHub unreachable: ${e}`, { status: 502 });
  }

  if (!res.ok) {
    const body = await res.text();
    return new Response(`GitHub error: ${res.status} — ${body}`, { status: res.status });
  }

  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return new Response(JSON.stringify({ weeks }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
