import { timeAgo, TimeAgo } from "../helper/time_ago/TimeAgo";
import React, { useState, useEffect, act } from "react";
import { NumberConversion } from "../helper/number_converter/NumberConverter";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  BackHandler,
  Image,
  Pressable,
} from "react-native";
import {
  get_activeProducts,
  get_categories,
  get_products,
} from "../redux/product/action";
import { useDispatch, useSelector } from "react-redux";
import { get_user_verify } from "../redux/productUser/actions";
import { get_osaRequests } from "../redux/product/action";
import Card from "../components/common/organisms/Card";
import { changeTheme } from "../redux/theme/themeReducer";
import OSARequests from "./OsaRequests";
import { setAuthKey } from "../redux/auth/reducer";

const ProductList = ({ navigation, authKey, isDarkMode }) => {
  const appColor =
    useSelector((state) => state?.productAppTheme?.appColor) || {};
  const productsss = useSelector(
    (state) =>
      state.productAppProduct || {
        name: "nhi aya",
      },
  );
  console.log("productsss", productsss);
  const dispatch = useDispatch();

  const gap = 8;
  const padding = 16;
  const screenWidth = Dimensions.get("window").width - (gap + padding * 2);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [osaRequests, setOsaRequests] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [viewMode, setViewMode] = useState("categories"); // 👈 NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productState = useSelector((state) => state?.productAppProduct || {});

  const {
    products: list,
    categories: tempCategories,
    dashboardMetrics: tempDashboardMetrics,
    osaRequests: tempOsaRequests,
  } = productState;

  // const {
  //   products: list,
  //   categories: tempCategories,
  //   dashboardMetrics: tempDashboardMetrics,
  //   osaRequests: tempOsaRequests,
  // } = useSelector((state) => state.productAppProduct);

  // const { categories } = useSelector(state => state.categories);
  const user = useSelector((state) => state.productAppUser || {});
  console.log({ user });
  const { isLoadingUser, isValidUser } = user;

  /* ---------------- VERIFY USER ---------------- */
  useEffect(() => {
    dispatch(get_user_verify());
  }, []);

  /* ---------------- GET PRODUCTS ---------------- */
  useEffect(() => {
    if (!isLoadingUser && isValidUser) {
      // dispatch(get_products());
      dispatch(get_categories());
      dispatch(get_activeProducts());
      dispatch(get_osaRequests());
    }
  }, [isLoadingUser, isValidUser]);

  useEffect(() => {
    if (authKey) {
      dispatch(setAuthKey(authKey));
    }
  }, [authKey]);

  useEffect(() => {
    dispatch(changeTheme(isDarkMode ? "dark" : "light"));
  }, [isDarkMode]);

  /* ---------------- PROCESS DATA ---------------- */

  // useEffect(() => {
  //   if (list) {
  //     const data = list.map(item => ({
  //       ...item,
  //       productImage:
  //         'https://img.freepik.com/premium-photo/top-view-white-sliced-toast-bread-white_711700-14041.jpg',
  //     }));

  //     // setProducts(data);
  //     // setFilteredProducts(data);
  //     setLoading(false);
  //   }
  // }, [list]);
  useEffect(() => {
    if (tempOsaRequests) {
      setOsaRequests(tempOsaRequests);
    }
  }, [tempOsaRequests]);

  useEffect(() => {
    if (tempCategories) {
      setCategories(tempCategories);
      setLoading(false);
    }
  }, [tempCategories]);
  useEffect(() => {
    if (tempDashboardMetrics) {
      setDashboardMetrics(tempDashboardMetrics);
    }
  }, [tempDashboardMetrics]);

  /* ---------------- CATEGORY CLICK ---------------- */
  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);

    dispatch(get_products(categoryName));

    navigation.navigate("ProductsPerCategory", { categoryName });

    // const filtered = products.filter(
    //   item => item.categoryName === categoryName
    // );

    // setFilteredProducts(filtered);
    // setViewMode("products");
  };

  /* ---------------- BACK HANDLER ---------------- */
  const handleBack = () => {
    setViewMode("categories");
    setSelectedCategory(null);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (viewMode === "products") {
          handleBack();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [viewMode]);

  /* ---------------- RENDER CATEGORY ---------------- */
  const renderCategoryItem = ({ item }) => {
    const percentage =
      item.totalInventory > 0
        ? Math.round((item.totalStock / item.totalInventory) * 100)
        : 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCategoryPress(item.categoryName)}
      >
        <View style={styles.rowBetween}>
          <Text style={styles.categoryTitle}>{item.categoryName}</Text>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.stockText}>
              {item.totalOsa}/{item.totalStock}
            </Text>
            <Text style={styles.percentageText}>
              {item.osaPercent}% on shelf
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* ---------------- RENDER PRODUCT ---------------- */
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
          <Text style={styles.percentageOff(color)}>
            {item.percentageOff} OFF
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /* ===================== UI ===================== */

  return (
    <SafeAreaView style={[styles.container, { padding: padding }]}>
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

      <StatusBar barStyle="dark-content" />

      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.categoryName}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 8 }}></View>;
            }}
            renderItem={renderCategoryItem}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Category</Text>
                <Text style={styles.headerText}>Stock / OSA</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductList;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  headerText: {
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    // margin: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  productTitle: {
    fontSize: 14,
  },
  stockText: {
    fontSize: 14,
  },
  percentageText: {
    fontSize: 12,
    color: "#169E48",
  },
  backBtn: {
    padding: 15,
    backgroundColor: "#fff",
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#2D64B8",
    margin: 10,
    height: 68,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 10,
  },
  productCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",

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
  percentageOff: (color) => [
    {
      fontSize: 10,
      color: "#169E48",
    },
  ],
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
