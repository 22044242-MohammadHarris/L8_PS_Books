import React, { useState } from "react";
import { StatusBar, View, Button, Text, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { datasource } from "./Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({ navigation, route }) => {
  // retrieve the book string data
  const { books_str } = route.params;

  // const [newbook, setNewbook] = useState({
  //   title: "test",
  //   isbn: "test",
  //   url: "https://m.media-amazon.com/images/I/41U1K43BixL._SY445_SX342_.jpg",
  //   copies: "0",
  // });

  const [newbook, setNewbook] = useState({
    title: "",
    isbn: "",
    url: "",
    copies: "",
  });

  const addBookItem = async () => {
    // we are resettig the entire data, no update individual accordingly
    let updated_book_str = JSON.parse(books_str);
    updated_book_str[0].data.push(newbook);

    console.log(JSON.stringify(updated_book_str[0].data));

    const addBook = await AsyncStorage.setItem(
      "books",
      JSON.stringify(updated_book_str)
    );
    navigation.navigate("Home");
  };

  // const[letter,setLetter] = useState("");
  // const[type,setType] = useState("Vowels");

  const handleOnChangeText = (param, value) => {
    setNewbook((prevBook) => ({
      ...prevBook,
      [param]: value,
    }));
  };

  // const TextInputCustom = ({param}) => {
  //   return(
  //     <View>
  //      <Text style={{fontWeight:'bold'}}>{param.toUpperCase()}:</Text>
  //     <TextInput
  //       value={newbook[param]}  // Add this to make it controlled
  //       style={{ borderWidth: 1, padding: 10}}
  //       onChangeText={(text) => handleOnChangeText(param, text)}
  //     />
  //     </View>

  //   )
  // }

  return (
    <View>
      <StatusBar />
      {/* <Text>Letter:</Text>
      <TextInput maxLength={1} style={{borderWidth:1}} onChangeText={(text)=>setLetter(text)}/> */}
      <Text style={{ fontSize: 20, fontWeight: "600", margin: 10 }}>
        MyLibrary
      </Text>
      <Button
        title="Go Back (HOME)"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />

      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom:5 }}>Title:</Text>
        <TextInput
        placeholder="Cinderella"
          value={newbook["title"]} // Add this to make it controlled
          style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
          onChangeText={(text) => handleOnChangeText("title", text)}
        />

        <Text style={{ fontWeight: "bold", marginBottom:5 }}>ISBN:</Text>
        <TextInput
        placeholder="e.g., 9781484211922"
          value={newbook["isbn"]} // Add this to make it controlled
          style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
          onChangeText={(text) => handleOnChangeText("isbn", text)}
        />

        <Text style={{ fontWeight: "bold", marginBottom:5 }}>Image Url:</Text>
        <TextInput
          placeholder="https://"
          value={newbook["url"]} // Add this to make it controlled
          style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
          onChangeText={(text) => handleOnChangeText("url", text)}
        />

        <Text style={{ fontWeight: "bold", marginBottom:5 }}>Copies:</Text>
        <TextInput

        placeholder="0"
          value={newbook["copies"]} // Add this to make it controlled
          style={{ borderWidth: 1, padding: 10, marginBottom:30 }}
          onChangeText={(text) => handleOnChangeText("copies", text)}
        />

        {/* <RNPickerSelect
        default={{label:"Vowels", value:"Vowels"}}
        onValueChange={(value)=>setType(value)}
        items={[
          {label:"Vowels", value:"Vowels"},
          {label:"Consonants", value:"Consonants"}
        ]}
      /> */}
        <Button
          title="ADD BOOK"
          onPress={addBookItem}
          
          // onPress={()=>{
          //     let item = {key:letter};
          //     let indexnum = 1;
          //     if(type=="Vowels") {
          //       indexnum = 0;
          //     }
          //     datasource[indexnum].data.push(item);
          //     navigation.navigate("Home")
          //   }
          // }
        />
      </View>
    </View>
  );
};

export default Add;
