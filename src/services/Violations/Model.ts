import { ObserverType } from '../Observation/Model';

export interface Violation {
  name: string;
  laws: NameWithType[];
  resp: NameWithType[];
}

export interface NameWithType {
  name: string;
  observerType?: ObserverType;
}