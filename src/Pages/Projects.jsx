import { WebsiteThumbnail } from "../Components/website-thumbnail";
import sahilJindalThumbnail from "../assets/images/thumbnails/sahil-jindal.png";

import GitRepoCardSet from "../Components/git-repos";

export const Projects = () => {
  return (
    <div className="flex flex-wrap flex-col w-screen text-center py-10">
      <h2 className="underline text-5xl py-4">PROJECTS</h2>
      <div
        id="site-thumbnails-wrapper"
        className="flex w-screen justify-center py-10"
      >
        <WebsiteThumbnail
          image={sahilJindalThumbnail}
          href="https://sahiljindal.com"
          alt="sahil-jindal-site"
          label={"Sahil Jindal"}
        />
      </div>

      <GitRepoCardSet />
      <span className="p-10">
        <h2 className="underline text-4xl p-5">DELIVERABLES</h2>
        <p className="text-2xl">
          Full-Stack Web & Mobile Development, Database Management, Software
          Engineering, Programming
        </p>
      </span>
    </div>
  );
};

export default Projects;
