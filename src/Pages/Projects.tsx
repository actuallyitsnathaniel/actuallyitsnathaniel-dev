import { motion } from "framer-motion";
import { WebsiteThumbnail } from "../Components/website-thumbnail";

import sahilJindalThumbnail from "/src/assets/images/thumbnails/sahil-jindal.jpg";
import johnWhiteThumbnail from "/src/assets/images/thumbnails/john-white-thumbnail.jpg";
import rylandThumbnail from "/src/assets/images/thumbnails/ryland-thumbnail.jpg";
import dwThumbnail from "/src/assets/images/thumbnails/davewilbert-thumbnail.jpg";
import jlmThumbnail from "/src/assets/images/thumbnails/jlm-thumbnail.png";
// import samDentonThumbnail from "/src/assets/images/thumbnails/sam-denton-thumbnail.jpg";

import GitRepoCardSet from "../Components/git-repos";
import { useSectionVisibility } from "../hooks/useSectionVisibility";
import { fadeUp, slideUp, stagger } from "../lib/animation";

export const Projects = () => {
  const sectionRef = useSectionVisibility("Projects");

  return (
    <div
      ref={sectionRef}
      className="flex flex-wrap flex-col w-screen text-center py-10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-12 max-w-5xl mx-auto w-full"
      >
        <motion.h2 variants={fadeUp} className="underline text-5xl py-4" id="projects">
          PROJECTS
        </motion.h2>
        <motion.div
          variants={stagger}
          id="site-thumbnails-wrapper"
          className="flex flex-wrap w-full justify-center py-10"
        >
          <motion.div variants={slideUp}>
            <WebsiteThumbnail
              image={jlmThumbnail}
              href="https://jessicaleamayfieldofficial.com"
              alt="jessica-lea-mayfield-site"
              label={"Jessica Lea Mayfield"}
            />
          </motion.div>
          <motion.div variants={slideUp}>
            <WebsiteThumbnail
              image={sahilJindalThumbnail}
              href="https://sahiljindal.com"
              alt="sahil-jindal-site"
              label={"Sahil Jindal"}
            />
          </motion.div>
          <motion.div variants={slideUp}>
            <WebsiteThumbnail
              image={dwThumbnail}
              href="https://davewilbertmusic.com"
              alt="dave-wilbert-site"
              label={"Dave Wilbert Music"}
            />
          </motion.div>
          <motion.div variants={slideUp}>
            <WebsiteThumbnail
              image={johnWhiteThumbnail}
              href="https://johnwhitesmusic.com"
              alt="john-white-site"
              label={"John White Music"}
            />
          </motion.div>
          <motion.div variants={slideUp}>
            <WebsiteThumbnail
              image={rylandThumbnail}
              href="https://weareryland.com"
              alt="ryland-site"
              label={"Ryland"}
            />
          </motion.div>
          {/* <WebsiteThumbnail
            image={samDentonThumbnail}
            href="https://sam-denton-site.vercel.app/"
            alt="sam-denton-site"
            label={"Sam Denton"}
          /> */}
        </motion.div>

        <motion.div variants={fadeUp}>
          <GitRepoCardSet />
        </motion.div>
      </motion.div>
      {/* <span className="p-10">
        <h3 className="underline text-4xl p-5">DELIVERABLES</h3>
        <p className="text-2xl">
          Full-Stack Web & Mobile Development, Database Management, Software
          Engineering, Programming
        </p>
      </span> */}
    </div>
  );
};

export default Projects;
