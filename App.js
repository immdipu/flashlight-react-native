import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function App() {
  const [flashOn, setFlashOn] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleToggel = async () => {
    if (hasPermission) {
      setFlashOn(!flashOn);
      setFlashOn(
        flashOn === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.torch
          : Camera.Constants.FlashMode.off
      );
    }
  };
  return (
    <View className="bg-black flex border  items-center justify-center  w-full h-full">
      <View className="w-fit border  flex flex-col items-center gap-2 relative ">
        <View
          className={clsx(
            "w-52  border-[80px] border-transparent border-t-neutral-500  -top-[71px] -right-[54px] absolute  ",
            flashOn === Camera.Constants.FlashMode.off
              ? "border-t-transparent"
              : "border-t-neutral-500"
          )}
        ></View>
        <MaterialCommunityIcons
          name={
            flashOn === Camera.Constants.FlashMode.off
              ? "flashlight-off"
              : "flashlight"
          }
          size={100}
          color="white"
        />
        <View className="border border-red-500  w-0"></View>
        <View className="mt-3">
          <Button
            title={
              flashOn === Camera.Constants.FlashMode.off
                ? "Turn on"
                : "Turn off"
            }
            onPress={handleToggel}
          />
        </View>
        <Camera className="w-2 h-1 opacity-0" flashMode={flashOn} />
      </View>
      <View className="absolute bottom-0">
        <Text className="text-neutral-600 ">Made by Dipu</Text>
      </View>
    </View>
  );
}
