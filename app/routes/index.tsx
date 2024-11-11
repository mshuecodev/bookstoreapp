import React, { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProtectedNav from "./homestack"
import PublicNav from "./public"

const Stack = createNativeStackNavigator()

function Index() {
	const [userToken, setUserToken] = useState("test")
	return <NavigationContainer independent={true}>{userToken ? <ProtectedNav /> : <PublicNav />}</NavigationContainer>
}

export default Index
