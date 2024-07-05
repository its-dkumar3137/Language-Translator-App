const fromText = document.querySelector(".from-text");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const toText = document.querySelector('.to-text');
const exchangeIcon = document.querySelector('.exchange');
const icons = document.querySelectorAll('.row i');

selectTag.forEach((tag, ind) => {
  for(const country_code in countries){
    let selected ;
    if(ind == 0 && country_code == 'en-GB') {
      selected = "selected";
    }
    else if(ind == 1 && country_code == 'hi-IN'){
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeIcon.addEventListener("click", () => {
  let constText = fromText.value;
  let constLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = constText;
  selectTag[1].value = constLang;
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  translateFrom = selectTag[0].value,
  transleteTo = selectTag[1].value;
  if(!text) return;
  toText.setAttribute("placeholder", "Translating...");
  // console.log(text, translateFrom, transleteTo);
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${transleteTo}`;
  fetch(apiUrl).then(res => res.json()).then((data)=>{
    // console.log(text);
    // console.log(data);
    // console.log(data.responseData.translatedText);
    toText.value = data.responseData.translatedText;
    toText.setAttribute("placeholder", "Translation.");
  });
})

icons.forEach((icon)=>{
  console.log(icon);
  icon.addEventListener('click', ({target}) => {
    if(target.classList.contains("fa-copy")){
      if(target.id == "from"){
        navigator.clipboard.writeText(fromText.value);
      }
      else navigator.clipboard.writeText(toText.value);
    }
    else{
      let utterance;
      if(target.id == "from"){
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      }
      else{ 
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  })
});