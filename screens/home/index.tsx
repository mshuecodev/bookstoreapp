import React, { useEffect } from "react"
import { Platform } from "react-native"
import { Box, SafeAreaView } from "@/components/ui"
import { Plus, Home, User, BookOpen, ShoppingCart } from "lucide-react-native"
import MobileModeChangeButton from "@/components/MobileModelChangeButton"
import MobileBottomTabs from "@/components/MobileBottomTabs"
import ProfilePage from "../profile"
import CartScreen from "../cart"
import CategoryScreen from "../category"

const bottomTabs = [
	{
		icon: Home,
		label: "Home"
	},
	{
		icon: BookOpen,
		label: "Category"
	},
	{
		icon: ShoppingCart,
		label: "Cart"
	},
	// {
	// 	icon: MessageCircle,
	// 	label: "Inbox",
	// 	disabled: true
	// },
	{
		icon: User,
		label: "Profile"
	}
]

const HomeStayPage = () => {
	const [activeTab, setActiveTab] = React.useState("Home")

	useEffect(() => {
		if (Platform.OS === "web") {
			document.body.style.overflow = "hidden"
			document.body.style.height = "100%"
		}
	}, [])

	return (
		<Box className="flex-1 overflow-hidden">
			<Box className="flex-1">
				<ProfilePage isActive={activeTab === "Profile"} />
				<CartScreen isActive={activeTab === "Cart"} />
				<CategoryScreen isActive={activeTab === "Category"} />

				{/* <Explorepage
					setActiveTab={setActiveTab}
					activeTab={activeTab}
				/> */}

				<MobileModeChangeButton />
			</Box>

			{/* mobile bottom tabs */}
			<Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
				<MobileBottomTabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					bottomTabs={bottomTabs}
				/>
			</Box>
		</Box>
	)
}

export default HomeStayPage
