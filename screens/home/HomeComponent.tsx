import React from "react"
import { ScrollView } from "react-native"
import { Box, HStack } from "@/components/ui"
import Header from "./Header"
import MainContent from "./MainContent"

export interface HomePageProps {
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
	activeTab: string
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab, activeTab }) => {
	// component code
	return (
		<>
			<Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>
				<Header />
			</Box>
			{/* mobile */}
			<ScrollView className="h-[1px] md:hidden">
				<Box className={`${activeTab !== "Profile" ? "flex" : "hidden"} md:hidden`}>
					<MainContent
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
				</Box>
			</ScrollView>
		</>
	)
}

export default HomePage
