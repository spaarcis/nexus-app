import tw from "@/lib/tailwind";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
        <View
          style={tw`bg-black rounded-2xl p-6 w-full max-w-sm border border-gray-700`}
        >
          {/* Title */}
          <Text
            style={tw`text-white text-xl font-poppinsBold text-center mb-2`}
          >
            Are you sure?
          </Text>

          {/* Subtitle */}
          <Text style={tw`text-gray-400 text-sm text-center font-poppins mb-6`}>
            You want to cancel the booking
          </Text>

          {/* Buttons */}
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              onPress={onConfirm}
              style={tw`flex-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full py-3 mr-3 items-center`}
            >
              <Text style={tw`text-white font-poppinsBold`}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={tw`flex-1 bg-[#151515] rounded-full py-3 items-center`}
            >
              <Text style={tw`text-red-500 font-poppinsBold`}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
