import axios from 'axios';

const url = 'http://localhost:4000/api';

async function fetchData(inputs) {
  try {
    const res = await axios.post(url, inputs).then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default fetchData;
