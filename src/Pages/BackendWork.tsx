import { motion } from "framer-motion";
import { useSectionVisibility } from "../hooks/useSectionVisibility";
import { fadeUp, slideUp, stagger } from "../lib/animation";

const cardClass =
  "outline outline-gray-600 hover:outline-gray-400 rounded-md m-4 p-6 text-left max-w-4xl mx-auto w-full transition-colors duration-150 cursor-pointer focus-within:outline focus-within:outline-gray-400";

const BackendWork = () => {
  const sectionRef = useSectionVisibility("Selected Work (Backend & Infra)");

  return (
    <div
      ref={sectionRef}
      className="flex flex-wrap flex-col w-full text-center py-10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-12 max-w-5xl mx-auto w-full"
      >
        <motion.h2 variants={fadeUp} className="underline text-5xl py-4" id="backend-work">
          SELECTED WORK (BACKEND & INFRA)
        </motion.h2>

        <motion.div variants={stagger} className="flex flex-col items-center w-full px-4">
          {/* Why this kind of role fits me callout */}
          <motion.div variants={slideUp} className={cardClass}>
          <h3 className="text-3xl font-bold py-2">
            WHY THIS KIND OF ROLE FITS ME
          </h3>
          <ul className="text-2xl list-disc pl-6 space-y-2">
            <li>
              I enjoy owning backend systems and infrastructure, from data
              modeling and performance to monitoring and deployments.
            </li>
            <li>
              I like working on real-time, collaborative experiences that feel
              fast and reliable.
            </li>
            <li>
              I care deeply about building tools that reduce friction for artists
              and creative teams.
            </li>
          </ul>
          </motion.div>

        {/* Card 1 — Jessica Lea Mayfield */}
          <motion.div variants={slideUp} className={cardClass}>
          <h3 className="text-3xl font-bold pb-2">
            <a
              href="https://jessicaleamayfieldofficial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 duration-75 md:hover:-translate-y-1 inline-block"
            >
              Jessica Lea Mayfield
            </a>
          </h3>
          <p className="text-xl pb-3">
            Official site for Grammy-winning indie artist Jessica Lea Mayfield.
          </p>
          <p className="text-xl pb-3">
            <span className="font-bold">My role:</span> Built and maintained the
            full-stack site, handling frontend (React/TypeScript), backend API,
            and cloud deployment on AWS/Vercel.
          </p>
          <p className="font-bold text-xl pb-1">Impact:</p>
          <ul className="text-xl list-disc pl-6 space-y-1">
            <li>
              Delivered a fast, responsive site optimized for musician fan
              engagement.
            </li>
            <li>
              Implemented lazy loading and image optimization for fast load times
              on mobile.
            </li>
            <li>
              Built real-time integrations for tour dates and content updates.
            </li>
          </ul>
          </motion.div>

        {/* Card 2 — Lightfeather.io enterprise work */}
          <motion.div variants={slideUp} className={cardClass}>
          <h3 className="text-3xl font-bold pb-2">
            <a
              href="https://lightfeather.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 duration-75 md:hover:-translate-y-1 inline-block"
            >
              Lightfeather.io
            </a>
          </h3>
          <p className="text-xl pb-3">
            Enterprise-grade web solutions for government and commercial clients
            at Lightfeather.io LLC.
          </p>
          <p className="text-xl pb-3">
            <span className="font-bold">My role:</span> Full-stack engineer
            focused on serverless AWS architectures, REST API design, and CI/CD
            pipelines (Jenkins, GitHub Actions, Docker).
          </p>
          <p className="font-bold text-xl pb-1">Impact:</p>
          <ul className="text-xl list-disc pl-6 space-y-1">
            <li>
              Reduced deployment friction by standardizing pipeline stages with
              Jenkins and Harness.
            </li>
            <li>
              Implemented production monitoring with New Relic and Splunk to
              proactively catch regressions.
            </li>
            <li>
              Improved API response times through query optimization
              (Postgres/MongoDB) and targeted caching.
            </li>
          </ul>
          </motion.div>

        {/* Card 3 — Music artist sites */}
          <motion.div variants={slideUp} className={cardClass}>
          <h3 className="text-3xl font-bold pb-2">
            Music Artist Sites
          </h3>
          <p className="text-xl pb-3">
            A suite of sites built for independent musicians and bands — Dave
            Wilbert, John White, and Ryland.
          </p>
          <p className="text-xl pb-3">
            <span className="font-bold">My role:</span> Designed and deployed
            full-stack solutions (frontend + CMS integrations + hosting) tailored
            to each artist's workflow.
          </p>
          <p className="font-bold text-xl pb-1">Impact:</p>
          <ul className="text-xl list-disc pl-6 space-y-1">
            <li>
              Standardized deployment pipeline across projects using Vercel for
              zero-downtime releases.
            </li>
            <li>
              Built artist-friendly update flows so musicians can manage their
              own content without engineering support.
            </li>
            <li>
              Real-time setlist/tour date sync keeps site content fresh without
              manual deploys.
            </li>
          </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BackendWork;
