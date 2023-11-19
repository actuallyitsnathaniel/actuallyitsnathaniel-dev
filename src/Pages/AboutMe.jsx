import React from "react";

export const AboutMe = () => {
  return (
    <div className="flex text-center flex-col items-center justify-center text-xl">
      <h2 className="underline text-5xl p-5">ABOUT ME</h2>
      <p className="text-3xl text-justify md:mx-20 py-4 px-6">
        I'm a growing Tolkien-buff who loves video games and music. I like to
        read challenging books and love the Great Works like Brothers K, Plato's
        Republic, The Abolition of Man, and many others. Feel free to ask me
        about them, I love to talk books!
      </p>
      <br />
      {/* <h2 className="underline text-5xl p-5">CURRENTLY LEARNING:</h2>
      <p className="text-3xl text-justify mx-20">
        Better development practices, primarily refreshing my knowledge on{" "}
        <span>
          <i>data structures</i>.
        </span>
      </p> */}
    </div>
  );
};

export default AboutMe;
