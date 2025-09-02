import { IconClose } from '@/Icons/Icons'
import tw from '@/lib/tailwind'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const ModalView = ({ visible, onClose, title, children }: any) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={tw`flex-1 justify-end bg-black/50`}>
                <View style={tw`bg-primary rounded-t-3xl w-full`}>
                    {/* Header */}
                    <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                        <View></View>
                        <Text style={tw`text-primary text-xl font-poppins`}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <SvgXml xml={IconClose} />
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default ModalView
