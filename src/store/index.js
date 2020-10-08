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
    if (this.state.dataList.findIndex((el) => el.date === data.date) === -1) {
      this.state.dataList.push(data);
    }
  }

  getState() {
    return readonly(this.state);
  }
}

const store = new Store();
export default store;
