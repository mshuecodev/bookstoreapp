import React from "react"
import { Box, HStack } from "@/components/ui"
import Header from "./Header"

export interface HomePageProps {
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
	activeTab: string
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab, activeTab }) => {
	// component code
	return (
		<Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>
			<Header />
		</Box>
	)
}

export default HomePage
