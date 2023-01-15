import * as model from "./model.js";
import { async } from "regenerator-runtime";
import "core-js/stable";
import view from "./views/view.js";
import resultsView from "./views/resultsView.js";
import workoutView from "./views/workoutView.js";

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

controlWorkouts();

const init = function () {
  controlWorkout();
  workoutView.addHandlerRender(controlWorkout);
  workoutView.addHandlerDelete(controlDelete);
};

init();
