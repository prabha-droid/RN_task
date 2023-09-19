import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import navigationService from '../../root/navigationService';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, addToFavourite, setProductList } from '../../store/shopping/productSice';
import { Header } from '../../component';

const Home = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.product.productList)

    useEffect(() => {
        fetch('https://dummyjson.com/products', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(json => dispatch(setProductList(json.products)))
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 5 }}>
                <Header
                    backArrow={false}
                    rightComponent={true}
                    rightOnPress={() => navigationService.navigate('Cart')}
                />
            </View>
            {productList && <FlatList
                data={productList}
                numColumns={2}
                keyExtractor={() => Math.random()}
                renderItem={({ item }) => {
                    return (
                        <>
                            <View style={styles.listItemView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(addToFavourite(item?.id))
                                    }}>
                                    <Image source={item?.favourite ? require('.././../assets/images/heart-red.png') : require('.././../assets/images/heart-outline.png')} style={styles.favouriteIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigationService.navigate('Detail', {
                                        productDetail: item
                                    })}>
                                    <Image source={item.thumbnail ? { uri: item.thumbnail } : require('.././../assets/images/thumbnail.png')} style={styles.productImage} />
                                </TouchableOpacity>
                                <View style={styles.productDetailBox}>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.priceText}>$ {item?.price}</Text>
                                        <Text style={styles.productTitle}>{item?.title}</Text>
                                    </View>

                                    <TouchableOpacity disabled={item?.selectedQuantity > 0 ? true : false} style={{ opacity: item?.selectedQuantity > 0 ? 0.5 : 1 }} onPress={() => {
                                        dispatch(addProduct(item?.id))
                                    }}>
                                        <Image source={require('../../assets/images/plus_circle.png')} style={styles.addToCartIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )
                }}
            />}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },
    listItemView: {
        backgroundColor: '#F8F9FB',
        width: '45%',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 10,
        elevation: 10
    },
    favouriteIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        paddingHorizontal: 20
    },
    productImage: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 10,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 18
    },
    productDetailBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    priceText: {
        color: '#1E222B',
        fontWeight: '500',
        fontSize: 15
    },
    productTitle: {
        color: '#616A7D',
        fontSize: 14
    },
    addToCartIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain'
    }
});



export default Home

