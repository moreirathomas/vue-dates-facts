import { reactive, readonly } from 'vue';

class Store {
  constructor() {
    let data = this.data();
    this.state = reactive(data);
  }

  data() {
    return {
      dataList: [],
    };
  }

  add(data) {
    this.state.dataList.push(data);
  }

  clear() {
    this.state.dataList.length = 0;
  }

  getState() {
    return readonly(this.state);
  }
}

const store = new Store();
export default store;
