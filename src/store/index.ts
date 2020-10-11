import { reactive, readonly } from 'vue';
import { Fact } from '../types';

class Store {
  state: { factsList: Fact[] };

  constructor() {
    let data = this.data();
    this.state = reactive(data);
  }

  data() {
    return {
      factsList: [],
    };
  }

  addOne(el: Fact) {
    this.state.factsList.push(el);
  }

  removeOne(index: number) {
    this.state.factsList.splice(index, 1);
  }

  clearAll() {
    this.state.factsList.length = 0;
  }

  getState() {
    return readonly(this.state);
  }

  isInStore(term: string): boolean {
    return this.state.factsList.some((el) => el.date === term);
  }
}

const store = new Store();
export default store;
