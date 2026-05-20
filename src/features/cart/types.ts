export interface CartItem {
  productId: number
  name: string
  priceUnit: string
  unitInfo: string
  image: string
  unitPrice: number
  quantity: number
}

export type OrderType = "delivery" | "pickup"
export type ScheduleMode = "asap" | "scheduled"
export type PaymentMethod = "pix" | "cash" | "card"

export interface CheckoutFormData {
  customerName: string
  phone: string
  orderType: OrderType | ""
  address: string
  number: string
  neighborhood: string
  complement: string
  reference: string
  scheduleMode: ScheduleMode
  scheduledTime: string
  paymentMethod: PaymentMethod | ""
  changeFor: string
  notes: string
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>
