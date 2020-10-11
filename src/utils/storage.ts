import { Fact } from '../types';

export function addOneToStorage(obj: Fact): void {
  localStorage.setItem(obj.date, obj.fact);
}

export function removeOneFromStorage(key: string): void {
  localStorage.removeItem(key);
}

export function clearAllStorage(): void {
  localStorage.clear();
}

export function getAllStorage(): Fact[] {
  const storage = { ...localStorage };
  return Object.keys(storage)
    .map((el) => {
      const obj: Fact = { date: el, fact: storage[el] };
      return obj;
    })
    .filter((el) => el.date !== 'loglevel:webpack-dev-server');
}
