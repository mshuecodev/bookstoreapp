import React from "react"
import { Text, Heading, Icon, Button, CloseIcon, ButtonText, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@/components/ui"
import { useAuth } from "@/features/auth/useAuth"

const LogoutAlertDialog = ({ openLogoutAlertDialog, setOpenLogoutAlertDialog }: any) => {
	const { handleLogout } = useAuth()

	const handleClose = () => {
		setOpenLogoutAlertDialog(false)
	}

	const handleLogoutAndClose = () => {
		handleLogout()
		handleClose()
	}

	return (
		<AlertDialog
			isOpen={openLogoutAlertDialog}
			onClose={handleClose}
		>
			<AlertDialogBackdrop />
			<AlertDialogContent className="p-4">
				<AlertDialogHeader>
					<Heading>Logout</Heading>
					<AlertDialogCloseButton>
						<Icon as={CloseIcon} />
					</AlertDialogCloseButton>
				</AlertDialogHeader>
				<AlertDialogBody
					className=""
					contentContainerClassName=""
				>
					<Text className="mb-6">Are you sure, you want to logout?</Text>
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button
						variant="outline"
						action="secondary"
						onPress={handleClose}
					>
						<ButtonText>Cancel</ButtonText>
					</Button>
					<Button
						action="negative"
						onPress={handleLogoutAndClose}
					>
						<ButtonText style={{ color: "fff" }}>Logout</ButtonText>
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default LogoutAlertDialog
