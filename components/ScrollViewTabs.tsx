import React from "react"
import { ScrollView } from "react-native"
import { Box, HStack, Pressable, Text } from "@/components/ui"

const ScrollViewTabs = ({ tabs, activeTab, setActiveTab }: any) => {
	return (
		<Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
			<Box className="py-5">
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					<HStack
						space="lg"
						className="mx-0.5 xl:gap-5 2xl:gap-6"
					>
						{tabs.map((tab: any) => {
							return (
								<Pressable
									key={tab.title}
									className={`my-0.5 py-1 ${activeTab === tab ? "border-b-[3px]" : "border-b-0"} border-outline-900 hover:border-b-[3px] ${activeTab === tab ? "hover:border-outline-900" : "hover:border-outline-200"} `}
									onPress={() => setActiveTab(tab)}
								>
									<Text
										size="sm"
										className={`${activeTab === tab ? "text-typography-900" : "text-typography-600"} font-medium`}
									>
										{tab.title}
									</Text>
								</Pressable>
							)
						})}
					</HStack>
				</ScrollView>
			</Box>
		</Box>
	)
}

export { ScrollViewTabs }
