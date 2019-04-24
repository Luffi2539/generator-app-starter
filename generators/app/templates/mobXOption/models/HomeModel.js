import { observable, computed, action } from 'mobx';


export default class HomeModel {
  @observable values = [];

  @computed
  get valuesCount() {
    return this.values.length;
  }

  @action
  addValue(input) {
    this.values.push(input);
  }
}
