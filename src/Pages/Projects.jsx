import React from "react";
import sahilJindalThumbnail from "../assets/images/thumbnails/sahil-jindal.png";

import GitRepoCardSet from "../Components/GitRepoCards";

function Projects() {
  return (
    <>
      <header className="Projects-header">Projects</header>
      <div className="text-white uppercase text-center">
        <img
          src={sahilJindalThumbnail}
          alt="sahil-jindal-site"
          className="max-h-[300px] p-5"
        />
        Sahil Jindal
      </div>

      <GitRepoCardSet className="git-repo-set" />
      {/** Should be shown 3 per line */}
    </>
  );
}

export default Projects;
