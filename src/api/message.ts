import http from './http'

export const messageApi = {
  list: () => http.get('/messages'),
}
