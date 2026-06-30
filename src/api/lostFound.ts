import http from './http'

export const lostFoundApi = {
  list: () => http.get('/lostFounds'),
  create: (data: Record<string, unknown>) => http.post('/lostFounds', data),
}
