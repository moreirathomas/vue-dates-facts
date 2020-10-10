import axios from 'axios';

const url = 'http://localhost:4000/api';

/**
 * @param {string[]} terms
 * @returns {{date: string, fact: string}[]}
 */
export async function fetchData(terms) {
  try {
    const res = await axios.post(url, terms).then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
}
