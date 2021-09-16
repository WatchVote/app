import { Observation } from 'src/services/Observation/Model';
import { Violation } from 'src/services/Violations/Model';
import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {
  openObservation(state: AppStateInterface, observation: Observation) {
    state.title = observation.name;
    state.currentObservationId = observation.id;
    state.currentActionId = null;
  },

  openViolation(state: AppStateInterface, violation: Violation) {
    state.currentViolation = violation;
  }
};

export default mutation;
