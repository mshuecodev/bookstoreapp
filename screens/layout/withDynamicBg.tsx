import React from "react"
import { useContext } from "react"
import { ThemeContext } from "@/context/Theme"
import { Box } from "@/components/ui"

const withDynamicBackground = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const { colorMode } = useContext(ThemeContext)

		return (
			<Box
				className="flex-1"
				style={{
					backgroundColor: colorMode === "light" ? "#FFFFFF" : "#171717"
				}}
			>
				<WrappedComponent {...props} />
			</Box>
		)
	}
}

export default withDynamicBackground
