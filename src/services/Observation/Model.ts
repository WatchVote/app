export interface ObservationListItem {
    id: string;
    name: string;
    observerType: ObserverType;
    countType: CountType;
    days: ObservationListItemDay[];
  }

  export interface ObservationListItemDay {
    id: string;
    name: string;
  }

  export interface Observation {
    id: string;
    name: string;
    isElectionDay: boolean,
    isFinishDay: boolean,
    observerType: ObserverType;
    countType: CountType;
    sections: ObservationSection[];
    variables: ObservationVariable[];
    turnouts: ObservationTurnout[];

    partiesRows: ObservationProtocolRow[];
    candidatesRows: ObservationProtocolRow[];
  }

  export interface ObservationSection {
    id: string;
    name: string;
    title?: string;
    actions: ObservationAction[];

    isOpen: boolean;
  }

  export interface ObservationAction {
    id: string;
    text: string;
    variables: string[]
    link?: string;
    law?: string;
    resp?: string;
    descr?: string;
    isDone: boolean;
  }

  export interface ObservationTurnout {
    hour: number;
    value?: number;
  }

  export interface ObservationVariable {
    id: string;
    name: string;
    value?: number;
  }

  export interface ObservationDistrict {
    id: string;
    name: string;
    candidates: [],
    variables: []
  }

  export interface ObservationProtocolRow {
    index: number;
    name: string;
    value?: number;
  }

  export enum ObserverType {
    observer = 0,
    adviser = 1
  }

  export enum CountType {
    manual = 0,
    koib = 1
  }