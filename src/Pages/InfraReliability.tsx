import { useSectionVisibility } from "../hooks/useSectionVisibility";

const InfraReliability = () => {
  const sectionRef = useSectionVisibility("Infrastructure & Reliability");

  return (
    <div
      ref={sectionRef}
      className="flex flex-wrap flex-col w-screen text-center py-10"
    >
      <h2 className="underline text-5xl py-4" id="infra">
        INFRASTRUCTURE & RELIABILITY
      </h2>
      <div className="max-w-4xl mx-auto text-left text-2xl px-6 space-y-4">
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
