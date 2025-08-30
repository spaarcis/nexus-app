import Canceled from '@/components/shear/Booking/Canceled'
import Completed from '@/components/shear/Booking/Completed'
import Upcoming from '@/components/shear/Booking/Upcoming'
import React, { useState } from 'react'
import { Text, View } from 'react-native'

const Bookings = () => {
    const [currentPage, setCurrentPage] = useState("Upcoming")

    const ActivePage = () => {
        switch (currentPage) {
            case "Upcoming":
                return <Upcoming />
            case "Completed":
                return <Completed />
            case "Canceled":
                return <Canceled />
            default:
                return <Upcoming />
        }
    }

    return (
        <View>
            <Text>{ActivePage()}</Text>
        </View>
    )
}

export default Bookings