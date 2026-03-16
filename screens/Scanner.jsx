import Icon from "react-native-vector-icons/MaterialIcons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Button, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabRouter, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AddQuantityModal from "./osa/AddQuantityModal";
import AddQuantity from "../components/common/molecules/AddQuantity";
import { addScannedItem } from "../redux/osa/reducers";
import BottomSheet from "../components/common/atoms/BottomSheet";

export default function Scanner({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const [scanned, setScanned] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const insets = useSafeAreaInsets();
  const [eanCode, setEancode] = useState();
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const dispatch = useDispatch();
  const scanLock = useRef(false);

  // user validation
  const { isLoadingUser, isValidUser } = useSelector(
    (state) => state.productAppUser,
  );

  const {
    osa: tempOsa,
    pending: tempPending,
    scanned: tempScanned,
    scannedDisplay,
  } = useSelector((state) => state.productAppOsa);

  useEffect(() => {
    if (!isLoadingUser && isValidUser) {
    }
  }, [isLoadingUser, isValidUser]);

  useEffect(() => {
    if (!hasPermission && !permissionRequested) {
      requestPermission();
      setPermissionRequested(true);
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Camera permission is required</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const SCAN_AREA_SIZE = 200;

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "code-128"],
    onCodeScanned: (codes, frame) => {
      if (scanLock.current) return;

      if (scanned) return;

      if (codes.length > 0) {
        const code = codes[0];

        if (!code.frame) return;

        const centerX = frame.width / 2;
        const centerY = frame.height / 2;

        const scanLeft = centerX - SCAN_AREA_SIZE / 2;
        const scanRight = centerX + SCAN_AREA_SIZE / 2;
        const scanTop = centerY - SCAN_AREA_SIZE / 2;
        const scanBottom = centerY + SCAN_AREA_SIZE / 2;

        const codeX = code.frame.x + code.frame.width / 2;
        const codeY = code.frame.y + code.frame.height / 2;

        const insideScanArea =
          codeX > scanLeft &&
          codeX < scanRight &&
          codeY > scanTop &&
          codeY < scanBottom;

        if (!insideScanArea) return;

        const value = code.value;
        // if (value == item.value) {
        if (value == item.eanCode) {
          scanLock.current = true;
          setScanned(true);
          setOpen(true);
        } else {
          scanLock.current = true;

          setAlertMessage(true);
        }
        setTimeout(() => {
          scanLock.current = false;
        }, 1500); // allow scanning again after 1.5s
      }
    },
  });
  if (device == null) {
    return (
      <View style={styles.center}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  const onSave = async (item, quantity) => {
    dispatch(
      addScannedItem({
        productId: item.productId,
        quantity,
        item,
      }),
    );

    setScanned(false);
    navigation.goBack();

    return;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />

        <View style={styles.overlay}>
          <View style={styles.top} />

          <View style={styles.middle}>
            <View style={styles.side} />

            <View style={styles.scanArea}>
              <View style={styles.scanBox}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.scanning}>Scanning</Text>
                <Text style={styles.text1}>Point the camera over</Text>
                <Text style={styles.text1}>the product barcode</Text>
              </View>
            </View>

            <View style={styles.side} />
          </View>

          <View style={styles.bottom} />
        </View>
      </View>
      {/* <View style={{ flex: 1, backgroundColor: 'black' }}> */}
      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          width: "100%",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon style={styles.buttons} name={"close"} size={20} color="white" />
        </Pressable>
        <Text style={styles.airaLens}>Aira Lens</Text>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Icon
            style={styles.buttons}
            name={"info-outline"}
            size={20}
            color="white"
          />
          <Icon
            style={styles.buttons}
            name={"more-vert"}
            size={20}
            color="white"
          />
        </View>
      </View>

      <AddQuantity
        visible={open}
        onClose={() => setOpen(false)}
        height={308}
        item={item}
        quantity={quantity}
        setQuantity={setQuantity}
        onSave={() => {
          onSave(item, quantity);
        }}
      />
      <BottomSheet
        visible={alertMessage}
        onClose={() => {
          setAlertMessage(false);
        }}
        height={80}
      >
        <View style={{ padding: 12, marginBottom: insets.bottom }}>
          <Text style={{ textAlign: "center", fontWeight: "600" }}>
            Product is not matching.
          </Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(1,1,1,1)",
  },
  scannerWindow: {
    flex: 1,

    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scanning: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: "white",
  },
  text1: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    color: "white",
  },
  airaLens: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 20,
    color: "white",
  },
  buttons: {
    // padding:18,
  },

  overlay: {
    flex: 1,
  },

  top: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  bottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  middle: {
    flexDirection: "row",

    height: 300,
  },

  side: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  scanBox: {
    width: 300,
    height: 300,
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "white",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 8,
    borderTopWidth: 8,
    borderTopLeftRadius: 10,
  },

  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderTopRightRadius: 10,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderBottomLeftRadius: 10,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderBottomRightRadius: 10,
  },
  scanArea: {
    alignItems: "center",
  },
  textContainer: {
    marginTop: 16,
    zIndex: 100,
    alignItems: "center",
  },
});
