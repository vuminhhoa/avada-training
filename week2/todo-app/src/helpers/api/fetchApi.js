const API_URL = "http://localhost:5000/api";

export default async function fetchApi({
  url = "todos",
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  body = {},
}) {
  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(`${API_URL}/${url}`, options);
  return res.json();
}
