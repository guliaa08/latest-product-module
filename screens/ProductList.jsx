import { timeAgo } from "../helper/time_ago/TimeAgo";
import { useState, useEffect, act, useRef } from "react";
import { NumberConversion } from "../helper/number_converter/NumberConverter";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Image,
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
import OSARequests from "./OsaRequests";
import { PageBody } from "../components/common/Layout";
import AppHeader from "../components/common/atoms/AppHeader";

const ProductList = ({ navigation }) => {
  const retryCount = useRef(0);
  const retryInterval = useRef(null);
  const { appColor } = useSelector((state) => state?.productAppTheme);
  const authKey = useSelector((state) => state.productAppAuth.authKey || null);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [osaRequests, setOsaRequests] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [viewMode, setViewMode] = useState("categories"); // 👈 NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([
    { title: "Active Products" },
    { title: "On Shelf Yesterday" },
  ]);

  const {
    products: list,
    categories: tempCategories,
    dashboardMetrics: tempDashboardMetrics,
    osaRequests: tempOsaRequests,
  } = useSelector((state) => state.productAppProduct);

  /* ---------------- VERIFY USER ---------------- */
  useEffect(() => {
    dispatch(get_user_verify());
  }, []);

  /* ---------------- GET PRODUCTS ---------------- */
  useEffect(() => {
    if (!authKey) {
      return;
    }

    const fetchData = () => {
      dispatch(get_categories());
      dispatch(get_activeProducts());
      dispatch(get_osaRequests());
    };

    // First call
    fetchData();

    // Start retry loop
    if (!retryInterval.current) {
      retryInterval.current = setInterval(() => {
        retryCount.current += 1;

        if (retryCount.current >= 5) {
          clearInterval(retryInterval.current);
          retryInterval.current = null;
          return;
        }

        fetchData();
      }, 5000);
    }

    return () => {
      if (retryInterval.current) {
        clearInterval(retryInterval.current);
        retryInterval.current = null;
      }
    };
  }, [authKey]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      if (retryInterval.current) {
        clearInterval(retryInterval.current);
        retryInterval.current = null;
      }
    }
  }, [categories]);

  useEffect(() => {
    if (dashboardMetrics) {
      const data = cards.map((card) => {
        if (card.title == "Active Products")
          return {
            title: "Active Products",
            count: dashboardMetrics.activeProducts,
            iconName: "check",
            iconColor: "green",
            syncTime: 3,
          };
        if (card.title == "On Shelf Yesterday") {
          return {
            title: "On Shelf Yesterday",
            count: dashboardMetrics.onShelfYesterdayPerc + "%",
            subTitleColor: "red",
            subCount: `${NumberConversion(
              dashboardMetrics.totalOnShelfYesterdayCount,
            )}/ ${NumberConversion(dashboardMetrics.totalStockYesterdayCount)}`,
            subTitle: `${Math.round(
              dashboardMetrics.missingOnShelfYesterdayPercent,
            )}% missing`,
          };
        }
      });

      setCards(data);
    }
  }, [dashboardMetrics]);

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
    dispatch(get_products({ categoryName, page: 1 }));
    navigation.navigate("ProductsPerCategory", { categoryName });
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
        style={[styles.card, { borderColor: appColor.grey.border }]}
        onPress={() => handleCategoryPress(item.categoryName)}
      >
        <View style={styles.rowBetween}>
          <Text style={[styles.categoryTitle, { color: appColor.text.dark }]}>
            {item.categoryName}
          </Text>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={[styles.stockText, { color: appColor.text.light }]}>
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
          <Text style={styles.percentageOff(appColor)}>
            {item.percentageOff} OFF
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /* ===================== UI ===================== */

  if (!authKey) {
    return (
      <PageBody style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={{color:appColor.text.dark}} >Loading session...</Text>
      </PageBody>
    );
  }
  return (
    <PageBody style={[styles.container, { padding: 16 }]}>
      {/* Top Cards */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {cards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              count={item.count}
              syncTime={item.syncTime}
              iconName={item.iconName}
              iconColor={item.iconColor}
              subTitle={item.subTitle}
              subTitleColor={item.subTitleColor}
              subCount={item.subCount}
            />
          );
        })}
      </View>
      <>


        {osaRequests && osaRequests.total == 1 ? (
          <OSARequests
          title="New OSA Request"
          request={osaRequests.data[0]}
          subTitle={`${osaRequests.data[0].products} items to be scanned `}
          time={timeAgo(osaRequests.data[0].createdAt)}
          btnText={"Start Scan"}
         
          navigation={navigation}
          />
        ) : osaRequests.total > 1 ? (
          <OSARequests
          title={`${osaRequests.total} New OSA Requests`}
          time={timeAgo(osaRequests.data[0].createdAt)}
          btnText={"View"}
          navigation={navigation}
           backgroundColor={appColor?.primaryColor?.background}
          />
        ) : null}

      </>

      <StatusBar
        backgroundColor={appColor.background}
        barStyle={"light-content"}
      />

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
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  marginBottom: 8,
                  backgroundColor: appColor.background,
                }}
              >
                <View
                  style={[
                    styles.tableHeader,
                    {
                      backgroundColor: appColor.background,
                      borderWidth: 1,
                      borderColor: appColor.grey.border,
                    },
                  ]}
                >
                  <Text
                    style={[styles.headerText, { color: appColor.text.dark }]}
                  >
                    Category
                  </Text>
                  <Text
                    style={[styles.headerText, { color: appColor.text.dark }]}
                  >
                    Stock / OSA
                  </Text>
                </View>
              </View>
            }
          />
        )}
      </View>
    </PageBody>
  );
};

export default ProductList;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    // backgroundColor: 'black',
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
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
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

  percentageText: {
    fontSize: 12,
    color: "#169E48",
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
  percentageOff: (appColor) => [
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

    fontWeight: "500",
  },
});
