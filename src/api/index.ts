import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

export const api = {
  goods: {
    list: () => request.get('/goods'),
    getById: (id: number) => request.get(`/goods/${id}`),
  },
  lostItems: {
    list: () => request.get('/lostItems'),
  },
  groupBuys: {
    list: () => request.get('/groupBuys'),
  },
  errands: {
    list: () => request.get('/errands'),
  },
  messages: {
    list: () => request.get('/messages'),
  },
  users: {
    getById: (id: number) => request.get(`/users/${id}`),
  },
  categories: {
    list: () => request.get('/categories'),
  },
}

export default request
