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
            <Stack.Screen name="search" />
            <Stack.Screen name="channelProfile" />
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="history" />
            <Stack.Screen name="likeds" />
        </Stack>
    )
}

export default _layout