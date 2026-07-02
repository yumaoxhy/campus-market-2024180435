import http from './http'

export const groupBuyApi = {
  list: () => http.get('/groupBuys'),
  create: (data: Record<string, unknown>) => http.post('/groupBuys', data),
  update: (id: number, data: Record<string, unknown>) => http.patch(`/groupBuys/${id}`, data),
  remove: (id: number) => http.delete(`/groupBuys/${id}`),
}
