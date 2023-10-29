import View from "./View";
import plus from "./../../add-circle-outline.svg";
import minus from "./../../remove-circle-outline.svg";

class EditView extends View {
  _data;
  _parentElement = document.querySelector(".workout-display");

  _generateMarkup() {
    const markup = `
    <form class="workout-form" data-edit="true">
          <input name="workout-name" class="workout-name" placeholder="workout-name" type="text" required value="${
            this._data.workout.name
          }"/>
          <input name="workout-focus" class="workout-focus-input" type="text" placeholder="Focus" required value="${
            this._data.workout.focus
          }"/>
          ${this._data.workout.exercises
            .map((exercise, index) => {
              const exerciseMarkup = `
            ${
              index
                ? ` <div class="exercise-separator-line exercise-line"></div>`
                : ""
            }
            <div class="exercise" id="e${index + 1}">
            <textarea
              name="exercise-${index + 1}"
              class="exercise-name"
              placeholder="Exercise name"
              rows="2"
              cols="20"
              required
              >${exercise.name}</textarea>
              ${exercise.sets
                .map((set, i) => {
                  const markupSet = `
              
              <div class="set" data-number="${i + 1}">
              ${
                i ? `<div class="exercise-separator-line set-line"></div>` : ""
              }   
              <div class="exercise-weight">
              <label class="label-name" for="weight">Weight:</label>
              <input 
              name="weight-${index + 1}-${i + 1}"
              id="weight"
              class="weight input-exercise"
                  type="text"
                  placeholder="kg"
                  required
                value="${set.weight}"
              />
              </div>
              <div class="input-container">
                <label class="label-name" for="reps">Reps:</label>
                <input value="${set.reps}" name="reps-${index + 1}-${
                    i + 1
                  }" id="reps" class="reps input-exercise" type="text" required />
              </div>
              <div class="input-container">
                <label class="label-name" for="rest">Rest:</label>
                <input name="rest-${index + 1}-${
                    i + 1
                  }" id="rest" class="rest input-exercise" type="text" required value="${
                    set.min
                  } ${set.sec}" />
              </div>
              </div>`;
                  return markupSet;
                })
                .join("")}
        <div class="control-sets-btns">
          <div class="img-button-container sets-plus" data-exercise="${
            index + 1
          }">
          <img class="img" src="${plus}"  />
          </div>
          <div class="sets-separator-line set-line"></div>
          <div class="img-button-container sets-minus" data-exercise="${
            index + 1
          }">
            <img class="img" src="${minus}"  />
          </div>
        </div>
        </div>
              `;
              return exerciseMarkup;
            })
            .join("")}
          
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
    // console.log(markup);
    return markup;
  }
}
export default new EditView();
