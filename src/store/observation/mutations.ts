import { MutationTree } from 'vuex';
import { ActionVariableMap, ObservationStateInterface } from './state';
import {
  ObservationAction,
  ObservationSection,
  ObservationVariable,
  ObservationListItemDay,
  ObservationTurnout,
} from 'src/services/Observation/Model';
import { ObservationService } from 'src/services/Observation/ObservationService';

const mutation: MutationTree<ObservationStateInterface> = {
  // init(state: ObservationStateInterface) {
  //   Object.assign(
  //     state,
  //     JSON.parse(localStorage.getItem('observation') || 'null')
  //   );
  // },

  open(state: ObservationStateInterface, day: ObservationListItemDay) {
    state.currentObservation = ObservationService.getObservation(day.id);

    const actionVariables: ActionVariableMap = {}
    for (const section of state.currentObservation.sections) {
      for (const action of section.actions) {
        for (const varId of action.variables) {
          const variable : ObservationVariable | undefined = state.currentObservation.variables.find(x => x.id == varId);
          if (variable) {
            let array = actionVariables[action.id]
            if (array == undefined) {
              array = []
              actionVariables[action.id] = array
            }
            actionVariables[action.id].push(variable)
          }
        }
      }
    }
    state.actionVariables = actionVariables;
  },

  selectAction(state: ObservationStateInterface, action: ObservationAction) {
    state.currentAction = action;
  },

  setSectionOpen(
    state: ObservationStateInterface,
    { section, value }: { section: ObservationSection; value: boolean }
  ) {
    section.isOpen = value;
    ObservationService.saveObservation(state.currentObservation);
  },

  setActionState(
    state: ObservationStateInterface,
    { action, value }: { action: ObservationAction; value: boolean }
  ) {
    action.isDone = value;
    ObservationService.saveObservation(state.currentObservation);
  },

  setVariableValue(
    state: ObservationStateInterface,
    { variable, value }: { variable: ObservationVariable; value: number }
  ) {
    variable.value = value;
    ObservationService.saveObservation(state.currentObservation);
  },

  setTurnOutValue(
    state: ObservationStateInterface,
    { turnout, value }: { turnout: ObservationTurnout; value: number }
  ) {
    turnout.value = value;
    ObservationService.saveObservation(state.currentObservation);
  },

  setRowValue(
    state: ObservationStateInterface,
    { row, value }: { row: ObservationTurnout; value: number }
  ) {
    row.value = value;
    ObservationService.saveObservation(state.currentObservation);
  },
};

export default mutation;
