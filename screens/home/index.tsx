import React from "react"
import { ScrollView, Image, Animated, View, Dimensions } from "react-native"
import { Box, Text, Pressable, Button, Avatar, Link, LinkText, Heading } from "@/components/ui"
import { useState, useRef } from "react"
import { ChevronDownIcon } from "lucide-react-native"
import CardHorizontal from "@/components/CardHorizontal" // Custom component
import { useRouter } from "expo-router"
import { ScrollViewTabs } from "@/components/ScrollViewTabs"

const tabs = [
	{
		title: "Fantasy"
	},
	{
		title: "Sci-Fi"
	},
	{
		title: "Mystery"
	},
	{
		title: "Crime"
	},
	{
		title: "Drama"
	},
	{
		title: "Romance"
	}
]

export function HomeScreen() {
	const [expanded, setExpanded] = useState(false)
	const [index, setIndex] = useState(0)
	const flatListRef = useRef(null)
	const scrollX = useRef(new Animated.Value(0)).current
	const router = useRouter()

	const [activeTab, setActiveTab] = React.useState(tabs[0])

	const books = ["https://linktoimage.com/1", "https://linktoimage.com/2"]
	const ITEM_WIDTH = 200
	const ITEM_SPACING = 20
	const screenWidth = Dimensions.get("window").width

	const handleTabChange = (i: number) => setIndex(i)
	const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })

	return (
		<ScrollView className="flex-1 bg-white p-2">
			<View className="flex-row items-start gap-2">
				<Heading>Read your favorite Book</Heading>
			</View>

			<View className="my-2.5">
				<Box className="pb-8 px-4 md:px-0">
					<ScrollViewTabs
						tabs={tabs}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
					{/* <TabPanelData activeTab={activeTab} /> */}
				</Box>

				<Animated.FlatList
					ref={flatListRef}
					data={books}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginVertical: 20,
						paddingHorizontal: (screenWidth - ITEM_WIDTH) / 2
					}}
					renderItem={({ item, index: itemIndex }) => {
						const scale = scrollX.interpolate({
							inputRange: [(itemIndex - 1) * (ITEM_WIDTH + ITEM_SPACING), itemIndex * (ITEM_WIDTH + ITEM_SPACING), (itemIndex + 1) * (ITEM_WIDTH + ITEM_SPACING)],
							outputRange: [0.9, 1.1, 0.9],
							extrapolate: "clamp"
						})

						return (
							<Animated.View
								className="items-center justify-center bg-gray-200 border-2 border-red-500 rounded-2xl"
								style={{
									width: ITEM_WIDTH,
									height: 300,
									marginHorizontal: ITEM_SPACING / 2,
									transform: [{ scale }]
								}}
							>
								<Image
									// onPress={() => router.navigate(`/book/${index}`)}
									source={{ uri: item }}
									resizeMode="cover"
									style={{
										width: ITEM_WIDTH,
										height: 300,
										borderRadius: 20
									}}
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

			<View className="my-2.5">
				<View className="flex-row justify-between">
					<Heading>Audio Books</Heading>
					<Link href="/">
						<LinkText>See all</LinkText>
					</Link>
				</View>

				<View>
					{/* {books.map((row) => (
						<CardHorizontal
							// onPress={() => navigation.navigate("DetailBook" as never)}
							key={row}
							img={row}
						/>
					))} */}
				</View>
			</View>
		</ScrollView>
	)
}
