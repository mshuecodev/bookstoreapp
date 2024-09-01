import React, { useRef, useState, useEffect } from "react"
import { Animated, View, StyleSheet, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from "react-native"
import { Text, Avatar, Tab, Image, Button } from "@rneui/themed"
import CardHorizontal from "@/components/CardHorizontal"

const genres: string[] = ["Popular", "Romance", "Fanfiction", "Poetry"]
const books: string[] = ["https://danbrown.com/wp-content/uploads/2016/09/Thumb2Tall.jpg", "https://danbrown.com/wp-content/uploads/2017/06/US_Big.jpg", "https://danbrown.com/wp-content/themes/danbrown/images/db/books.02.jpg", "https://danbrown.com/wp-content/uploads/2013/01/robert-langdon-thriller-title-image.jpg"]
const screenWidth = Dimensions.get("window").width
const ITEM_WIDTH = 200
const ITEM_SPACING = 20

const HomeScreen: React.FC = () => {
	const [index, setIndex] = useState<number>(0)
	const scrollX = useRef(new Animated.Value(0)).current
	const flatListRef = useRef<FlatList<string>>(null)

	const handleTabChange = (newIndex: number) => {
		setIndex(newIndex)
		flatListRef.current?.scrollToOffset({
			offset: newIndex * (ITEM_WIDTH + ITEM_SPACING),
			animated: true
		})
	}

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		scrollX.setValue(event.nativeEvent.contentOffset.x)
	}

	useEffect(() => {
		const listenerId = scrollX.addListener(({ value }) => {
			const newIndex = Math.floor(value / (ITEM_WIDTH + ITEM_SPACING))
			if (newIndex !== index && newIndex >= 0 && newIndex < genres.length) {
				setIndex(newIndex)
			}
		})

		return () => {
			scrollX.removeListener(listenerId)
		}
	}, [index, scrollX])

	return (
		<ScrollView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text h1>Read your favorite Book</Text>
				<Avatar
					title="M"
					size={"medium"}
					rounded
					containerStyle={styles.avatarBG}
				/>
			</View>

			<View style={styles.section}>
				<Tab
					value={index}
					onChange={handleTabChange}
					scrollable
					disableIndicator
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

				<Animated.FlatList
					ref={flatListRef}
					data={books}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.flatListContainer}
					renderItem={({ item, index: itemIndex }) => {
						const scale = scrollX.interpolate({
							inputRange: [(itemIndex - 1) * (ITEM_WIDTH + ITEM_SPACING), itemIndex * (ITEM_WIDTH + ITEM_SPACING), (itemIndex + 1) * (ITEM_WIDTH + ITEM_SPACING)],
							outputRange: [0.9, 1.1, 0.9],
							extrapolate: "clamp"
						})

						return (
							<Animated.View style={[styles.imageContainer, { transform: [{ scale }] }]}>
								<Image
									source={{ uri: item }}
									style={styles.image}
									resizeMode="cover"
								/>
							</Animated.View>
						)
					}}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					snapToInterval={ITEM_WIDTH + ITEM_SPACING}
					decelerationRate="fast"
					bounces={false}
				/>
			</View>

			<View style={styles.section}>
				<View style={styles.flexBetween}>
					<Text h3>Audio Books</Text>
					<Button
						title="See All"
						type="clear"
						titleStyle={styles.btnLink}
					/>
				</View>

				<View>
					{books.map((row) => {
						return (
							<CardHorizontal
								key={row}
								img={row}
							/>
						)
					})}
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		flex: 1,
		backgroundColor: "#fff"
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8
	},
	flexBetween: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	section: {
		marginVertical: 10
	},
	avatarBG: {
		backgroundColor: "#2fc7b8"
	},
	flatListContainer: {
		marginVertical: 20,
		paddingHorizontal: (screenWidth - ITEM_WIDTH) / 2
	},
	imageContainer: {
		width: ITEM_WIDTH,
		height: 300,
		borderRadius: 20,
		marginHorizontal: ITEM_SPACING / 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		borderColor: "#ff0000", // Debug border color
		borderWidth: 2 // Debug border width
	},
	image: {
		width: ITEM_WIDTH, // Explicit width
		height: 300, // Explicit height
		borderRadius: 20
	},
	btnLink: {
		color: "#2fc7b8"
	}
})

export default HomeScreen
