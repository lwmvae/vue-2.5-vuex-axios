import axios from 'axios'

export function getCourse() {
  const url = 'http://localhost:8080/static/json/courseCenter.json';
  return axios.get(url).then((res) => {
    return res.data;
  });
}

export function getCertificateList(){
	 const url = 'http://localhost:8080/static/json/certificateList.json';
  return axios.get(url).then((res) => {
    return res.data;
  });
}
