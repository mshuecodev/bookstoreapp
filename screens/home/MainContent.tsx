import React from "react"
import { Box, HStack, Heading, Link, LinkText } from "@/components/ui"
// import HomestayInformationFold from "./HomestayInformationFold"
// import MainContentHeader from "./MainContentHeader"
import BestSellerFold from "./BestSellerFold"

const MainContent = ({ modalVisible, setModalVisible, setActiveTab, activeTab }: any) => {
	return (
		<Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
			{/* best selling sections */}
			<Box className="pt-6 pb-2.5 px-4 md:px-0">
				<HStack className="w-full items-center justify-between">
					<Heading size="xl">Best Selling Books</Heading>
					<Link href="#">
						<LinkText>More</LinkText>
					</Link>
				</HStack>
			</Box>

			
			<BestSellerFold />
			{/* explore page homestay info fold 2 */}
			{/* <HomestayInformationFold /> */}
		</Box>
	)
}
export default MainContent
