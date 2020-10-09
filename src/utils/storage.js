export function addOneToStorage(obj) {
  localStorage.setItem(obj.date, obj.fact);
}

export function removeOneFromStorage(key) {
  localStorage.removeItem(key);
}

export function clearAllStorage() {
  localStorage.clear();
}

export function getAllStorage() {
  const storage = { ...localStorage };
  return Object.keys(storage)
    .map((el) => {
      return { date: el, fact: storage[el] };
    })
    .filter((el) => el.date !== 'loglevel:webpack-dev-server');
}
