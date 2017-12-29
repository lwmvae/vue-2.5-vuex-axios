import axios from 'axios'

export function getCourse() {
  const url = 'http://localhost:8080/static/json/courseCenter.json';
  return axios.get(url).then((res) => {
    return res.data;
  });
}
