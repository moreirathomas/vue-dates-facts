import axios from 'axios';
import { Fact } from '../types';

const url = 'http://localhost:4000/api';

export async function fetchData(terms: string[]): Promise<Fact[] | null> {
  try {
    const res = await axios.post(url, terms).then((res) => res.data);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
