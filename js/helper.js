import { async } from "regenerator-runtime";

export const AJAX = async function (url, id = "") {
  const res = await fetch(`${url}/${id}`);
  const data = await res.json();
  return data;
};

export const DEL_AJAX = async function (url, id = "") {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
