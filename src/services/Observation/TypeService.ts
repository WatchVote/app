
import { ObserverType, CountType } from './Model';


export class TypeService {
  static getAllObserverTypes() {
    return [ ObserverType.observer, ObserverType.adviser ].map(x => ({
      label: this.getObserverTypeName(x), value: x
    }))
  }

  static getAllCountTypes() {
    return [ CountType.manual, CountType.koib ].map(x => ({
      label: this.getCountTypeName(x), value: x
    }))
  }

  static getObserverTypeName(type: ObserverType): string {
    switch (type) {
      case ObserverType.observer: return 'Наблюдатель';
      case ObserverType.adviser: return 'Член комиссии с правом совещательного голоса';
      default: return 'Неизв. тип';
    }
  }

  static getCountTypeName(type: CountType): string {
    switch (type) {
      case CountType.manual: return 'Ручной';
      case CountType.koib: return 'КОИБ';
      default: return 'Неизв. тип';
    }
  }
}
