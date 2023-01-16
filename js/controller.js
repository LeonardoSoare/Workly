import * as model from "./model.js";
import { async } from "regenerator-runtime";
import "core-js/stable";
import view from "./views/view.js";
import resultsView from "./views/resultsView.js";
import workoutView from "./views/workoutView.js";
import formView from "./views/formView.js";

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
  console.log(minus, plus);
  console.log(id);
  if (plus) formView.renderSet(id);
  if (minus) formView.destroySet(id);
};
const controlExercise = function (minus = false, plus = false, id) {
  if (plus) formView.renderExercise();
  if (minus) formView.destroyExercise();
};
const controlTest = function () {
  console.log("Hello from controller");
};
const controlGetFormData = async function (data) {
  const postData = model.mapFormDataToWorkoutObject(data);
  const newWorkoutId = await model.postWorkout(postData);
  await model.loadWorkouts();
  resultsView.render(model.state);
  window.location.hash = newWorkoutId;
};

controlWorkouts();
const init = function () {
  controlWorkout();
  workoutView.addHandlerRender(controlWorkout);
  workoutView.addHandlerDelete(controlDelete);
  resultsView.addHandlerAddWorkout(controlForm);
  formView.addHandlerAddSet(controlSets);
  formView.addHandlerAddExercise(controlExercise);
  formView.addHandlerForm(controlGetFormData);
};

init();
