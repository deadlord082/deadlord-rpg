export interface MerchantEvent {
    type: "merchant"
    beforeDialog?: string
    afterDialog?: string
    inventory: {
      itemId: string
      price: number
    }[]
  }
  