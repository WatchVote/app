import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ObservationStateInterface } from './state';

const getters: GetterTree<ObservationStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
