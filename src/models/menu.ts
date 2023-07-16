export interface ICategory {
  id?: number
  name: string
  description: string
  createdAt?: string
}

export interface IUnit {
  id?: number
  name: string
  description: string
  createdAt?: string
}

export interface IMenuItem {
  id?: number
  name: string
  description: string
  image?: string
  price: number
  discountPrice: number
  unitId: number
  categoryId: number
  restaurantId: number
  createdAt?: string
  MenuUnit?: {
    name: string
  }
  Category?: {
    name: string
  }
}
