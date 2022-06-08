import React, { Component, useState } from 'react';
import { Button, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import CategoryList from './Category';

const item = ["a", "b", "c", "d", "e", "f"]

const Menus =() => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FlatList
      data={item}
      keyExtractor={(item, index) => {
        return `menus-${index}`;
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={() => {
        setLoading(true);
        setTimeout(() => {         
          setLoading(false);
        }, 2000);
      }}
      // onEndReached={() => {
      //   setMenuList([...menuList, ...getmenuList()]);
      // }}
      onEndReachedThreshold={0.5}
      refreshing={loading}
      ListHeaderComponent={<CategoryList />}
     
    />
  );
};

export default Menus;