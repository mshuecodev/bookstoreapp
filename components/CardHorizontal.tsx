import React from "react"
import { VStack } from "@/components/ui/vstack"
import { HStack } from "@/components/ui/hstack"
import { Image } from "@/components/ui/image"
import { Text } from "@/components/ui/text"
import { Pressable } from "@/components/ui/pressable"
import { Icon } from "@/components/ui/icon"
import { Box } from "@/components/ui/box"

interface CardHorizontalProps {
	img: string
	onPress: () => void
}

function CardHorizontal({ img, onPress }: CardHorizontalProps) {
	return (
		<Box className="rounded-md overflow-hidden bg-white shadow-md p-0">
			<Pressable
				onPress={onPress}
				className="w-full"
			>
				<HStack className="space-x-4 p-4">
					<Image
						source={{ uri: img }}
						alt="Book Cover"
						className="w-20 h-30 rounded-md"
					/>
					<VStack className="flex-1 justify-center">
						<HStack className="space-x-1 items-center mb-2">
							{[...Array(4)].map((_, i) => (
								<Icon
									key={i}
									// name="star"
									className="text-yellow-400 text-sm"
								/>
							))}
							<Icon
								// icon="star-o"
								className="text-yellow-400 text-sm"
							/>
						</HStack>
						<Text className="text-md font-bold mb-2">Forget everything that you think you know</Text>
						<HStack className="items-center mt-2">
							<Image
								source={{ uri: "https://example.com/author-image.jpg" }} // Replace with actual author image
								alt="Author"
								className="w-5 h-5 rounded-full mr-2"
							/>
							<Text className="text-sm text-gray-500">A. Roger Ekirch</Text>
						</HStack>
					</VStack>
				</HStack>
			</Pressable>
		</Box>
	)
}

export default CardHorizontal
