import { PROSE, type ProsePage } from "../lib/pages";

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
  return <ProseStage page={PROSE.developers} />;
}

export function DocsStage() {
  return <ProseStage page={PROSE.docs} />;
}

export function PrivacyStage() {
  return <ProseStage page={PROSE.privacy} />;
}
