export const config = { runtime: "edge" };

export default async function handler(): Promise<Response> {
  const docId = process.env.RESUME_DOC_ID;
  if (!docId) return new Response("Not configured", { status: 500 });

  let upstream: Response;
  try {
    upstream = await fetch(
      `https://docs.google.com/document/d/${docId}/export?format=pdf`,
      { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" }
    );
  } catch (e) {
    return new Response(`Failed to reach Google Docs: ${e}`, { status: 502 });
  }

  console.log("Google response status:", upstream.status);
  console.log("Google response content-type:", upstream.headers.get("content-type"));

  if (!upstream.ok)
    return new Response(`Google Docs error: ${upstream.status} ${upstream.statusText}`, { status: upstream.status });

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="nathaniel-bowman_resume.pdf"',
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
