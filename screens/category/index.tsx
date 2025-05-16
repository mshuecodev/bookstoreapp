import { View, Text } from "react-native"
import React from "react"

interface CategoryPageProps {
	isActive: boolean
}

const CategoryPage: React.FC<CategoryPageProps> = ({ isActive }) => {
	return (
		<View>
			{/* Profile page content */}
			{isActive && <Text>Category is active</Text>}
		</View>
	)
}

export default CategoryPage
