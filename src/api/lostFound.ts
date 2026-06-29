import http from './http'

export const lostFoundApi = {
  list: () => http.get('/lostFounds'),
}
