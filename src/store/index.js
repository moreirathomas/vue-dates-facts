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

  // delocate !
  //   add(inputs) {
  //     inputs.map((input) => this.state.dataList.push(input));
  //   }
  add(data) {
    this.state.dataList.push(data);
  }

  getState() {
    return readonly(this.state);
  }
}

const store = new Store();
export default store;
