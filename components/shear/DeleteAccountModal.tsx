import { IconButtonBG } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useDelete_profileMutation } from "@/redux/apiSlices/authApiSlices";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: (password: string) => void;
  onForgotPassword: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  visible,
  onClose,
}) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [delete_profile] = useDelete_profileMutation();

  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("password", password);
      const res = await delete_profile(formData as any).unwrap();
      onClose();
      router.push("/(auth)/Login");
      router.push({
        pathname: "/Toaster",
        params: { res: res.message },
      });
    } catch (error: any) {
      router.push({
        pathname: "/Toaster",
        params: { res: error.message },
      });
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
        <View
          style={tw`bg-black rounded-2xl p-6 w-full max-w-sm border border-gray-700`}
        >
          {/* Header */}
          <View style={tw`items-center mb-6`}>
            <View
              style={tw`w-12 h-12 bg-red-500/20 rounded-full items-center justify-center mb-3`}
            >
              <Text style={tw`text-red-500 text-2xl`}>⚠️</Text>
            </View>
            <Text style={tw`text-white text-xl font-poppinsBold text-center`}>
              Delete Account?
            </Text>
            <Text
              style={tw`text-gray-400 text-sm text-center font-poppins mt-2`}
            >
              This action cannot be undone. All your data will be permanently
              deleted.
            </Text>
          </View>

          {/* Password Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-white text-sm font-poppins font-medium mb-2`}>
              Enter your password to confirm
            </Text>
            <TextInput
              style={tw`bg-[#151515] border border-gray-600 rounded-lg px-4 py-3 text-white`}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoFocus
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => router.push("/ForgetPassword")}
            style={tw`mb-6`}
          >
            <Text style={tw`text-blue-400 text-sm text-center`}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={tw`flex-row gap-5`}>
            <TouchableOpacity
              onPress={handleClose}
              style={tw`flex-1 bg-[#151515] rounded-full py-3 items-center`}
              disabled={isLoading}
            >
              <Text style={tw`text-white font-medium`}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={tw`flex-1 items-center relative ${
                isLoading ? "opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              <SvgXml xml={IconButtonBG} />
              <Text style={tw`text-white absolute top-2 font-medium`}>
                {isLoading ? "Deleting..." : "Delete"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
