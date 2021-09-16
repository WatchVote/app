import {
  CountType,
  Observation,
  ObservationAction,
  ObservationVariable,
  ObserverType
} from 'src/services/Observation/Model';

export interface ObservationStateInterface {
  currentObservation: Observation;
  currentAction: ObservationAction;
  actionVariables: ActionVariableMap;
}

export interface ActionVariableMap {
  [key: string] : ObservationVariable[];
}

export interface Window {
  savedPosition?: ScrollPosition;
}

export interface ScrollPosition {
  left: number;
  top: number;
}

function state(): ObservationStateInterface {
  return {
    currentObservation: {
      id: '20be6ae2-a986-4919-9ac5-a625f7685d6c',
      name: '',
      countType: CountType.manual,
      isElectionDay: false,
      isFinishDay: false,
      observerType: ObserverType.observer,
      sections: [],
      variables: [],
      turnouts: [],
      candidatesRows: [],
      partiesRows: []
    },
    currentAction: {
      id: '',
      isDone: false,
      text: '',
      variables: [],
    },
    actionVariables: {}
  };
}

export default state;
