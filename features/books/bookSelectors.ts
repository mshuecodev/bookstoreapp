import { RootState } from "@/store"

export const selectBookList = (state: RootState) => state.books.list
export const selectBooksLoading = (state: RootState) => state.books.loading
export const selectBooksError = (state: RootState) => state.books.error
