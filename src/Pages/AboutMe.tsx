import { motion } from "framer-motion";
import { useSectionVisibility } from "../hooks/useSectionVisibility";
import FavoriteSong from "../Components/favorite-song";
import { fadeUp, stagger } from "../lib/animation";

export const AboutMe = () => {
  const sectionRef = useSectionVisibility("About Me");

  return (
    <div
      ref={sectionRef}
      className="flex text-center flex-col items-center justify-center text-xl py-10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-12 max-w-4xl px-6 w-full"
      >
        <motion.h2 variants={fadeUp} className="underline text-5xl p-5" id="about">
          ABOUT ME
        </motion.h2>

        <motion.div variants={fadeUp}>
          <h3 className="text-4xl font-bold py-4">PROFESSIONAL BACKGROUND</h3>
          <div className="text-lg md:text-xl text-justify space-y-4 leading-relaxed">
          <p className="py-2">
            As a Full-Stack Software Engineer, I specialize in building
            scalable, performant web applications using modern JavaScript
            frameworks. With a B.S. in Computer Science from Azusa Pacific
            University, I bring deep expertise in React, TypeScript, Node.js,
            and AWS cloud services to every project.
          </p>
          <p className="py-2">
            Currently working at Lightfeather.io LLC, I develop enterprise-grade
            solutions for government and commercial clients. My work focuses on
            React/TypeScript frontends, serverless AWS architectures, and CI/CD
            pipelines using Docker, Jenkins, and GitHub Actions. I excel in
            collaborative, Agile environments where critical thinking and
            creative problem-solving drive results.
          </p>
          <p className="py-2">
            My technical stack includes React, TypeScript, JavaScript, Node.js,
            Express, PostgreSQL, MongoDB, Firebase, AWS (Lambda, S3,
            CloudFront), Docker, Git, TailwindCSS, and responsive design
            principles. I'm passionate about writing clean, maintainable code
            and staying current with modern web development best practices.
          </p>
          <p className="py-2 font-bold">
            Available for full-time software engineering roles, freelance web
            development projects, and technical consulting. Whether you need a
            React developer, full-stack engineer, or AWS cloud architect, I
            deliver production-ready code that scales.
          </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="text-4xl font-bold py-4 pt-8">BEYOND THE CODE</h3>
          <p className="text-lg md:text-xl text-justify py-4 leading-relaxed border-l-2 border-gray-600 pl-5">
          I'm a growing Tolkien-buff who loves video games and music. I like to
          read challenging books and love the Great Works like Brothers K,
          Plato's Republic, The Abolition of Man, and many others. Feel free to
          ask me about them, I love to talk books! I've built and maintained
          websites and tools for artists and music projects, so I care a lot
          about workflows that actually fit how musicians and producers work. My
          background in music and audio production helps me design engineering
          solutions that serve real creative processes, not just abstract
          requirements.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <FavoriteSong />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
