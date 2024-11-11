import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Card, Text, Button } from "react-native-paper"

interface CounterComponentProps {
	onAddToCart?: (count: number) => void
}

const DetailBookScreen: React.FC<CounterComponentProps> = ({ onAddToCart }) => {
	const [count, setCount] = useState(0)

	const handleIncrement = () => setCount(count + 1)
	const handleDecrement = () => {
		if (count > 1) {
			setCount(count - 1)
		} else {
			setCount(0)
		}
	}

	const handleAddToCart = () => {
		setCount(1) // Start with 1 on "Add to Cart"
		if (onAddToCart) {
			onAddToCart(1)
		}
	}
	return (
		<View>
			<Card>
				<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
				<Card.Content>
					<Text variant="titleLarge">What is Lorem Ipsum?</Text>
					<Text variant="bodyMedium">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
						recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem
						Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
					</Text>
				</Card.Content>
			</Card>
			<View style={styles.container}>
				{count === 0 ? (
					<Button
						mode="contained"
						onPress={handleAddToCart}
					>
						Add to Cart
					</Button>
				) : (
					<View style={styles.counterContainer}>
						<Button
							mode="outlined"
							onPress={handleDecrement}
							disabled={count === 1}
						>
							-
						</Button>
						<Text style={styles.countText}>{count}</Text>
						<Button
							mode="outlined"
							onPress={handleIncrement}
						>
							+
						</Button>
					</View>
				)}
			</View>
		</View>
	)
}

export default DetailBookScreen

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10
	},
	counterContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	countText: {
		fontSize: 18,
		marginHorizontal: 10
	}
})
