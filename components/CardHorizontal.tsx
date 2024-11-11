import React from "react"
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from "react-native"
import { Card, Icon } from "@rneui/themed"

function CardHorizontal({ img, onPress }) {
	return (
		<Card containerStyle={styles.card}>
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.content}>
					<Image
						source={{ uri: img }}
						style={styles.image}
						resizeMode="cover"
					/>
					<View style={styles.textContent}>
						<View style={styles.rating}>
							{[...Array(4)].map((_, i) => (
								<Icon
									key={i}
									name="star"
									type="font-awesome"
									color="#f5c518"
									size={16}
								/>
							))}
							<Icon
								name="star-o"
								type="font-awesome"
								color="#f5c518"
								size={16}
							/>
						</View>
						<Text style={styles.title}>Forget everything that you think you know</Text>
						<View style={styles.authorContainer}>
							<Image
								source={{ uri: "https://example.com/author-image.jpg" }} // Replace with actual author image
								style={styles.authorImage}
							/>
							<Text style={styles.author}>A. Roger Ekirch</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Card>
	)
}

export default CardHorizontal

const styles = StyleSheet.create({
	card: {
		padding: 0,
		borderRadius: 10,
		overflow: "hidden"
	},
	content: {
		flexDirection: "row",
		padding: 10
	},
	image: {
		width: 80,
		height: 120,
		borderRadius: 10,
		marginRight: 10
	},
	textContent: {
		flex: 1,
		justifyContent: "center"
	},
	rating: {
		flexDirection: "row",
		marginBottom: 5
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5
	},
	authorContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5
	},
	authorImage: {
		width: 20,
		height: 20,
		borderRadius: 10,
		marginRight: 5
	},
	author: {
		fontSize: 14,
		color: "#555"
	}
})
