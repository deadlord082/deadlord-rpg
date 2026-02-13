export interface MerchantEvent {
  type: "merchant"
  inventory: {
    itemId: string
    price: number
    stock?: number | null
  }[]
}