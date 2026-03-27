import { timeAgo } from "../helper/time_ago/TimeAgo";
import React, { useState, useEffect, act, useRef, useCallback } from "react";
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
  const [loadingOsa, setLoadingOsa] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);
  // const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const onEndReachedCalledDuringMomentum = React.useRef(false);

  const {
    products: list,
    categories: tempCategories,
    dashboardMetrics: tempDashboardMetrics,
    osaRequests: tempOsaRequests,
    categoryPagination,
    isLoadingCategories, error
  } = useSelector((state) => state.productAppProduct);


  

  const CARD_CONFIG = {
    activeProducts: {
      title: "Active Products",
      getData: (metrics) => ({
        count: metrics?.activeProducts ?? 0,
        iconName: "check",
        iconColor: "green",
        syncTime: timeAgo( metrics?.lastSyncTime),
      }),
    },

    onShelfYesterday: {
      title: "On Shelf Yesterday",
      getData: (metrics) => ({
        count:
          metrics?.onShelfYesterdayPerc != null
            ? `${metrics.onShelfYesterdayPerc}%`
            : null,

        subTitleColor: "red",

        subCount:
          metrics?.totalOnShelfYesterdayCount != null &&
          metrics?.totalStockYesterdayCount != null
            ? `${NumberConversion(metrics.totalOnShelfYesterdayCount)}/${NumberConversion(metrics.totalStockYesterdayCount)}`
            : null,

        subTitle:
          metrics?.missingOnShelfYesterdayPercent != null
            ? `${metrics.missingOnShelfYesterdayPercent}% missing`
            : null,
      }),
    },
  };

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
      dispatch(get_categories({ page: 1 }));
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
          // setError(true)
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
    if (!dashboardMetrics) return;
    console.log('dashboard matrics', dashboardMetrics);
    

    const data = Object.values(CARD_CONFIG).map((config) => ({
      title: config.title,
      ...config.getData(dashboardMetrics),
    }));

    setCards(data);
    setLoadingCards(false);
  }, [dashboardMetrics]);

  useEffect(() => {
    if (tempOsaRequests) {
      setOsaRequests(tempOsaRequests);
      setLoadingOsa(false);
    }
  }, [tempOsaRequests]);

  useEffect(() => {
    if (tempCategories) {
      setCategories(tempCategories);
      // setLoading(false);
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

  const  renderImages= (item, numberOfImages=3) =>{
    return (
      <>

  {/* CENTER */}
 <View
  style={{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  }}
>
  {/* ✅ First 3 images */}
  { item.images && item?.images?.slice(0, numberOfImages).map((img, index) => (
    <Image
      key={index}
      style={{
        height: 30,
        width: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: appColor.grey.border,
        marginLeft: index === 0 ? 0 : -10, // overlap
      }}
      source={{ uri: img }}
    />
  ))}

  {/* ✅ 4th overlay circle */}
  { item.images && item?.images?.length > numberOfImages && (
    <View
      style={{
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: appColor.text.regular,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -10, // overlap with 3rd
      }}
    >
      <Text style={{ color: "#fff", fontSize: 10 }}>
        +{item.images.length - numberOfImages}
      </Text>
    </View>
  )}
</View> 
      </>
    )
  }
  /* ---------------- RENDER CATEGORY ---------------- */
  const renderCategoryItem = ({ item }) => {
    const percentage =
      item.totalInventory > 0
        ? Math.round((item.totalStock / item.totalInventory) * 100)
        : 0;

    return (
     <TouchableOpacity style={[styles.card, { borderColor: appColor.grey.border }]} onPress={() => handleCategoryPress(item.categoryName)}>
  
  {/* LEFT */}
  <View style={{ flex: 1 }}>
    <Text style={[styles.categoryTitle, { color: appColor.text.dark }]}>
      {item.categoryName}
    </Text>
  </View>

      {
        renderImages(item,3)
      }

  {/* RIGHT */}
  <View style={{ flex: 1, alignItems: "flex-end" }}>
    <Text style={[styles.stockText, { color: appColor.text.light }]}>
      {item.totalOsa}/{item.totalStock}
    </Text>
    <Text style={styles.percentageText}>
      {item.osaPercent}% on shelf
    </Text>
  </View>

</TouchableOpacity>
    );
  };

  const fetchCategories = useCallback(() => {
    if (!categoryPagination?.hasNextPage) return;
    else {
      dispatch(
        get_categories({
          page: categoryPagination.currentPage + 1,
        }),
      );
    }
  }, [categoryPagination]);

  /* ===================== UI ===================== */

  if (!authKey) {
    return (
      <PageBody style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ color: appColor.text.dark }}>Loading session...</Text>
      </PageBody>
    );
  }
  return (
    <PageBody style={[styles.container, { padding: 16 }]}>
      {/* Top Cards */}

      <View style={{ flexDirection: "row", gap: 8 }}>
        {cards.length > 0 &&
          cards.map((item, index) => {
            return (
              <Card
                loading={loadingCards}
                key={index}
                title={item.title}
                count={item.count || 0}
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
        <View>
          {osaRequests && osaRequests.total == 1 ? (
            <OSARequests
              loading={loadingOsa}
              title="New OSA Request"
              request={osaRequests.data[0]}
              subTitle={`${osaRequests.data[0].products} items to be scanned `}
              time={timeAgo(osaRequests.data[0].createdAt)}
              btnText={"Start Scan"}
              navigation={navigation}
            />
          ) : osaRequests.total > 1 ? (
            <OSARequests
              loading={loadingOsa}
              title={`${osaRequests.total} New OSA Requests`}
              time={timeAgo(osaRequests.data[0].createdAt)}
              btnText={"View"}
              navigation={navigation}
              backgroundColor={appColor?.primaryColor?.background}
            />
          ) : null}
        </View>
      </>

      <StatusBar
        backgroundColor={appColor.background}
        barStyle={"light-content"}
      />

      <View style={{ flex: 1 }}>
        { !authKey || isLoadingCategories  ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : error    ? (
             <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <Text style={{ color: appColor.text.regular }}> 
              {error && "something went wrong, contact support" }. 
            </Text>
          </View>
        ): categories.length ===0 && !isLoadingCategories ? (
            <View style={styles.centerContainer}>
        <Text style={{color:appColor.text.regular}}>No categories found</Text>
      </View>
        ) :categories.length > 0 ? (
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 8 }}></View>;
            }}
            renderItem={renderCategoryItem}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum.current) {
                fetchCategories();
                onEndReachedCalledDuringMomentum.current = true;
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum.current = false;
            }}
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
        ) : (
         // boilderplate code.
          <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <Text style={{ color: appColor.text.regular }}> 
              {error && "something went wrong, contact support" }. 
            </Text>
          </View>
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
    flexDirection:"row",
    justifyContent:"center",
    alignItems:'center'
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