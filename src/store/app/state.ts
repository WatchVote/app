import { Violation } from 'src/services/Violations/Model';

export interface AppStateInterface {
  title: string;
  currentObservationId: string | null;
  currentActionId: string | null;
  currentViolation?: Violation;
}

function state(): AppStateInterface {
  return {
    title: 'Наблюдение',
    currentObservationId: null,
    currentActionId: null
  }
};

export default state;
