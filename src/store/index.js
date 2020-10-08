import { reactive, readonly } from 'vue';

class Store {
  constructor() {
    let data = this.data();
    this.state = reactive(data);
  }

  data() {
    return {
      factsList: [],
    };
  }

  add(element) {
    if (
      element.date &&
      element.fact &&
      this.state.factsList.findIndex((el) => el.date === element.date) === -1
    ) {
      this.state.factsList.push(element);
    }
  }

  clear() {
    this.state.factsList.length = 0;
  }

  getState() {
    return readonly(this.state);
  }
}

const store = new Store();
export default store;
