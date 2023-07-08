export interface ILocalSourceData {
  url: string
}

export const fetchMsft = async <R = any, Raw extends boolean = false>(
  source: ILocalSourceData,
  path: string,
  init?: RequestInit,
  raw?: Raw
) => {
  init ??= {}
  init.headers = {
    ...init.headers
  }
  const response = await fetch(`${source.url}${path}`, init)
  const data = raw ? response : await response.json()
  return data as Raw extends true ? Response : R
}
