import { Keyboard } from 'react-native';
import SubmitOsa from './osa/SubmitOsa';
import AddQuantityModal from './osa/AddQuantityModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
  Modal,
  BackHandler,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PageBody } from '../components/common/Layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/common/molecules/Header';
import OsaScanProduct from '../components/common/molecules/OsaScanProduct';
import { useDispatch, useSelector } from 'react-redux';
import { get_osaList, post_osaList } from '../redux/osa/action';
import { useNavigation } from '@react-navigation/native';
import {
  addScannedDisplay,
  addScannedItem,
  resetExecution,
} from '../redux/osa/reducers';
import AddQuantity from '../components/common/molecules/AddQuantity';
import FilterBottomSheet from '../components/common/molecules/FilterBottomSheet';
import SortBottomSheet from '../components/common/molecules/SortBottomSheet';
import Loader from '../components/common/atoms/Loader';

export default function ProductsScan({ route }) {
  console.log('item from prop', route.params.request);
  const { request } = route.params;
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filter, setFilter] = useState('both');
  const [products, setProducts] = useState([]);
  const [osaRequests, setOsaRequests] = useState({ data: [] });
  const [selectedItem, setSelectedItem] = useState({});
  const [enterQuantityWarning,setEnterQuantityWarning]= useState(false);
  const [osaScanned, setOsaScanned] = useState({
    data: [],
  });

  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const pendingMomentum = useRef(true);
  const scannedMomentum = useRef(true);

  // user validation
  const { isLoadingUser, isValidUser } = useSelector(state => state.user);

  const {
    osa: tempOsa,
    pending: tempPending,
    scanned: tempScanned,
    scannedDisplay,
    requestId,
    execution,
    isLoadingOsa,
    isLoadingPending,
    isLoadingScanned,
  } = useSelector(state => state.osa);

  useEffect(() => {
    if (!isLoadingUser && isValidUser) {
      dispatch(get_osaList({ request, params: { page: 1 } }));
    }
  }, [isLoadingUser, isValidUser]);

  useEffect(() => {
    if (tempPending) {
      setOsaRequests(tempPending);
      console.log('temporary osa', tempPending);
    }
  }, [tempPending]);

  useEffect(() => {
    if (tempScanned) {
      setOsaScanned(tempScanned);
      // console.log('temporary osa scanned products', tempScanned);
    }
  }, [tempScanned]);

  const scan = item => {
    navigation.navigate('Scanner', { item });
  };

  const addManually = item => {
    // console.log('item form add manually', item);
    setSelectedItem(item);
    setOpen(true);
  };

  const renderItems = item => {
    return (
      <OsaScanProduct
        photo={item.productImage}
        title={item.productName}
        sku={item.sku}
        weight={item.productWeight}
        onAddManually={() => addManually(item)}
        onScan={() => scan(item)}
        itemsOnShelf={item.physicalCount ? item.physicalCount : undefined}
      />
    );
  };

  const submitOSA = async (osaRequests, osaScanned) => {
    // Alert.alert('working on this.');
    console.log('osa request', requestId);
    console.log('osa request', osaScanned);
    const result = await dispatch(
      post_osaList({
        requestId: requestId,
        items: osaScanned.data,
      }),
    ).unwrap();
    console.log('API Success:', result);

    Alert.alert('OSA submitted successfully');

    navigation.goBack();
  };

  const onSave = (item, quantity) => {
    console.log(quantity);
    if (!(quantity >= 0)) {
    setEnterQuantityWarning(true)
      return;
    }
    dispatch(
      addScannedItem({
        productId: item.productId,
        quantity,
        item,
      }),
    );
    Keyboard.dismiss();
    setOpen(false);
    return;
  };

  // const handleBackPress = () => {
  //   Alert.alert('Exit App', 'Do you want to save the OSA state?', [
  //     { text: 'Cancel', onPress: () => null, style: 'cancel' },
  //     { text: 'YES', onPress: () => navigation.goBack() },
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackPress,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const loadMorePending = useCallback(() => {
    const { total, page, limit } = osaRequests;
    const hasMoreItems = page * limit < total;

    if (isLoadingOsa || !hasMoreItems) return;

    dispatch(
      get_osaList({
        request,
        params: { pendingPage: page + 1 },
      }),
    );
  }, [osaRequests, isLoadingOsa]);

  const loadMoreScanned = useCallback(() => {
    const { total, page, limit } = osaScanned;
    const hasMoreItems = page * limit < total;

    if (isLoadingOsa || !hasMoreItems) return;

    dispatch(
      get_osaList({
        request,
        params: { scannedPage: page + 1 },
      }),
    );
  }, [osaScanned, isLoadingOsa]);
  console.log('Isloading pending', isLoadingPending);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ height: 120 }}>
          <Header
            request={request}
            setFilterOpen={setFilterOpen}
            setSort={setSortOpen}
            filter={filter}
          />
        </View>

        <View style={{ gap: 12, flex: 1 }}>
          {(filter == 'both' || filter == 'pending') && (
            <View style={{ flex: 1, padding: 12 }}>
              <Text
                style={{
                  height: 20,
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 20,
                  color: '#454545',
                }}
              >
                Pending items
              </Text>
              {isLoadingPending ? (
                <Loader />
              ) : (
                <FlatList
                  style={[
                    { flex: 1, marginBottom: filter == 'pending' ? 64 : 0 },
                  ]}
                  data={osaRequests.data || []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderItems(item)}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                  onEndReached={() => loadMorePending()}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    isLoadingOsa ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <Text>Loading more items...</Text>
                      </View>
                    ) : null
                  }
                />
              )}
            </View>
          )}

          {(filter == 'both' || filter == 'scanned') && (
            <View style={{ flex: 1, padding: 12 }}>
              <Text
                style={{
                  height: 20,
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 20,
                  color: '#454545',
                }}
              >
                Scanned items
              </Text>
              {isLoadingScanned ? (
                <Loader />
              ) : (
                <FlatList
                  style={[{ flex: 1, marginBottom: 64 }]}
                  data={osaScanned.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    return renderItems(item);
                  }}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                  onEndReached={() => loadMoreScanned()}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    isLoadingOsa ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <Text>Loading more items...</Text>
                      </View>
                    ) : null
                  }
                />
              )}
            </View>
          )}
        </View>

        <View style={styles.SubmitOsa}>
          <SubmitOsa
            submitOSA={() => {
              submitOSA(osaRequests, osaScanned);
            }}
            pending={osaRequests?.data?.length || 0}
            scanned={osaScanned?.data?.length || 0}
          />
        </View>

        <AddQuantity
          visible={open}
          onClose={() =>{ setOpen(false); setEnterQuantityWarning(false)}}
          height={308}
          item={selectedItem}
          quantity={quantity}
          setQuantity={setQuantity}
          onSave={() => {
            onSave(selectedItem, quantity);
          }}
          enterQuantityWarning={enterQuantityWarning}
        />
      </View>

      <FilterBottomSheet
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        height={170}
        setFilter={setFilter}
      />
      <SortBottomSheet
        visible={sortOpen}
        onClose={() => setSortOpen(false)}
        height={170}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  SubmitOsa: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
