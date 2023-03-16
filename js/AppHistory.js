let searches = [];

export function AppHistory() {
  let ContentRender = document.getElementById("ContentRender");
  let htmlContent = `<div class="row d-flex justify-content-center historyContainer">`;
  let count = 0;
  if (localStorage.searches) {
    searches = JSON.parse(localStorage.searches);
  }

  if (searches.length === 0) {
    ContentRender.innerHTML = `
        <div class='pt-5 d-flex justify-content-center'>
                <h2>No Histry Found...</h2>
        </div>
        `;
  } else {
    searches.map((data) => {
      htmlContent =
        htmlContent +
        `
          <div class="card col-md-3 mt-3 overlay" style="width: 17rem; margin: 20px;">
            <div class="card-body">
              <h5 class="card-title">${data.word}</h5>
              <p class="card-text">${data.meaning}</p>
            </div>
            <div class="card-footer" style="flex: 0 1 auto;">
              <i class="fa-solid fa-trash-can fa-2x" style="padding-left: 88%;" id="deleteBtn" data-count=${count++}></i>
            </div>
          </div>
          `;
    });

    htmlContent = htmlContent + "</div>";

    ContentRender.innerHTML = htmlContent;
    document.getElementById("deleteBtn").addEventListener("click", deleteCard);
  }
}

const deleteCard = (event) => {
  let index = event.target.dataset.count;
  searches.splice(index, 1);
  localStorage.setItem("searches", JSON.stringify(searches));
  AppHistory();
};
