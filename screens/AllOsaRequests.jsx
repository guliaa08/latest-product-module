import { timeAgo } from "../helper/time_ago/TimeAgo";
import { PageBody } from "../components/common/Layout";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OSARequests from "./OsaRequests";
import Loader from "../components/common/atoms/Loader";

const AllOsaRequests = () => {
  const [osaRequests, setOsaRequests] = useState([]);

  const { osaRequests: tempOsaRequests } = useSelector(
    (state) => state.productAppProduct,
  );

  useEffect(() => {
    if (tempOsaRequests) {
      setOsaRequests(tempOsaRequests.data);
    }
  }, [tempOsaRequests]);

  const renderOsa = ({ item }) => {
    return (
      <OSARequests
        title="New OSA Request"
        time={timeAgo(item.createdAt)}
        request={item}
        subTitle={`${item.products} items to be Scanned`}
        btnText="Start Scan"
      />
    );
  };

  return (
    <View style={styles.osaContainer}>
      {osaRequests.length > 0 ? (
        <FlatList
          data={osaRequests}
          renderItem={renderOsa}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 8 }}></View>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  osaContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default AllOsaRequests;
