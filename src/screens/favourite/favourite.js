import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite } from '../../store/shopping/productSice';
import {Header} from '../../component';

const Favourite = () => {
  const dispatch = useDispatch()
  const favourite = useSelector((state) => state.product.favourite);

  return (
    <>
      <Header
        backArrow={true}
        heading={`Favourite (${favourite.length})`}
      />
      <View style={styles.container}>
        {favourite.length > 0 && <FlatList
          showsVerticalScrollIndicator={false}
          data={favourite}
          keyExtractor={(item) =>Math.random()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.imageSection}>
                <Image
                  source={{ uri: item?.thumbnail }}
                  style={styles.productImage} />
              </View>
              <View style={styles.detailSection}>
                <Text>{item.title}</Text>
                <Text>${item?.price}</Text>
              </View>
              <View style={styles.quantitySection}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addToFavourite(item?.id))
                  }}>
                  <Image source={item?.favourite ? require('.././../assets/images/heart-red.png') : require('.././../assets/images/heart-outline.png')} style={styles.favouriteIcon} />
                </TouchableOpacity>
              </View>

            </View>
          )}
        />}

      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 10
  },
  imageSection: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailSection: {
    width: '45%',
    justifyContent: "center",
    paddingHorizontal: 10
  },
  quantitySection: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  favouriteIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
    paddingHorizontal: 20
  }

});

export default Favourite