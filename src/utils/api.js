import axios from 'axios';

const url = 'http://localhost:4000/api';

/**
 * @param {string} inputs
 * @param {{date: string, fact: string}[]} list
 * @returns {boolean} fasle: not a duplicate, true: duplicate
 */
export function checkDuplicate(input, list) {
  return list.findIndex((el) => el.date === input) !== -1;
}

/**
 * @param {string[]} inputs
 * @returns {{date: string, fact: string}[]}
 */
export async function fetchData(inputs) {
  try {
    const res = await axios.post(url, inputs).then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
}
