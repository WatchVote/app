import { Regulation } from './Model'
import { parlamentElection } from './data/ParlamentElection';

export class RegulationService {
  static getAllRegulations(): { value: string; label: string }[] {
    return [
        {value: parlamentElection.id, label: parlamentElection.name},
    ]
  }

  static getRegulation(id: string) : Regulation {
    if (id == parlamentElection.id) return parlamentElection;
    throw {};
  }
}
