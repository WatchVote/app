import { Guid } from 'guid-typescript';
import { Regulation } from '../Regulation/Model';
import { CountType, Observation, ObservationAction,
  ObservationListItem, ObservationListItemDay, ObservationSection,
  ObservationVariable, ObserverType,ObservationProtocolRow } from './Model';

const OBSERVATIONS_KEY = 'observations';
const SECTION_KEY = '_sections';

const rows: ObservationProtocolRow[] = [
  { index: 1, name: 'Число избирателей, внесенных в список избирателей на момент окончания голосования'},
  { index: 2, name: 'Число избирательных бюллетеней, полученных участковой избирательной комиссией'},
  { index: 3, name: 'Число избирательных бюллетеней, выданных избирателям, проголосовавшим досрочно'},
  { index: 4, name: 'Число избирательных бюллетеней, выданных участковой избирательной комиссией избирателям в помещении для голосования в день голосования'},
  { index: 5, name: 'Число избирательных бюллетеней, выданных избирателям, проголосовавшим вне помещения для голосования в день голосования'},
  { index: 6, name: 'Число погашенных избирательных бюллетеней'},
  { index: 7, name: 'Число избирательных бюллетеней, содержащихся в переносных ящиках для голосования'},
  { index: 8, name: 'Число избирательных бюллетеней, содержащихся в стационарных ящиках для голосования'},
  { index: 9, name: 'Число недействительных избирательных бюллетеней'},
  { index: 10, name: 'Число действительных избирательных бюллетеней'},
  { index: 11, name: 'Число утраченных избирательных бюллетеней'},
  { index: 12, name: 'Число избирательных бюллетеней, не учтенных при получении'},
]

export class ObservationService {
  static getAllObservations(): ObservationListItem[] {
    return JSON.parse(localStorage.getItem(OBSERVATIONS_KEY) || '[]') as ObservationListItem[];
  }

  static createObservation(regulation: Regulation, observerType: ObserverType, countType: CountType): void {
    // create observations
    const observations: Observation[] = []
    const lastDay = regulation.days[regulation.days.length - 1];
    for (const regulationDay of regulation.days) {
      const observation : Observation = {
        id: Guid.create().toString(),
        name: regulationDay.name,
        observerType: observerType,
        isElectionDay: regulationDay.isElectionDay,
        isFinishDay: regulationDay.isFinishDay,
        countType: countType,
         sections: regulation.sections.filter(x => x.applyToDays.includes(regulationDay.id) && (x.countType == undefined || x.countType == countType)).map<ObservationSection>(s =>({
          id: Guid.create().toString(),
          name: s.name,
          title: s.title,
          isOpen: false,
          actions: s.actions.filter(a => a.observerType == undefined || a.observerType == observerType).map<ObservationAction>(a => ({
            id: Guid.create().toString(),
            text: a.text,
            isDone: false,
            descr: a.descr,
            link: a.link,
            variables: a.variables,
            law: a.law,
            resp: a.resp
          }))
        })),
        variables: regulation.variables.map<ObservationVariable>(v => ({
          id: v.id,
          name: v.name
        })),
        turnouts: [],
        partiesRows: [],
        candidatesRows: []
      }

      // turnouts
      for (let i = 8.5; i <= 20; i += 0.5) {
       observation.turnouts.push({
          hour: i,
       })
      }

      // total rows
      if (regulationDay == lastDay)
      {
        for (const row of rows) observation.partiesRows.push(row);
        let candidateIndex = 13;
        for (const candidate of regulation.districts[0].candidates) observation.partiesRows.push({
            index: candidateIndex++,
            name: candidate
          });

        for (const row of rows) observation.candidatesRows.push(row);
        for (let i = 13; i < 20; i++) observation.candidatesRows.push({ index: i, name: '' })
      }

      observations.push(observation)
      this.saveObservation(observation);
    }

    const list = this.getAllObservations();

    list.push({
      id: Guid.create().toString(),
      name: regulation.name,
      observerType: observerType,
      countType: countType,
      days: observations.map<ObservationListItemDay>(d => ({
        id: d.id,
        name: d.name
      }))
    })

    localStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(list));
  }

  static getObservation(id: string): Observation {
    const key = id + SECTION_KEY;
    return JSON.parse(localStorage.getItem(key) || 'null') as Observation
  }

  static removeObservation(observation: ObservationListItem): void {
    let all = this.getAllObservations();
    all = all.filter(x => x.id != observation.id)
    localStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(all));
    for(const day of observation.days)
      localStorage.removeItem(day.id + SECTION_KEY);
  }

  static saveObservation(observation: Observation): void {
    const key = observation.id + SECTION_KEY;
    localStorage.setItem(key, JSON.stringify(observation));
  }
}
