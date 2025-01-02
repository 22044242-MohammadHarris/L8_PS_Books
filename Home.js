import React, { useState } from "react";
import {
  StatusBar,
  Button,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { datasource } from "./Data.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    margin: 10,
    textAlign: "center",
  },
  opacityStyle: {
    marginTop:10,
    borderWidth: 1,
    borderColor:'gray'
  },
  headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "impact",
  },
});

const Home = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  const getItem = async () => {
    // await AsyncStorage.removeItem('books');
    const books_str = await AsyncStorage.getItem("books");
    if (books_str != null) {
      setBooks(JSON.parse(books_str));
    } else {
      setBooks(datasource);
      // if the user want to edit the first book without adding other books, have to initialise the database first
      await AsyncStorage.setItem('books', JSON.stringify(books))
    }
  };

  getItem();

  const renderItem = ({ item, index, section }) => {
    const { title, isbn, url, copies } = item;

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          padding: 10,
        }}
      >
        {/* book description */}
        <View style={{ width: "65%" }}>
          <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize:15 }}>{title}</Text>
          <Text>ISBN: {isbn}</Text>
          <Text>Copies: {copies}</Text>
        </View>

        {/* book image */}
        <View>
          <Image source={{ uri: url }} width={130} height={180} />

          <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => {
              navigation.navigate("Edit", {
                books_str: JSON.stringify(books),
                index: index,
                type: section.title,
                key: item.key,
              });
            }}
          >
            <Text style={styles.textStyle}>Edit Book {index+1}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingBottom:80}}>
      <StatusBar />
      <Text style={{fontSize:20, fontWeight:'600', margin:10}}>MyLibrary</Text>
      <Button
        title="Add Book"
        onPress={() => {
          navigation.navigate("Add", { books_str: JSON.stringify(books) });
        }}
      />
      <SectionList
        sections={books}
        renderItem={renderItem}

        // renderSectionHeader={({section:{title,bgcolor}})=>(
        // <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        //   {title}
        // </Text>
        // )}
      />

      {/* <Text>{JSON.stringify(books)}</Text> */}
    </View>
  );
};

export default Home;
