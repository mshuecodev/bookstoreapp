import { View, Text } from "react-native"
import React from "react"

interface ProfilePageProps {
	isActive: boolean
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isActive }) => {
	return (
		<View>
			{/* Profile page content */}
			{isActive && <Text>Profile is active</Text>}
		</View>
	)
}

export default ProfilePage
