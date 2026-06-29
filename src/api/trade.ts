import http from './http'

export const tradeApi = {
  list: () => http.get('/trades'),
}
