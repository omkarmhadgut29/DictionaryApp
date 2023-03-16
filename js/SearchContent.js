let audio;
let audioFlag = false;
let volume;

const getResult = async (input) => {
  const inputWord = input.value;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;

  const response = await fetch(url);

  if (!response.ok) {
    let empty__input__text = document.getElementById("empty__input__text");
    empty__input__text.innerHTML = `Can't find the meaning of <span>"${inputWord}"</span>.<br> Please, try to search for another word.`;
    return;
  }

  let empty__input = document.getElementsByClassName("empty__input")[0];
  empty__input.style.display = "none";
  let search__result = document.getElementsByClassName("search__result");
  search__result[0].style.display = "block";

  volume = document.getElementById("volume__btn");

  // api call
  let data = await response.json();

  data = data[0];
  let word = document.getElementById("word");
  let partOfSpeech = document.getElementById("partOfSpeech");
  let definition = document.getElementById("definition");
  let synonyms = document.getElementById("synonyms");
  let antonyms = document.getElementById("antonyms");
  let example = document.getElementById("example");

  word.innerHTML = data.word;
  if (data.phonetics[1].audio != "") {
    audioFlag = true;
    audio = new Audio(data.phonetics[1].audio);
  } else {
    volume.className = "fa-solid fa-volume-xmark";
  }

  const wordDefination = data.meanings[0].definitions[0].definition;
  partOfSpeech.innerHTML = data.meanings[0].partOfSpeech;
  definition.innerHTML = wordDefination;
  synonyms.innerHTML =
    data.meanings[0].synonyms ||
    data.meanings[0].definitions[0].synonyms ||
    "_";
  antonyms.innerHTML =
    data.meanings[0].antonyms ||
    data.meanings[0].definitions[0].antonyms ||
    "_";
  example.innerHTML = data.meanings[0].definitions[0].example || "_";

  let searches = [];
  if (localStorage.searches != null) {
    searches = JSON.parse(localStorage.searches);
  }

  searches.push({
    word: data.word,
    meaning: wordDefination,
  });

  localStorage.setItem("searches", JSON.stringify(searches));
};

const SearchContent = () => {
  let input = document.getElementById("floatingInput");

  if (input.value === "") {
    let empty__input__text = document.getElementById("empty__input__text");
    empty__input__text.innerHTML = "Enter Valid input...";
  } else {
    getResult(input);
  }

  input.value = "";
};

const playAudio = () => {
  if (audioFlag) {
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() => {
      volume.style.color = "#999";
    }, 800);
  }
};
