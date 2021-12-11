import React, { useState, useEffect } from "react";

const Board = () => {
  const [sentence, setSentence] = useState("");
  const [scrambledSentence, setScrambledSentence] = useState("");

  useEffect(() => {
    async function fetchWord() {
        const url = "https://api.hatchways.io/assessment/sentences/1";
        const response = await fetch(url);
        const data = await response.json();
        setSentence(data.data.sentence)
    }
    fetchWord()
  }, []);
  
  function scramble() {
    const words = sentence.split(" ");
    const scrambledWords = words.map((word) => {
        const countIdx = {};
        const scrambled = '';
      for (let i = 0; i < word.length; i++) {
        const randomIdx = Math.floor(Math.random() * word.length);
        if(!countIdx === randomIdx){
            console.log(word[randomIdx])
            countIdx[randomIdx] = word[randomIdx]
            scrambled.concat(word[randomIdx])
        }
      }
      return scrambled
    });
    debugger
    setScrambledSentence(scrambledWords.join(' '))
  }

  useEffect(()=> {
    scramble()
  },[sentence.length])
  
  


  return (
    <div>
      <p id="scrambled-word">{scrambledSentence}</p>

    </div>
  );
};

export default Board;
