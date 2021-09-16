import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ObservationStateInterface } from './state';

const actions: ActionTree<ObservationStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
