import * as model from "./model.js";
import { async } from "regenerator-runtime";
import "core-js/stable";
import resultsView from "./views/resultsView.js";
import workoutView from "./views/workoutView.js";
import formView from "./views/formView.js";
import editView from "./views/editView.js";

const controlWorkouts = async function () {
  // Get state from model
  await model.loadWorkouts();
  // Render Workouts
  resultsView.render(model.state);
};

const controlWorkout = async function () {
  // Get id
  const id = window.location.hash.slice(1);
  if (!id) return;

  // Put workout into state
  await model.loadWorkout(id);
  // Render workout
  workoutView.render(model.state);
};
const controlForm = function () {
  // Render Form
  formView.render(model.state);
  // Add event listeners for buttons
};

const controlDelete = async function () {
  // Get workout ID
  const id = window.location.hash.slice(1);
  if (!id) return;
  // Send request for deletion
  await model.deleteWorkout(id);
  // Empty the workout display
  workoutView._clear();
  window.location.hash = "";
  // Reload all workouts
  await model.loadWorkouts();
  // Render remaining workouts
  resultsView.render(model.state);
};
const controlSets = function (minus = false, plus = false, id) {
  // console.log(minus, plus);
  // console.log(id);
  if (plus) formView.renderSet(id);
  if (minus) formView.destroySet(id);
};
const controlExercise = function (minus = false, plus = false, id) {
  if (plus) formView.renderExercise();
  if (minus) formView.destroyExercise();
};
const controlTest = function () {};
const controlGetFormData = async function (data, edit = false) {
  const postData = model.mapFormDataToWorkoutObject(data);
  let workoutId;
  if (edit) {
    workoutId = await model.postWorkout(
      postData,
      window.location.hash.slice(1)
    );
    await model.loadWorkout(workoutId);
    workoutView.render(model.state);
  } else {
    workoutId = await model.postWorkout(postData);
  }
  await model.loadWorkouts();
  resultsView.render(model.state);
  window.location.hash = workoutId;
};
const controlEditData = function () {
  // console.log(model.state);
  editView.render(model.state);
};

controlWorkouts();
const init = function () {
  controlWorkout();
  workoutView.addHandlerRender(controlWorkout);
  workoutView.addHandlerDelete(controlDelete);
  workoutView.addHandlerEdit(controlEditData);
  resultsView.addHandlerAddWorkout(controlForm);
  formView.addHandlerAddSet(controlSets);
  formView.addHandlerAddExercise(controlExercise);
  formView.addHandlerForm(controlGetFormData);
  Math.trunc(Math.random() * 3 + 1);
};

init();
