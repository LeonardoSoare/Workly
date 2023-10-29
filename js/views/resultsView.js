import View from "./View";
import image1 from "../../bike.svg";
import image2 from "../../runner.svg";
import image3 from "../../weights.svg";
class ResultsView extends View {
  _parentElement = document.querySelector(".workout-list");
  _addButton = document.querySelector(".button-add");

  _generateMarkup() {
    const markup = this._data.results

      .map((result) => {
        let image = Math.trunc(Math.random() * 3 + 1);
        if (image === 1) {
          image = image1;
        }
        if (image === 2) {
          image = image2;
        }
        if (image === 3) {
          image = image3;
        }
        return `
      <a href="#${result.id}" class="workout-preview">
      <div class="img-container">
        <img class="img" src="${image}" />
      </div>
      <div class="workout-text">
        <div class="workout-title">${result.name}</div>
        <div class="workout-focus">Focus: ${result.focus}</div>
      </div>
    </a>
      `;
      })
      .join("");
    // console.log(markup);
    return markup;
  }
  addHandlerAddWorkout(handler) {
    this._addButton.addEventListener("click", function () {
      console.log("Hello add Button");
      handler();
    });
  }
}

export default new ResultsView();
