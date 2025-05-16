import React from "react"
import { Box, HStack } from "@/components/ui"

export interface HomePageProps {
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
	activeTab: string
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab, activeTab }) => {
	// component code
	return <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}></Box>
}

export default HomePage
