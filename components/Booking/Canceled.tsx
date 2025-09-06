import data from "@/lib/bookingCard.json"
import React from 'react'
import { FlatList, View } from 'react-native'
import BookingCard from './BookingCard'

const Canceled = () => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BookingCard data={item} status="Canceled"/>
                )}
            />
        </View>
    )
}

export default Canceled