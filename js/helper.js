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
export const POST_PUT_AJAX = async function (url, data, id = "") {
  const res = await fetch(`${url}${id ? `/${id}` : ""}`, {
    method: `${id ? "PUT" : "POST"}`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const data_Res = await res.json();
  return data_Res;
};
