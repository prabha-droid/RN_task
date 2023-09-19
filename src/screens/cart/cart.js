import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../store/shopping/productSice';
import { Header } from '../../component';

const Cart = () => {
  const dispatch = useDispatch()
  const [subTotal, setSubTotal] = useState(0)
  const cart = useSelector((state) => state.product.cart);

  useEffect(() => {
    if (cart?.length > 0) {
      cart.forEach((item) => {
        setSubTotal(subTotal + (item.price * item?.selectedQuantity))
        console.log(item.price * item?.selectedQuantity)
      })
    }
  }, []);

  const billCalculator = (item, calculate) => {
    if (calculate === 'add') {
      setSubTotal(subTotal + item.price);
    }
    else {
      setSubTotal(subTotal - item.price);
    }
  }
  return (
    <>
      <Header
        backArrow={true}
        heading={`Shopping Cart (${cart.length})`}
      />
      <View style={styles.container}>
        {cart.length > 0 && <View style={{height:(Dimensions.get('window').height)/2}}><FlatList
          showsVerticalScrollIndicator={false}
          data={cart}
          
          keyExtractor={(item) => Math.random()}
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
                    dispatch(removeProduct(item?.id))
                    billCalculator(item, 'reduce')
                  }}
                  style={styles.quantityButton}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text>{item.selectedQuantity}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addProduct(item?.id));
                    billCalculator(item, 'add')
                  }}
                  style={styles.quantityButton}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        /></View>}
        <View style={styles.billSection}>
          <View style={styles.billDetailTabs}>
            <Text style={styles.totalPrice}>Subtotal</Text>
            <Text style={styles.totalPrice}>${subTotal}</Text>
          </View>
          <View style={styles.billDetailTabs}>
            <Text style={styles.totalPrice}>Delivery</Text>
            <Text style={styles.totalPrice}>$40</Text>
          </View>
          <View style={styles.billDetailTabs}>
            <Text style={styles.totalPrice}>Total</Text>
            <Text style={styles.totalPrice}>${subTotal + 40}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed To Checkout</Text>
          </TouchableOpacity>
        </View>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F8F9FB',
    borderRadius: 20,
    marginHorizontal: 8,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  totalPrice: {
    fontSize: 18,
    marginTop: 16,
  },
  checkoutButton: {
    backgroundColor: '#2A4BA0',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
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
  billSection: {
    position: 'absolute',
    bottom: 0,
    width: '105%',
    height: Dimensions.get('window').height/3,
    backgroundColor: '#F8F9FB',
    alignSelf: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingTop: 10
  },
  billDetailTabs: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // paddingTop: 5
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  }
});

export default Cart