import React, { useContext } from "react"
import { Fab, FabIcon, Box } from "../components/ui"
import { Moon, Sun } from "lucide-react-native"
import { ThemeContext } from "@/context/Theme"

const MobileModeChangeButton = () => {
	const { colorMode, toggleColorMode } = useContext(ThemeContext)
	return (
		<Fab
			onPress={toggleColorMode}
			placement="bottom right"
			style={{ bottom: 60 }}
			// className="md:hidden bottom-4 right-4"
			size="md"
		>
			<FabIcon
				as={colorMode === "light" ? Moon : Sun}
				className="fill-typography-50"
			/>
		</Fab>
	)
}

export default MobileModeChangeButton
