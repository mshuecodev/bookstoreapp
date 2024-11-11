import { RootState } from "@/store"

export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount
