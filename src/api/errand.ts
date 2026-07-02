import http from './http'

export const errandApi = {
  list: () => http.get('/errands'),
  create: (data: Record<string, unknown>) => http.post('/errands', data),
  update: (id: number, data: Record<string, unknown>) => http.patch(`/errands/${id}`, data),
  remove: (id: number) => http.delete(`/errands/${id}`),
}
