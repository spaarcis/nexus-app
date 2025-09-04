import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" />
            <Stack.Screen name="Createnewpassword" />
            <Stack.Screen name="ForgetPassword" />
            <Stack.Screen name="Register" />
            <Stack.Screen name="VerifyOTP" />
            <Stack.Screen name="ChangePassword" />
        </Stack>
    )
}

export default _layout  