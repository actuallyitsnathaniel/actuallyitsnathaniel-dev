import React from 'react';
import "../App/App.css";

function AboutMe() {
    return(
      <header className="About-Me-header">
      ABOUT ME <br/>
      <p className="body"> 
      I'm a growing Tolkien-buff who loves video games and music. I like to read challenging books and love 
      the Great Works like Brothers K, Plato's Republic, The Abolition of Man, and many others. Feel
      free to ask me about them, I love to talk books!
      </p>
      <br/>
      CURRENTLY LEARNING:
      <p className="body"> Better development practices, primarily refreshing my knowledge on <i>data structures <span aria-label="nerd" role="img">🤓</span>.</i></p>
      </header>
    )
}

export default AboutMe;