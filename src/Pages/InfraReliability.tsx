import { useSectionVisibility } from "../hooks/useSectionVisibility";

const BADGES = [
  "Node.js · AWS · Postgres",
  "CI/CD Pipelines",
  "Production Monitoring",
];

const InfraReliability = () => {
  const sectionRef = useSectionVisibility("Infrastructure & Reliability");

  return (
    <div
      ref={sectionRef}
      className="flex flex-wrap flex-col w-full text-center py-10"
    >
      <h2 className="underline text-5xl py-4" id="infra">
        INFRASTRUCTURE & RELIABILITY
      </h2>

      {/* Pill badges */}
      <div className="flex flex-wrap justify-center gap-2 py-4 px-6">
        {BADGES.map((badge) => (
          <span
            key={badge}
            className="border border-gray-700 rounded-sm px-3 py-1 text-sm tracking-wide opacity-70"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-left text-2xl px-6 space-y-4 bg-gray-900/50 border border-gray-800 rounded-md p-6">
        <p className="py-2">
          I focus on building backend systems and infrastructure that are
          reliable, observable, and easy to ship.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Design and optimization of backend systems for performance,
            scalability, and reliability (Node.js, Express, Postgres, MongoDB,
            AWS).
          </li>
          <li>
            CI/CD pipelines with GitHub Actions/Jenkins, automated testing, and
            safe deployments.
          </li>
          <li>
            Production monitoring and logging with tools like New Relic/Splunk
            to detect and resolve issues quickly.
          </li>
          <li>
            Containerization with Docker and deployments on AWS and Vercel;
            experience with serverless patterns (Lambda, S3, CloudFront).
          </li>
          <li>
            SQL and NoSQL data modeling, indexing, and query optimization for
            responsive APIs.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfraReliability;
