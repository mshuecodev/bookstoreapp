import React, { useRef, useState, useContext } from "react"
import { Box, HStack, Center, Image, Icon, Pressable } from "../../components/ui"
import { ScrollView } from "react-native"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { ThemeContext } from "@/context/Theme"

const data = [
	{
		src: "https://books.google.co.id/books/publisher/content?id=6-pmDwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0FgxBhniP_jeug6Jwn3lfBaLd0tQ&w=1280"
	},
	{
		src: "https://books.google.co.id/books/publisher/content?id=6-pmDwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0FgxBhniP_jeug6Jwn3lfBaLd0tQ&w=1280"
	},
	{
		src: "https://books.google.co.id/books/publisher/content?id=6-pmDwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0FgxBhniP_jeug6Jwn3lfBaLd0tQ&w=1280"
	}
]

const NewThisWeekFold = () => {
	const scrollViewRef = useRef(null)
	const scrollAmount = 400
	const [scrollPosition, setScrollPosition] = useState(0)
	const [isContentAtRight, setIsContentAtRight] = useState(true)

	const handleScrollLeft = () => {
		const newScrollPosition = scrollPosition - scrollAmount
		if (scrollViewRef.current) {
			// @ts-ignore
			scrollViewRef?.current?.scrollTo({
				x: newScrollPosition,
				animated: true
			})
			setScrollPosition(newScrollPosition)
		}
	}

	const handleScrollRight = () => {
		const newScrollPosition = scrollPosition + scrollAmount
		if (scrollViewRef.current)
			// @ts-ignore
			scrollViewRef?.current?.scrollTo({
				x: newScrollPosition,
				animated: true
			})
		setScrollPosition(newScrollPosition)
	}

	const checkContentAtLeft = () => {
		if (scrollPosition > 0) {
			return true
		}
		return false
	}

	const isCloseToRight = (event: any) => {
		const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
		const isScrollAtEnd = contentOffset.x + layoutMeasurement.width >= contentSize.width
		if (isScrollAtEnd) {
			return true
		}
		return false
	}

	return (
		<Box className="w-full">
			<ScrollView
				horizontal
				style={{ width: "100%" }}
				showsHorizontalScrollIndicator={false}
				ref={scrollViewRef}
				scrollEventThrottle={50}
				onScroll={(event) => {
					if (isCloseToRight(event)) {
						setIsContentAtRight(false)
					} else {
						setIsContentAtRight(true)
					}
					setScrollPosition(event.nativeEvent.contentOffset.x)
				}}
			>
				<HStack
					space="md"
					className="w-full px-4 md:px-0"
				>
					{data.map((image, index) => {
						return (
							<Box
								key={index}
								className="flex-1"
							>
								<Image
									size="2xl"
									source={image.src}
									alt={"place" + index}
									// @ts-ignore
									className="rounded-lg"
									resizeMode="contain"
								/>
							</Box>
						)
					})}
				</HStack>
			</ScrollView>
			<ScrollLeft
				handleScrollLeft={handleScrollLeft}
				disabled={!checkContentAtLeft()}
			/>
			<ScrollRight
				handleScrollRight={handleScrollRight}
				disabled={!isContentAtRight}
			/>
		</Box>
	)
}

const ScrollLeft = ({ handleScrollLeft, disabled }: any) => {
	const { colorMode } = useContext(ThemeContext)
	return (
		<Center className="absolute left-0 h-full hidden md:flex">
			<Pressable
				className={`p-1 ml-3 rounded-full border-outline-300 border bg-background-50 md:-ml-[16px] hover:bg-background-100 ${disabled ? "data-[disabled=true]:opacity-0" : "data-[disabled=true]:opacity-100"}`}
				disabled={disabled}
				onPress={handleScrollLeft}
			>
				<Icon
					as={ChevronLeft}
					size="lg"
					color={colorMode === "light" ? "#535252" : "#DCDBDB"}
				/>
			</Pressable>
		</Center>
	)
}

const ScrollRight = ({ handleScrollRight, disabled }: any) => {
	const { colorMode } = useContext(ThemeContext)
	return (
		<Center className="absolute right-0 h-full hidden md:flex">
			<Pressable
				className={`p-1 ml-3 rounded-full border-outline-300 border bg-background-50 md:-mr-4 hover:bg-background-100 ${disabled ? "data-[disabled=true]:opacity-0" : "data-[disabled=true]:opacity-100"}`}
				onPress={handleScrollRight}
				disabled={disabled}
			>
				<Icon
					as={ChevronRight}
					size="lg"
					color={colorMode === "light" ? "#535252" : "#DCDBDB"}
				/>
			</Pressable>
		</Center>
	)
}

export default NewThisWeekFold
