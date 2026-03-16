import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import SearchBox from "../atoms/SearchBox"
import { PageBody } from '../Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Octicons';

export default function Header({setFilterOpen, filter, setSort, request}) {
  return (
    <PageBody>

      <View style={[styles.headerContainer]}>

        <View style={styles.top}>
          <View style={[{ flexDirection: "row", height: 36, gap: 8 }]}>
            <View style={styles.logo}>
              <LinearGradient
                colors={['#DC882A', '#FFC483']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.LinearGradient}
              >
              </LinearGradient>
            </View>
            <View style={[{ height: 36 }]}>

              <Text style={[styles.spencers]}>Spencers</Text>
              <View style={[{ flexDirection: "row", height: 16, }]}>


                <Text style={[{ fontSize: 12, fontWeight: 400, lineHeight: 16, }]}>by AIRAops</Text>
              </View>
            </View>
          </View>
          <View style={[{ flexDirection: "row", gap: 4, height:32 }]}>
            <Pressable onPress={()=>setFilterOpen(true)} style={[styles.filterContainer]}>
              <Text style={[styles.filter]}>Filter</Text>
              <Icon name={"keyboard-arrow-down"} size={16} color="black" />
         { filter != "both" && <Icon1 style={{ position:"absolute", top:0, right:0 }}  name={"dot-fill"} size={16} color="black" /> }

            </Pressable>
            <Pressable onPress={()=>setSort(true)} style={[styles.filterContainer]}>
              <Text style={[styles.filter]}>Sort</Text>
              <Icon name={"sort"} size={16} color="black" />


            </Pressable>
            {/* <View style={[styles.moreVertical]}>
              <Icon name={"more-vert"}
                size={20} color={"black"} />
            </View> */}
          </View>

        </View>
        <View style={styles.bottom}>

          <SearchBox request={request} />
        </View>
      </View>
    </PageBody>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1

  },
  text: {
    color: "blue"
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    height:36,
  },
  headerContainer: {
    height: 120,
    paddingTop: 12,
    gap: 12,

  },
  logo: {
    justifyContent: 'center',
    alignItems: "center"
  },
  spencers: {
    height: 20,
    width: 72,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: "black",

  },
  LinearGradient: {
    height: 32,
    width: 32,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  filter: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    textAlign: "center",
    color: "#454545"

  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 6,
    paddingRight: 8,
    paddingLeft: 10,
    gap: 4
  },
  moreVertical: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:1,
  }
})
