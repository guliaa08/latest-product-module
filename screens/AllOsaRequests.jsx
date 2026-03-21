import { timeAgo } from "../helper/time_ago/TimeAgo";
import { PageBody } from "../components/common/Layout";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OSARequests from "./OsaRequests";
import Loader from "../components/common/atoms/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { get_osaRequests } from "../redux/product/action";
import AppHeader from "../components/common/atoms/AppHeader";
import { NumberConversion } from "../helper/number_converter/NumberConverter";

const AllOsaRequests = ({ navigation }) => {
  const [osaRequests, setOsaRequests] = useState([]);
  const dispatch = useDispatch();
  const { osaRequests: tempOsaRequests } = useSelector(
    (state) => state.productAppProduct,
  );

  useEffect(() => {
    if (tempOsaRequests) {
      setOsaRequests(tempOsaRequests.data);
    }
  }, [tempOsaRequests]);

  useFocusEffect(
    useCallback(() => {
      dispatch(get_osaRequests());
    }, []),
  );

  const renderOsa = ({ item }) => {
    return (
      <OSARequests
        title="New OSA Request"
        time={timeAgo(item.createdAt)}
        request={item}
        subTitle={`${NumberConversion(item.products)} ${item.products == 1 ? "item" : "items"} to be Scanned`}
        btnText="Start Scan"
        navigation={navigation}
      />
    );
  };

  return (
    <PageBody>
      <View style={styles.osaContainer}>
        {osaRequests.length > 0 ? (
          <FlatList
            data={osaRequests}
            renderItem={renderOsa}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 8 }}></View>;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Loader />
        )}
      </View>
    </PageBody>
  );
};

const styles = StyleSheet.create({
  osaContainer: {
    flex: 1,
    padding: 8,
  },
});

export default AllOsaRequests;
