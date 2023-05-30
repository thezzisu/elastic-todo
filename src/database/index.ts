import Dexie, { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { Table } from 'dexie'
import type { Observable } from 'rxjs'

export interface IDataSource<D = unknown> {
  id?: number
  providerId: string
  name: string
  data: D
}

export class AppDatabase extends Dexie {
  dataSources!: Table<IDataSource>

  constructor() {
    super('elastic-todo')
    this.version(1).stores({
      dataSources: '++id, providerId'
    })
  }
}

export const db = new AppDatabase()

export const useQuery = <T>(querier: () => T | Promise<T>, initialValue?: T) => {
  return useObservable(liveQuery(querier) as unknown as Observable<T>, { initialValue })
}
