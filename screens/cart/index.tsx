import { View, Text } from "react-native"
import React from "react"

interface CartPageProps {
	isActive: boolean
}

const CartPage: React.FC<CartPageProps> = ({ isActive }) => {
	return (
		<View>
			{/* Profile page content */}
			{isActive && <Text>Cart is active</Text>}
		</View>
	)
}

export default CartPage
