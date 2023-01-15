import View from "./View";
import icons from "../../icons.svg";

class WorkoutView extends View {
  _parentElement = document.querySelector(".workout-display");

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", function (e) {
      console.log(this._data);
      const delBtn = e.target.closest(".trash-icon");
      if (delBtn) {
        handler();
      } else return;
    });
  }

  _generateMarkup() {
    console.log(this._data);
    const markup = `
    <div class="exercise-title">${this._data.workout.name}</div>
    <div class="exercise-focus">Focus:${this._data.workout.focus}</div>
    <svg class="edit-icon">
    <use href="${icons}#icon-document-edit"></use>
    </svg>
    <svg class="trash-icon">
      <use href="${icons}#icon-trash"></use>
    </svg>
    <div class="exercise-sets">
    ${this._data.workout.exercises
      .map((exercise) => {
        return `
      <div class="exercise-set exercise-set-name">${exercise.name}</div>
      ${exercise.sets
        .map((set) => {
          return `
        <div class="exercise-set">
            <div>Weight: ${set.weight}</div>
            <div>Reps: ${set.reps}</div>
            <div>Rest: ${set.min}min ${set.sec}s</div>
          </div>
        `;
        })
        .join("")}
      `;
      })
      .join("")}
    </div>
    `;
    console.log(markup);

    return markup;
  }
}

export default new WorkoutView();
