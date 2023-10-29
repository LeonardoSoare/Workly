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
      const delBtn = e.target.closest(".trash-icon");
      if (delBtn) {
        handler();
      } else return;
    });
  }
  addHandlerEdit(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const editBtn = e.target.closest(".edit-icon");
      if (!editBtn) return;

      handler();
    });
  }

  _generateMarkup() {
    // console.log(this._data);
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
        .map((set, i) => {
          return `
        <div class="exercise-set">
             <div class="set-number">Set ${i + 1}</div>
            <div class="detail-padding">Weight: ${set.weight} kg</div>
            <div class="detail-padding">Reps: ${set.reps}</div>
            <div class="detail-padding">Rest: ${set.min}min ${set.sec}s</div>
          </div>
        `;
        })
        .join("")}
      `;
      })
      .join("")}
    </div>
    `;

    return markup;
  }
}

export default new WorkoutView();
