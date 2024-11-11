import apiClient from "./apiClient"
import { Book } from "@/features/books/bookTypes"

export const fetchBooks = async (): Promise<Book[]> => {
	const response = await apiClient.get<Book[]>("/books")
	return response.data
}

export const fetchBookById = async (id: number): Promise<Book> => {
	const response = await apiClient.get<Book>(`/books/${id}`)
	return response.data
}
