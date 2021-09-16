import { CountType, ObserverType } from '../Observation/Model';

export interface Regulation {
  id: string;
  name: string;
  days: RegulationDay[];
  variables: RegulationVariable[];
  districts: District[];
  sections: RegulationSection[];
}

export interface RegulationDay {
  id: number;
  name: string;
  date?: Date;
  isElectionDay: boolean;
  isFinishDay: boolean;
}

export interface RegulationSection {
  name: string;
  title?: string;
  countType?: CountType;
  actions: RegulationAction[];
  applyToDays: number[];
}

export interface RegulationAction {
  text: string;
  variables: string[];
  link?: string;
  observerType?: ObserverType;
  law?: string;
  resp?: string;
  descr?: string;
}

export interface RegulationVariable {
  id: string;
  name: string;
  value?: number;
}

export interface District {
  number: number;
  name: string;
  candidates: string[];
}