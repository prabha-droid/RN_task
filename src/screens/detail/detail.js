import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import navigationService from '../../root/navigationService';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { addProduct } from '../../store/shopping/productSice';
import { useDispatch } from 'react-redux';
import {Header} from '../../component';

const Detail = ({ route }) => {
  const dispatch = useDispatch()
  const productDetail = route.params.productDetail;
  const [itemSelected, setItemSelected] = useState(productDetail?.selectedQuantity ? true : false)

  return (
    <>
      <Header
        backArrow={true}
        rightComponent={true}
        rightOnPress={() => navigationService.navigate('Cart')}
      />
      <View style={styles.container}>
        <Text style={styles.productName}>{productDetail.title}</Text>
        <View style={styles.carouselView}>
          <SwiperFlatList
            showPagination
            data={productDetail.images}
            paginationActiveColor='#F9B023'
            paginationDefaultColor='#E7ECF0'
            paginationStyleItem={styles.carouselPaginationItem}
            paginationStyle={styles.carouselPaginationView}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.carouselImage} />
            )}
          />
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.priceText}>$ {productDetail.price}</Text>
          <View style={styles.discountView}>
            <Text style={{ color: '#fff' }}>{productDetail.discountPercentage} % OFF</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity disabled={itemSelected}
            onPress={() => {
              dispatch(addProduct(productDetail?.id));
              setItemSelected(true)
            }}
            style={[styles.addToCartButton, { opacity: itemSelected ? 0.5 : 1,}]}>
            <Text style={[styles.buttonText, { color: '#2A4BA0'}]}>Add To Cart</Text>
          </TouchableOpacity>
          <View style={[styles.buttonView, { backgroundColor: '#2A4BA0' }]}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Buy Now</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.detailHeading}>Details</Text>
          <Text style={styles.descriptionText}>{productDetail.description}</Text>
        </View>

      </View>
    </>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productName: {
    color: '#1E222B',
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 16,
  },
  carouselView: {
    height: 260,
    width: Dimensions.get('window').width
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: 250,
    resizeMode: 'contain' 
  },
  carouselPaginationItem: {
    width: 20,
    height: 6,
    marginHorizontal: 5
  },
  carouselPaginationView: {
    position: 'absolute',
    left: 0
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  priceText: {
    color: '#2A4Ba0',
    fontSize: 18,
    fontWeight: '600' 
  },
  discountView: {
    backgroundColor: '#2A4BA0',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  buttonView: {
    width: '46%',
    borderWidth: 2,
    borderColor: '#2A4BA0',
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500'
  },
  detailHeading: {
    color: '#1E222B',
    fontSize: 16,
    fontWeight: '500'
  },
  descriptionText: {
    color: '#8891A5',
    fontSize: 16 
  }

});

export default Detail