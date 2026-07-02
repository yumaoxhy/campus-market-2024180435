import http from './http'

export const userApi = {
  list: () => http.get('/users'),
  create: (data: Record<string, unknown>) => http.post('/users', data),
}
