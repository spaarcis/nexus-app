import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

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
        </Stack>
    )
}

export default _layout  