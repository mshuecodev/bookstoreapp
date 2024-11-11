import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchBooks } from "./bookSlice"
import { selectBookList, selectBooksLoading, selectBooksError } from "./bookSelectors"

export const useBooks = () => {
	const dispatch = useAppDispatch()
	const books = useAppSelector(selectBookList)
	const loading = useAppSelector(selectBooksLoading)
	const error = useAppSelector(selectBooksError)

	// Define actions that interact with the Redux store
	const loadBooks = () => {
		dispatch(fetchBooks())
	}

	return {
		books,
		loading,
		error,
		loadBooks
	}
}
