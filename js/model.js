import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { AJAX, DEL_AJAX, POST_PUT_AJAX } from "./helper";

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
// Remember to put data aysnc
// export const postData = function () {
//   // if (!data) return;
//   const putWorkout = {};
//   putWorkout.name = `${dataTEST[0][1]}`;
//   putWorkout.focus = `${dataTEST[1][1]}`;
//   const indexes = [];
//   dataTEST.forEach((element, i) => {
//     if (element[0].includes("exercise")) {
//       indexes.push(i);
//     }
//   });
//   data.exercises = [];
//   const exercise = {};
//   exercise.name = data.exercises.push();
//   console.log(putWorkout, indexes);
// };
export const mapFormDataToWorkoutObject = (formData) => {
  const data = Object.fromEntries(formData);
  console.log(data);

  const workoutObj = {
    name: data["workout-name"],
    focus: data["workout-focus"],
    exercises: [],
  };

  let index = 0;
  while (data[`exercise-${index + 1}`]) {
    console.log(`Found exercise ${index + 1}`);
    workoutObj.exercises[index] = {
      name: data[`exercise-${index + 1}`],
      sets: [],
    };
    let setIndex = 0;
    while (data[`weight-${index + 1}-${setIndex + 1}`]) {
      console.log(`Found set ${index + 1}-${setIndex + 1}`);
      const rest = data[`rest-${index + 1}-${setIndex + 1}`].split(" ");
      workoutObj.exercises.at(index).sets[setIndex] = {
        weight: data[`weight-${index + 1}-${setIndex + 1}`],
        reps: data[`reps-${index + 1}-${setIndex + 1}`],
        min: rest.at(0),
        sec: rest.at(1),
      };
      setIndex++;
    }
    index++;
  }
  console.log(workoutObj);
  return workoutObj;
};

export const postWorkout = async function (data, id = "") {
  const response = await POST_PUT_AJAX(API_URL, data, id);
  console.log(response);
  return response.data.id;
};
