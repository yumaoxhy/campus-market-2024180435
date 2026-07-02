export interface Trade {
  id: number
  title: string
  category: string
  price: number
  condition: string
  location: string
  publisher: string
  publishTime: string
  image: string
  status: string
  description: string
  contact?: string
}

export interface LostFound {
  id: number
  title: string
  type: string
  itemName: string
  location: string
  eventTime: string
  contact: string
  status: string
  description: string
  publisher: string
  publishTime?: string
}

export interface GroupBuy {
  id: number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  publisher: string
  status: string
  description: string
}

export interface Errand {
  id: number
  title: string
  taskType: string
  reward: number
  from: string
  to: string
  deadline: string
  publisher: string
  status: string
  description: string
}

export interface Message {
  id: number
  fromUserId: number
  toUserId: number
  content: string
  createTime: string
  isRead: boolean
}
