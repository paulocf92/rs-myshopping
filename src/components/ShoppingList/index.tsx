import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as ProductProps[];

        setProducts(data);

        return () => unsubscribe();
      });
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
