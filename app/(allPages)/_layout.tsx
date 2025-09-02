import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='filter' />
            <Stack.Screen name='afterFilterPage' />
            <Stack.Screen name='seatPosotion' />
        </Stack>
    )
}

export default _layout