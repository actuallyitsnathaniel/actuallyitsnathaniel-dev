import apu from "/src/assets/images/apu_white.svg";
import aws from "/src/assets/images/skills/aws-logo.svg";
import css3_svg from "/src/assets/images/skills/css-svg.svg";
import docker_svg from "/src/assets/images/skills/docker-logo-blue.svg";
import firebase from "/src/assets/images/skills/firebase-logomark.svg";
import gcp from "/src/assets/images/skills/google-cloud-seeklogo.com.svg";
import github_svg from "/src/assets/images/skills/github_square_icon.svg";
import html_svg from "/src/assets/images/skills/html-svg.svg";
import java_svg from "/src/assets/images/skills/java.svg";
import jenkins_svg from "/src/assets/images/skills/jenkins_logo.svg";
import js_svg from "/src/assets/images/skills/js-svg.svg";
import mongodb_svg from "/src/assets/images/skills/mongodb-svg.svg";
import mysql from "/src/assets/images/skills/logo-mysql.svg";
import postgresql_logo from "/src/assets/images/skills/postgresql-logo.svg";
import rails_svg from "/src/assets/images/skills/ruby-on-rails-logo.svg";
import react_svg from "/src/assets/images/skills/react-svg.svg";
import splunk_svg from "/src/assets/images/skills/splunk-logo.svg";
import tailwindcss_svg from "/src/assets/images/skills/tailwindcss-logo.svg";
import ts_svg from "/src/assets/images/skills/typescript-logo-svg.svg";
import vercel_svg from "/src/assets/images/skills/vercel-logotype-light.svg";

import { SkillItem } from "../Components/skill-item";

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
          className="flex flex-wrap items-center justify-center p-5 gap-x-16 gap-y-4"
        >
          {/* TODO: add MUI to this list */}
          {/* TODO: implement an interactable 3D "skill-sphere"
          --- this will then require that i include babylon.js in my skills 😎  */}
          <SkillItem
            href="https://aws.amazon.com/"
            image={aws}
            alt={"aws"}
            classNames={"hover:brightness-110"}
          />
          <SkillItem
            href={"https://developer.mozilla.org/en-US/docs/Web/CSS"}
            image={css3_svg}
            alt={"css3"}
            color={"007df2"}
          />
          <SkillItem
            image={docker_svg}
            href={"https://www.docker.com/"}
            alt={"docker"}
            classNames={"scale-125"}
          />
          <SkillItem
            href={"https://firebase.google.com"}
            image={firebase}
            alt={"firebase"}
            classNames={"scale-90"}
          />
          <SkillItem
            href="https://cloud.google.com"
            image={gcp}
            alt={"google-cloud-platform"}
            classNames="scale-110"
          />
          <SkillItem
            href={"https://www.github.com"}
            image={github_svg}
            alt={"github"}
            color={"DDDEEE"}
            classNames={"rounded-xl scale-95"}
          />
          <SkillItem
            href="https://developer.mozilla.org/en-US/docs/Web/HTML"
            image={html_svg}
            alt={"html5"}
            color={"eb8300"}
          />
          <SkillItem
            href={"https://www.java.com/en/"}
            image={java_svg}
            alt={"java"}
            color={"white"}
            classNames={"scale-75"}
          />
          <SkillItem
            href={"https://www.javascript.com"}
            image={js_svg}
            alt={"javascript"}
            color={"ffe91f"}
            classNames={"scale-95 px-1.5"}
          />
          <SkillItem
            image={jenkins_svg}
            href={"https://www.jenkins.io/"}
            alt={"jenkins"}
            classNames={"scale-90"}
          />
          <SkillItem
            href={"https://www.mysql.com/"}
            image={mysql}
            alt={"mySQL"}
            classNames={"scale-110"}
          />
          <SkillItem
            href={"https://mongodb.com"}
            image={mongodb_svg}
            alt={"mongo-db"}
            color={"0d9e2c"}
          />
          <SkillItem
            href={"https://www.postgresql.org/"}
            image={postgresql_logo}
            alt={"postgresql"}
          />
          <SkillItem
            href="https://reactjs.org"
            image={react_svg}
            alt={"react"}
            color={"50CAEA"}
          />
          <SkillItem
            href={"https://rubyonrails.org/"}
            image={rails_svg}
            alt={"rails"}
            classNames={"scale-110"}
          />
          <SkillItem
            href={"https://www.splunk.com/"}
            image={splunk_svg}
            alt={"splunk"}
            classNames={"scale-125"}
          />
          <SkillItem
            href={"https://tailwindcss.com/"}
            alt={"tailwindcss"}
            image={tailwindcss_svg}
          />
          <SkillItem
            href="https://www.typescriptlang.org/"
            image={ts_svg}
            alt={"typescript"}
            color={"2495ff"}
            classNames={"scale-90"}
          />
          <SkillItem
            href={"https://vercel.com/"}
            image={vercel_svg}
            alt={"vercel"}
            classNames={"scale-110"}
          />
        </span>
      </div>
    </div>
  );
};

export default SkillsAndExperience;
