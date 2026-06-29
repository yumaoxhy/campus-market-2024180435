import http from './http'

export const errandApi = {
  list: () => http.get('/errands'),
}
