import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { AJAX, DEL_AJAX } from "./helper";

export const state = {
  workout: {},
  results: [],
};

export const loadWorkouts = async function () {
  const data = await AJAX(API_URL);
  state.results = data.data;
  console.log("Here is the state in the load Workouts", state);
};

export const loadWorkout = async function (id) {
  if (!id) return;
  const data = await AJAX(API_URL, id);
  console.log(data);
  state.workout = data.data;
  console.log(state.workout);
};

export const deleteWorkout = async function (id) {
  if (!id) return;
  const data = await DEL_AJAX(API_URL, id);
  console.log(data);
};
