import http from './http'

export const errandApi = {
  list: () => http.get('/errands'),
  create: (data: Record<string, unknown>) => http.post('/errands', data),
}
