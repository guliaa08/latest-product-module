import { timeAgo } from '../helper/time_ago/TimeAgo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/common/molecules/Header';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/organisms/Card';
import { NumberConversion } from '../helper/number_converter/NumberConverter';
import { get_user_verify } from '../redux/user/actions';
import {
  get_activeProducts,
  get_categories,
  get_products,
} from '../redux/product/action';
// import OSARequests from '../components/common/molecules/OsaRequests';
import OSARequests from './OsaRequests';

import { PageBody } from '../components/common/Layout';
import { useNavigation } from '@react-navigation/native';

export default function ProductsPerCategory({ route }) {
  console.log('params', route.params);
  const { categoryName } = route.params;

  const gap = 8;
  const padding = 16;
  const screenWidth = Dimensions.get('window').width - (gap + padding * 2);
  const [dashboardMetrics, setDashboardMetrics] = useState([]);
  const [checked, setChecked] = useState(false);
  const { isLoadingUser, isValidUser } = useSelector(state => state.productAppUser);
  const [osaRequests, setOsaRequests] = useState({});
  const navigation = useNavigation();
  const [cards, setCards] = useState([
    { title: 'Active Products' },
    { title: 'On Shelf Yesterday' },
  ]);

  const isInitialLoading = isLoadingProducts && products.length === 0;
  const isPaginationLoading = isLoadingProducts && products.length > 0;
  const onEndReachedCalledDuringMomentum = React.useRef(true);



  const {
    products: list,
    categories: tempCategories,
    dashboardMetrics: tempDashboardMetrics,
    osaRequests: tempOsaRequests,
    productPagination,
    isLoadingProducts
  } = useSelector(state => state.productAppProduct);

  const {appColor:color} = useSelector(state=>state.productAppTheme)
  const dispatch = useDispatch();

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
      setOsaRequests(tempOsaRequests)
    }
  }, [tempOsaRequests])

  const products = (list || []).map(item => ({
    ...item,
    productImage:
      'https://img.freepik.com/premium-photo/top-view-white-sliced-toast-bread-white_711700-14041.jpg',
  }));


  // useEffect(() => {
  //   if (list) {
  //     const data = list.map(item => ({
  //       ...item,
  //       productImage:
  //         'https://img.freepik.com/premium-photo/top-view-white-sliced-toast-bread-white_711700-14041.jpg',
  //     }));
  //     console.log('list of products', data);

  //     setProducts(data);
  //     setLoading(false);
  //   }
  // }, [list]);

  useEffect(() => {
    if (dashboardMetrics) {
      console.log('tempDashboardMetrics', tempDashboardMetrics);

      const data = cards.map(card => {
        if (card.title == 'Active Products')
          return {
            title: 'Active Products',
            count: dashboardMetrics.activeProducts,
            iconName: 'check',
            iconColor: "green",
            syncTime: 3,
          };
        if (card.title == 'On Shelf Yesterday') {
          return {
            title: 'On Shelf Yesterday',
            count: dashboardMetrics.onShelfYesterdayPerc + "%",
            subTitleColor: "red",
            subCount: `${NumberConversion(
              dashboardMetrics.totalOnShelfYesterdayCount,
            )}/ ${NumberConversion(
              dashboardMetrics.totalStockYesterdayCount,
            )}`,
            subTitle: `${Math.round(
              dashboardMetrics.missingOnShelfYesterdayPercent,
            )}% missing`

          };
        }
      });

      setCards(data)

    }
  }, [dashboardMetrics]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard(color)}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image
        source={{ uri: item.productImage }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName(color)} numberOfLines={2}>
          {item.productName}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.productWeight(color)}>{item.productWeight}</Text>
          <Text>.</Text>
          <Text style={styles.productCategory(color)}>{item.categoryName}</Text>
        </View>
        <Text style={styles.sku(color)}>SKU: {item.sku}</Text>
        <View style={styles.bottomRow(color)}>
          <Text style={styles.productPrice(color)}>
            {' '}
            ₹{parseFloat(item.price).toFixed(2)}{' '}
          </Text>
          <Text style={styles.productPriceStike(color)}>
            {' '}
            ₹{parseFloat(item.price).toFixed(2) + 5}{' '}
          </Text>
          <Text style={styles.percentageOff(color)}>
            {item.percentageOff} OFF
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const fetchProducts = useCallback(() => {
    console.log("projec pagination", productPagination)
    if (  isLoadingProducts ||
  !productPagination ||
  productPagination.currentPage >= productPagination.totalPages ||
  !productPagination.hasNextPage) { console.log("no more pages"); return; }
    if (productPagination?.currentPage >= productPagination?.totalPages) {
      return;
    }
    const { currentPage } = productPagination;
    dispatch(get_products({ categoryName, page: currentPage + 1 }));

  }, [productPagination, isLoadingProducts, categoryName])
  return (
    <>

      <PageBody style={styles.container}>

        {/* Top Cards */}
        <View style={{ flexDirection: 'row', gap: gap }}>

          {cards.map((item, index) => {
            console.log(item.iconColor)
            return <Card title={item.title} count={item.count} syncTime={item.syncTime} iconName={item.iconName} iconColor={item.iconColor} subTitle={item.subTitle} subTitleColor={item.subTitleColor} subCount={item.subCount} />;
          })}

          {/* <View style={{ width: screenWidth / 2,height:98 }}>
            {dashboardMetrics && (
              <Card
                iconName={'check'}
                iconColor={'green'}
                title="Active Products"
                syncTime={4}
                count={dashboardMetrics.activeProducts}
              />
            )}
          </View>
          <View style={{ width: screenWidth / 2,height:98 }}>
            {dashboardMetrics && (
              <Card
                title="On Shelf Yesterday"
                subTitle={`${Math.round(
                  dashboardMetrics.missingOnShelfYesterdayPercent,
                )}% missing`}
                subTitleColor={'red'}
                count={`${Math.round(dashboardMetrics.onShelfYesterdayPerc)}%`}
                subCount={`${NumberConversion(
                  dashboardMetrics.totalOnShelfYesterdayCount,
                )}/ ${NumberConversion(
                  dashboardMetrics.totalStockYesterdayCount,
                )}`}
              />
            )}
          </View> */}
        </View>

        <View style={{}}>


          {osaRequests && osaRequests.total == 1 ?
            <OSARequests

              title="New OSA Request"
              subTitle={`${osaRequests.data[0].products} items to be scanned `}
              time={timeAgo(osaRequests.data[0].createdAt)}
              btnText={"Start Scan"}
            />

            :
            osaRequests.total > 1 ?
              <OSARequests

                title={`${osaRequests.total} New OSA Requests`}
                time={timeAgo(osaRequests.data[0].createdAt)}
                btnText={"View"}
              />
              :
              <View></View>
          }
        </View>
        <View style={{ gap: 8, flex: 1, }}>

          {isInitialLoading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <View
                style={{
                  alignItems: "flex-end", paddingRight: 12, paddingBottom: 0,
                }}
              >

                <Text style={{ color: color.text.regular }}>
                  {products && `${productPagination?.totalCount  ||"0"}  products`}
                </Text>
              </View>

              <FlatList
                data={products} style={{ flex: 1 }}
                // keyExtractor={(item, index) => index.toString()}
                keyExtractor={(item) => item.storeInventoryId?.toString()}
                renderItem={renderProductItem}
                ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
                onEndReached={() => {
                  if (!onEndReachedCalledDuringMomentum.current) {
                    fetchProducts();
                    onEndReachedCalledDuringMomentum.current = true;
                  }
                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum.current = false;
                }}
                ListFooterComponent={
                  isLoadingProducts ? (
                    <View style={{ padding: 16, alignItems: 'center' }}>
                      <Text style={{ color: color.text.regular }}>Loading more items...</Text>
                    </View>
                  ) : null
                }
              />
            </>
          )}
        </View>
      </PageBody>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    gap: 12,

  },
  productCard: (color) => [{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 124,
    padding: 12,
    borderWidth: 1,
    borderColor: color.border,
    gap: 12,
    borderRadius: 8,

  }],
  productImage: {
    width: 56,
    height: 56,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 8,

  },
  productInfo: {
    padding: 12,
    justifyContent: 'space-between',
  },
  productName: (color) => [{
    fontSize: 12,
    fontWeight: '600',
    color: color.text.regular,
    lineHeight: 16,
    marginBottom: 4,
  }],
  productCategory: {
    fontSize: 10,
    lineHeight: 12,

    color: '#999',
    marginBottom: 8,
  },
  bottomRow: (color) => [{
    paddingTop: 4,
    height: 20,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }],
  productPrice: (color) => [{
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,

    // fontWeight: 'bold',

    color: color.text.regular,
  }],
  productPriceStike: (color) => [{
    fontSize: 10,
    color: color.text.light,
    textDecorationLine: 'line-through'
  }],
  percentageOff: color => [
    {
      fontSize: 10,
      color: '#169E48',
    },
  ],
  productWeight: (color) => [{
    fontSize: 10,
    color: color.text.regular
  }],
  productCategory: (color) => [{
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 12,
    color: color.text.regular
  }],
  sku: (color) => [{
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 500,
    color: '#808080',
  }],

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: (color) => [{
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  }],
});