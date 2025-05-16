import React, { useContext } from "react"
import { Box, HStack, Input, InputField, InputIcon, InputSlot, SearchIcon } from "@/components/ui"
// import HeaderTabs from "./header/HeaderTabs";
// import HomestayLogo from "./header/HomestayLogo";
// import ToggleMode from "./header/ToggleMode";
// import UserProfile from "./header/UserProfile";
import { ThemeContext } from "@/context/Theme"

const Header = React.memo(() => {
	const { colorMode } = useContext(ThemeContext)
	return (
		<>
			{/* small screen */}
			<Box
				className="p-10 md:hidden w-full"
				style={{ padding: 10 }}
			>
				<Input
					variant="rounded"
					size="sm"
					className="w-full h-10"
				>
					<InputField placeholder="Search..." />
					<InputSlot
						className="bg-primary-500 rounded-full h-6 w-6 m-1.5"
						style={{ margin: 1.5 }}
					>
						<InputIcon
							as={SearchIcon}
							color={colorMode === "light" ? "#FEFEFF" : "#171717"}
						/>
					</InputSlot>
				</Input>
			</Box>
		</>
	)
})
export default Header
