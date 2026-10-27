import type { ProsePage } from "../lib/pages";
import { useDevContent } from "../sanity/DevContentContext";

export function ProseStage({ page }: { page: ProsePage }) {
  return (
    <div className="grid grid-cols-1 gap-5.5">
      <h2>{page.title}</h2>
      {page.paragraphs.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
    </div>
  );
}

export function DevelopersStage() {
  const { prose } = useDevContent();
  return <ProseStage page={prose.developers} />;
}

export function DocsStage() {
  const { prose } = useDevContent();
  return <ProseStage page={prose.docs} />;
}

export function PrivacyStage() {
  const { prose } = useDevContent();
  return <ProseStage page={prose.privacy} />;
}
