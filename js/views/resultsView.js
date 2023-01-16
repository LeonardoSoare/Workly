import View from "./View";
import image1 from "../../bike.svg";
class ResultsView extends View {
  _parentElement = document.querySelector(".workout-list");
  _addButton = document.querySelector(".button-add");

  _generateMarkup() {
    const markup = this._data.results
      .map((result) => {
        return `
      <a href="#${result.id}" class="workout-preview">
      <div class="img-container">
        <img class="img" src="${image1}" />
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
