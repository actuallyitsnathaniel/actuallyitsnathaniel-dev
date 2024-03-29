import React from "react";

import github_svg from "/src/assets/images/skills/github_square_icon.svg";
import html_svg from "/src/assets/images/skills/html-svg.svg";
import css3_svg from "/src/assets/images/skills/css-svg.svg";
import mongodb_svg from "/src/assets/images/skills/mongodb-svg.svg";
import react_svg from "/src/assets/images/skills/react-svg.svg";
import js_svg from "/src/assets/images/skills/js-svg.svg";
import ts_svg from "/src/assets/images/skills/typescript-logo-svg.svg";
import gcp from "/src/assets/images/skills/google-cloud-seeklogo.com.svg";
import aws from "/src/assets/images/skills/aws-logo.svg";
import firebase from "/src/assets/images/skills/firebase-logomark.svg";
import java_svg from "/src/assets/images/skills/java.svg";
import apu from "/src/assets/images/apu_white.svg";
import mysql from "/src/assets/images/skills/logo-mysql.svg";

import { SkillItem } from "/src/Components/skill-item";

const SkillsAndExperience = () => {
  return (
    <div className="flex flex-row flex-wrap text-center justify-center md:w-full text-sm text-white min-h-full py-10">
      <div className="color-white md:basis-1/2 p-4 w-full">
        <h2 className="underline text-5xl py-5">EDUCATION</h2>
        <a href={"https://www.apu.edu/"} className="flex justify-center">
          <img src={apu} alt="apu" className="md:max-w-[80%] p-4" />
        </a>
        <p className="text-2xl py-5">
          B.S. Computer Science ~ Dept. of ECS <br />
          B.S. Honors Humanitites ~ APU Honors College
        </p>
      </div>
      <div className="flex flex-wrap content-center md:basis-1/2 justify-center p-1 fill-white">
        <h2 className="underline text-5xl py-5">SKILLS</h2>
        <span
          id="skill-items"
          className="flex flex-wrap items-center justify-center py-10"
        >
          {/* TODO: add RubyOnRails, PostgreSQL, Vercel, Jenkins, Docker, Splunk */}
          <SkillItem
            href={"https://www.java.com/en/"}
            image={java_svg}
            alt={"java"}
            color={"white"}
            classNames={"-translate-y-6"}
          />
          <SkillItem
            href="https://developer.mozilla.org/en-US/docs/Web/HTML"
            image={html_svg}
            alt={"html5"}
            color={"eb8300"}
          />
          <SkillItem
            href={"https://developer.mozilla.org/en-US/docs/Web/CSS"}
            image={css3_svg}
            alt={"css3"}
            color={"007df2"}
          />
          <SkillItem
            href={"https://www.javascript.com"}
            image={js_svg}
            alt={"javascript"}
            color={"ffe91f"}
            classNames={"scale-95 px-1.5"}
          />
          <SkillItem
            href={"https://mongodb.com"}
            image={mongodb_svg}
            alt={"mongo-db"}
            color={"0d9e2c"}
          />
          <SkillItem
            href={"https://www.github.com"}
            image={github_svg}
            alt={"github"}
            color={"DDDEEE"}
            classNames={"object-contain rounded-xl"}
          />
          <SkillItem
            href="https://reactjs.org"
            image={react_svg}
            alt={"react"}
            color={"50CAEA"}
          />
          <SkillItem
            href="https://www.typescriptlang.org/"
            image={ts_svg}
            alt={"typescript"}
            color={"2495ff"}
          />
          <SkillItem
            href="https://cloud.google.com"
            image={gcp}
            alt={"google-cloud-platform"}
            classNames="scale-110"
          />
          <SkillItem
            href={"https://firebase.google.com"}
            image={firebase}
            alt={"firebase"}
            classNames={"scale-90"}
          />
          <SkillItem
            href="https://aws.amazon.com/"
            image={aws}
            alt={"aws"}
            classNames={"hover:brightness-110"}
          />
          <SkillItem
            href={"https://www.mysql.com/"}
            image={mysql}
            alt={"mySQL"}
          />
        </span>
      </div>
    </div>
  );
};

export default SkillsAndExperience;
