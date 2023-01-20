import View from "./View";
import plus from "./../../add-circle-outline.svg";
import minus from "./../../remove-circle-outline.svg";
import { START_ID } from "../config.js";

class FormView extends View {
  _parentElement = document.querySelector(".workout-display");

  _generateMarkup() {
    return `
    <form class="workout-form">
          <input name="workout-name" class="workout-name" placeholder="workout-name" type="text" required />
          <input name="workout-focus" class="workout-focus-input" type="text" placeholder="Focus" required/>
          <div class="exercise" id="e${START_ID}">
            <textarea
              name="exercise-${START_ID}"
              class="exercise-name"
              placeholder="Exercise name"
              rows="2"
              cols="20"
              required
              ></textarea>
              <div class="set" data-number="${START_ID}">
              <div class="exercise-weight">
                <input
                  name="weight-${START_ID}-${START_ID}"
                  class="weight input-exercise"
                  type="text"
                  placeholder="Weight"
                  required
                />
                <label class="unit">
                kg
                </label>
              </div>
              <div class="input-container">
                <label class="label-name" for="reps">Reps:</label>
                <input name="reps-${START_ID}-${START_ID}" id="reps" class="reps input-exercise" type="text" required />
              </div>
              <div class="input-container">
                <label class="label-name" for="rest">Rest:</label>
                <input name="rest-${START_ID}-${START_ID}" id="rest" class="rest input-exercise" type="text" required />
              </div>
            </div>
            <div class="img-button-container sets-plus" data-exercise="${START_ID}">
              <img class="img" src="${plus}"  />
            </div>
            <div class="sets-separator-line set-line"></div>
            <div class="img-button-container sets-minus" data-exercise="${START_ID}">
              <img class="img" src="${minus}"  />
            </div>
          </div>
          <div class="separator">
            <div class="img-button-container add-exercise">
              <img class="img" src="${plus}"  />
            </div>
            <div class="exercise-separator-line"></div>
            <div class="img-button-container remove-exercise">
              <img class="img" src="${minus}" />
            </div>
          </div>
          <button type="submit" href="#" class="submit-button">Submit</button>
        </form>
    `;
  }
  addHandlerAddSet(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btnPlus = e.target.closest(".sets-plus");
      const btnMinus = e.target.closest(".sets-minus");
      if (!btnPlus && !btnMinus) return;
      if (!btnMinus && btnPlus) {
        handler(false, true, btnPlus.dataset.exercise);
      }
      if (!btnPlus && btnMinus) {
        handler(true, false, btnMinus.dataset.exercise);
      }
    });
  }
  addHandlerAddExercise(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btnPlus = e.target.closest(".add-exercise");
      const btnRemove = e.target.closest(".remove-exercise");
      if (!btnPlus && !btnRemove) return;
      if (btnPlus) handler(false, true);
      if (btnRemove) handler(true, false);
    });
  }
  addHandlerForm(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this.querySelector("form"))];
      console.log(dataArr);
      handler(dataArr, this.querySelector("form").dataset.edit);
    });
  }

  renderSet(id) {
    console.log(id);
    const setNumber = Array.from(
      this._parentElement.querySelector(`#e${id}`).querySelectorAll(".set")
    ).at(-1).dataset.number;

    console.log("Hello SetNumber", setNumber);
    const markup = `
    <div class="exercise-separator-line set-line"></div>
  <div class="set" data-number="${+setNumber + 1}" >
  <div class="exercise-weight">
    <input
      name="weight-${id}-${+setNumber + 1}"
      class="weight input-exercise"
      type="text"
      placeholder="Weight"
      required
    />
    <label class="unit">
    kg
    </label>
  </div>
  <div class="input-container">
    <label class="label-name" for="reps">Reps:</label>
    <input name="reps-${id}-${
      +setNumber + 1
    }" id="reps" class="reps input-exercise" type="text" required />
  </div>
  <div class="input-container">
    <label class="label-name" for="rest">Rest:</label>
    <input  name="rest-${id}-${
      +setNumber + 1
    }" id="rest" class="rest input-exercise" type="text" required />
  </div>
</div>
`;
    const btnPlus = this._parentElement.querySelector(
      `[data-exercise="${id}"]`
    );
    btnPlus.insertAdjacentHTML("beforebegin", markup);
  }
  destroySet(id) {
    console.log(id);
    const selectedExercise = document.getElementById(`e${id}`);
    const lastSet = Array.from(selectedExercise.querySelectorAll(".set")).at(
      -1
    );

    const lastLine = Array.from(
      selectedExercise.querySelectorAll(".set-line")
    ).at(-2);
    lastLine.remove();
    lastSet.remove();
  }
  renderExercise() {
    const lastId = Array.from(this._parentElement.querySelectorAll(".exercise"))
      .at(-1)
      .id.slice(1);
    console.log(lastId);
    const markup = ` 
    <div class="exercise-separator-line exercise-line"></div>
    <div class="exercise" id="e${+lastId + 1}">
            <textarea
              class="exercise-name"
              name="exercise-${+lastId + 1}"
              placeholder="Exercise name"
              rows="2"
              cols="20"
              required
            ></textarea>
            <div class="set" data-number="${START_ID}">
              <div class="exercise-weight">
                <input
                  name="weight-${+lastId + 1}-${START_ID}"
                  class="weight input-exercise"
                  type="text"
                  placeholder="Weight"
                  required
                />
                <label class="unit">
                kg
                </label>
              </div>
              <div class="input-container">
                <label class="label-name" for="reps">Reps:</label>
                <input name="reps-${
                  +lastId + 1
                }-${START_ID}" id="reps" class="reps input-exercise" type="text" required />
              </div>
              <div class="input-container">
                <label class="label-name" for="rest">Rest:</label>
                <input name="rest-${
                  +lastId + 1
                }-${START_ID}" id="rest" class="rest input-exercise" type="text" required />
              </div>
            </div>
            <div class="img-button-container sets-plus" data-exercise="${
              +lastId + 1
            }">
              <img class="img" src="${plus}" />
            </div>
            <div class="sets-separator-line set-line"></div>
            <div class="img-button-container sets-minus" data-exercise="${
              +lastId + 1
            }">
              <img class="img" src="${minus}" />
            </div>
          </div>

    `;
    this._parentElement
      .querySelector(".separator")
      .insertAdjacentHTML("beforebegin", markup);
  }
  destroyExercise() {
    const lastExercise = Array.from(
      this._parentElement.querySelectorAll(".exercise")
    ).at(-1);
    lastExercise.remove();
    const lastExerciseLine = Array.from(
      this._parentElement.querySelectorAll(".exercise-line")
    ).at(-1);
    lastExerciseLine.remove();
  }
}

export default new FormView();
