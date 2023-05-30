import { db, useQuery } from '@/database'
import { defineStore } from 'pinia'

export const useDataSources = defineStore('data_sources', () => {
  const sources = useQuery(() => db.dataSources.toArray())
  return { sources }
})
