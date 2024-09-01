import React, { useState, useRef, useEffect } from "react"
import { Animated, View, StyleSheet, Dimensions } from "react-native"
import { Text, Avatar, Tab, TabView, Image } from "@rneui/themed"

const genres = ["Popular", "Romance", "Fanfiction", "Poetry"]
const screenWidth = Dimensions.get("window").width

export default function HomeScreen() {
	const [index, setIndex] = useState(0)
	const scaleAnimations = genres.map(() => useRef(new Animated.Value(1)).current)

	// Function to handle scaling animation when the tab changes
	const handleTabChange = (newIndex) => {
		// Animate scale of current active image back to normal
		Animated.timing(scaleAnimations[index], {
			toValue: 1,
			duration: 200,
			useNativeDriver: true
		}).start(() => {
			// Update the index and animate the new active image
			setIndex(newIndex)
			Animated.timing(scaleAnimations[newIndex], {
				toValue: 1.1,
				duration: 300,
				useNativeDriver: true
			}).start()
		})
	}

	useEffect(() => {
		// Set initial scale animation for the first active image
		Animated.timing(scaleAnimations[0], {
			toValue: 1.1,
			duration: 300,
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text h1>Read your favorite Book</Text>
				<Avatar
					title="M"
					size={"medium"}
					rounded
					containerStyle={styles.avatarBG}
				/>
			</View>

			{/* Tabs to switch between views */}
			<Tab
				value={index}
				onChange={handleTabChange}
				scrollable
				disableIndicator
				style={{ margin: 10 }}
			>
				{genres.map((row, i) => (
					<Tab.Item
						key={row}
						containerStyle={{
							backgroundColor: i === index ? "#2fc7b8" : undefined,
							borderRadius: 25
						}}
						titleStyle={{
							color: i === index ? "#fff" : "#2fc7b8"
						}}
					>
						{row}
					</Tab.Item>
				))}
			</Tab>

			{/* Ensuring the TabView is positioned below the tabs */}
			<View style={styles.tabViewWrapper}>
				<TabView
					value={index}
					onChange={handleTabChange}
					animationType="timing"
				>
					{genres.map((row, i) => (
						<TabView.Item
							key={row}
							style={styles.tabViewItem}
						>
							<Animated.View style={[styles.animatedImageContainer, { transform: [{ scale: scaleAnimations[i] }] }]}>
								<Image
									source={{
										uri: "https://danbrown.com/wp-content/uploads/2017/06/US_Big.jpg"
									}}
									style={styles.image}
								/>
							</Animated.View>
						</TabView.Item>
					))}
				</TabView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		flex: 1 // To ensure the layout expands correctly
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8
	},
	avatarBG: {
		backgroundColor: "#2fc7b8"
	},
	tabViewWrapper: {
		flex: 1, // Ensures TabView takes remaining space below the tabs
		marginTop: 10 // Adjust as needed to add spacing below tabs
	},
	tabViewItem: {
		width: screenWidth, // Ensures each item takes full screen width
		justifyContent: "flex-start", // Aligns TabView items at the top
		alignItems: "center" // Centers content horizontally
	},
	animatedImageContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		width: 200,
		height: 300,
		borderRadius: 20
	}
})
