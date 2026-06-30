import http from './http'

export const tradeApi = {
  list: () => http.get('/trades'),
  create: (data: Record<string, unknown>) => http.post('/trades', data),
}
