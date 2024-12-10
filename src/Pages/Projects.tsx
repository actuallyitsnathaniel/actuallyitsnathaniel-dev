import { WebsiteThumbnail } from "../Components/website-thumbnail";

import sahilJindalThumbnail from "/src/assets/images/thumbnails/sahil-jindal.jpg";
import johnWhiteThumbnail from "/src/assets/images/thumbnails/john-white-thumbnail.jpg";
import rylandThumbnail from "/src/assets/images/thumbnails/ryland-thumbnail.jpg";
// import samDentonThumbnail from "/src/assets/images/thumbnails/sam-denton-thumbnail.jpg";

import GitRepoCardSet from "../Components/git-repos";

export const Projects = () => {
  return (
    <div className="flex flex-wrap flex-col w-screen text-center py-10">
      <h2 className="underline text-5xl py-4">PROJECTS</h2>
      <div
        id="site-thumbnails-wrapper"
        className="flex flex-wrap w-screen justify-center py-10"
      >
        <WebsiteThumbnail
          image={sahilJindalThumbnail}
          href="https://sahiljindal.com"
          alt="sahil-jindal-site"
          label={"Sahil Jindal"}
        />
        <WebsiteThumbnail
          image={johnWhiteThumbnail}
          href="https://johnwhitesmusic.com"
          alt="john-white-site"
          label={"John White"}
        />
        <WebsiteThumbnail
          image={rylandThumbnail}
          href="https://weareryland.com"
          alt="ryland-site"
          label={"Ryland"}
        />
        {/* <WebsiteThumbnail
          image={samDentonThumbnail}
          href="https://sam-denton-site.vercel.app/"
          alt="sam-denton-site"
          label={"Sam Denton"}
        /> */}
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
