import http from './http'

export const userApi = {
  list: () => http.get('/users'),
  create: (data: Record<string, unknown>) => http.post('/users', data),
  update: (id: number, data: Record<string, unknown>) => http.patch(`/users/${id}`, data),
}
