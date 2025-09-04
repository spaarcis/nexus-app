import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='filter' />
            <Stack.Screen name='afterFilterPage' />
            <Stack.Screen name='seatPosotion' />
            <Stack.Screen name='notifications' />
            <Stack.Screen name='popularZone' />
            <Stack.Screen name='newlyAdd' />
            <Stack.Screen name='favoriteZone' />
            <Stack.Screen name='terms_conditions' />
            <Stack.Screen name='privacy_policy' />
        </Stack>
    )
}

export default _layout