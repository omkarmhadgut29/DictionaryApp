import { AppHistory } from "./js/AppHistory.js";
import Render from "./js/Render.js";

let nav_path = "../components/Navbar.html";
let nav_ele = document.getElementById("navbar");
Render(nav_path, nav_ele);

let ContentRender = document.getElementById("ContentRender");
const renderSearch = () => {
  let path_to_search__container = "../components/SearchContent.html";
  Render(path_to_search__container, ContentRender);
};
renderSearch();

let changeComponentBtn = document.getElementById("changeComponentBtn");
let functionalityText = document.getElementById("functionalityText");
let flag = false;
function changeComponentBtnClick() {
  if (flag) {
    functionalityText.innerHTML = "Search Word";
    changeComponentBtn.innerHTML = "History";
    renderSearch();
    flag = false;
  } else {
    functionalityText.innerHTML = "App History";
    changeComponentBtn.innerHTML = "Search";
    AppHistory();
    flag = true;
  }
}

changeComponentBtn.addEventListener("click", changeComponentBtnClick);
