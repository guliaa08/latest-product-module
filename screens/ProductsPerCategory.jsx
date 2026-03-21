import { timeAgo } from "../helper/time_ago/TimeAgo";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/common/organisms/Card";
import { NumberConversion } from "../helper/number_converter/NumberConverter";
import OSARequests from "./OsaRequests";

export default function ProductsPerCategory({ route, navigation }) {
  const gap = 8;
  const padding = 16;
  const screenWidth = Dimensions.get("window").width - (gap + padding * 2);
  const [dashboardMetrics, setDashboardMetrics] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const { isLoadingUser, isValidUser } = useSelector(
    (state) => state.productAppUser,
  );
  const [osaRequests, setOsaRequests] = useState({});

  const {
    products: list,
    categories: tempCategories,
    dashboardMetrics: tempDashboardMetrics,
    osaRequests: tempOsaRequests,
  } = useSelector((state) => state.productAppProduct);

  const dispatch = useDispatch();
  /* ---------------- VERIFY USER ---------------- */
  // useEffect(() => {
  //     dispatch(get_user_verify());
  // }, []);

  /* ---------------- GET PRODUCTS ---------------- */
  useEffect(() => {
    if (!isLoadingUser && isValidUser) {
      // dispatch(get_products());
      // dispatch(get_products(route.params.categoryName,))
      //   dispatch(get_categories());
      // dispatch(get_activeProducts());
    }
  }, [isLoadingUser, isValidUser]);

  useEffect(() => {
    if (tempDashboardMetrics) {
      setDashboardMetrics(tempDashboardMetrics);
    }
  }, [tempDashboardMetrics]);
  useEffect(() => {
    if (tempOsaRequests) {
      setOsaRequests({ ...tempOsaRequests, total: 2 });
      setOsaRequests(tempOsaRequests);
    }
  }, [tempOsaRequests]);

  useEffect(() => {
    if (list) {
      const data = list.map((item) => ({
        ...item,
        productImage:
          "https://img.freepik.com/premium-photo/top-view-white-sliced-toast-bread-white_711700-14041.jpg",
      }));

      setProducts(data);
      setLoading(false);
    }
  }, [list]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image
        source={{ uri: item.productImage }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.productName}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.productWeight}>{item.productWeight}</Text>
          <Text>.</Text>
          <Text style={styles.productCategory}>{item.categoryName}</Text>
        </View>
        <Text style={{}}>SKU: {item.sku}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.productPrice}>
            {" "}
            ₹{parseFloat(item.price).toFixed(2)}{" "}
          </Text>
          <Text style={styles.productPriceStike}>
            {" "}
            ₹{parseFloat(item.price).toFixed(2) + 5}{" "}
          </Text>
          <Text style={styles.percentageOff}>{item.percentageOff} OFF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Top Cards */}
        <View style={{ flexDirection: "row", gap: gap }}>
          <View style={{ width: screenWidth / 2, height: 98 }}>
            {dashboardMetrics && (
              <Card
                iconName={"check"}
                iconColor={"green"}
                title="Active Products"
                syncTime={4}
                count={dashboardMetrics.activeProducts}
              />
            )}
          </View>
          <View style={{ width: screenWidth / 2, height: 98 }}>
            {dashboardMetrics && (
              <Card
                title="On Shelf Yesterday"
                subTitle={`${Math.round(
                  dashboardMetrics.missingOnShelfYesterdayPercent,
                )}% missing`}
                subTitleColor={"red"}
                count={`${Math.round(dashboardMetrics.onShelfYesterdayPerc)}%`}
                subCount={`${NumberConversion(
                  dashboardMetrics.totalOnShelfYesterdayCount,
                )}/ ${NumberConversion(
                  dashboardMetrics.totalStockYesterdayCount,
                )}`}
              />
            )}
          </View>
        </View>

        <View style={{}}>
          {osaRequests && osaRequests.total == 1 ? (
            <OSARequests
              title="New OSA Request"
              subTitle={`${osaRequests.data[0].products} items to be scanned `}
              time={timeAgo(osaRequests.data[0].createdAt)}
              btnText={"Start Scan"}
            />
          ) : osaRequests.total > 1 ? (
            <OSARequests
              title={`${osaRequests.total} New OSA Requests`}
              time={timeAgo(osaRequests.data[0].createdAt)}
              btnText={"View"}
            />
          ) : (
            <View></View>
          )}
        </View>
        <View style={{ gap: 8, flex: 1 }}>
          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <View
                style={{
                  alignItems: "flex-end",
                  paddingRight: 12,
                  paddingBottom: 0,
                }}
              >
                <Text style={{ color: "#454545" }}>
                  {products && `${products.length} products`}
                </Text>
              </View>

              <FlatList
                data={products}
                style={{ flex: 1 }}
                keyExtractor={(item) => item.storeInventoryId?.toString()}
                renderItem={renderProductItem}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 8 }}></View>
                )}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    gap: 12,
  },
  productCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",

    borderRadius: 12,
    // overflow: 'hidden',

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 124,
    padding: 12,
    borderWidth: 1,
    gap: 12,
    borderRadius: 8,
    borderColor: "#F1F1F1",
  },
  productImage: {
    width: 56,
    height: 56,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  productInfo: {
    padding: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#454545",
    lineHeight: 16,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 10,
    lineHeight: 12,

    color: "#999",
    marginBottom: 8,
  },
  bottomRow: {
    paddingTop: 4,
    height: 20,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productPrice: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,

    // fontWeight: 'bold',
    // color: '#2196F3',
  },
  productPriceStike: {
    fontSize: 10,
  },
  percentageOff: {
    fontSize: 10,
    color: "#169E48",
  },
  productWeight: {
    fontSize: 10,
  },
  productCategory: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 12,
    color: "#454545",
  },
  sku: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 500,
    color: "#808080",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
