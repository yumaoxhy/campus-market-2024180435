import http from './http'

export const groupBuyApi = {
  list: () => http.get('/groupBuys'),
  create: (data: Record<string, unknown>) => http.post('/groupBuys', data),
}
