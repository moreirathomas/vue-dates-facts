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

  addOne(el) {
    this.state.factsList.push(el);
  }

  removeOne(index) {
    this.state.factsList.splice(index, 1);
  }

  clearAll() {
    this.state.factsList.length = 0;
  }

  getState() {
    return readonly(this.state);
  }
}

const store = new Store();
export default store;
