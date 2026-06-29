import http from './http'

export const groupBuyApi = {
  list: () => http.get('/groupBuys'),
}
