import React,{useEffect, useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {
  const[letter,setLetter] = useState(route.params.key);
  const {books_str, index, type, key} = route.params;

  const [book, setBook] = useState({});


  const initialisation = async() => {
    const books = JSON.parse(await AsyncStorage.getItem('books'));
    setBook(books[0].data[index])
  }

  useEffect(()=>{
    initialisation();
  },[])

  // initialisation();
  

  const handleEdit = async() => {
    let books = JSON.parse(await AsyncStorage.getItem('books'));
    books[0].data[index] = book;

    console.log(books[0].data[index])
    await AsyncStorage.setItem('books', JSON.stringify(books))

    navigation.navigate('Home')
  }
  
  const handleDelete = async() => {
    let books = JSON.parse(await AsyncStorage.getItem('books'));
    books[0].data.pop(index);

    await AsyncStorage.setItem('books', JSON.stringify(books))


    console.log(books[0].data)
    navigation.navigate('Home')

  }
  

  
  const handleOnChangeText = (param, value) => {
    setBook((prevBook) => ({
      ...prevBook,
      [param]: value,
    }));
  };


  return (
    <View>

      <Text style={{fontSize:20, fontWeight:'600', margin:10}}>MyLibrary</Text>
            <Button
              title="Go Back (HOME)"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            

            <View style={{padding:10}}>

           
            <Text style={{ fontWeight: "bold", marginBottom:5 }}>Title:</Text>

            <TextInput
              value={book["title"]} // Add this to make it controlled
              style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
              onChangeText={(text) => handleOnChangeText("title", text)}
            />
      
            <Text style={{ fontWeight: "bold", marginBottom:5 }}>ISBN:</Text>
            <TextInput
              value={book["isbn"]} // Add this to make it controlled
              style={{ borderWidth: 1, padding: 10, marginBottom:10}}
              onChangeText={(text) => handleOnChangeText("isbn", text)}
            />
      
            <Text style={{ fontWeight: "bold", marginBottom:5 }}>Image Url:</Text>
            <TextInput
              value={book["url"]} // Add this to make it controlled
              style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
              onChangeText={(text) => handleOnChangeText("url", text)}
            />
      
            <Text style={{ fontWeight: "bold", marginBottom:5 }}>Copies:</Text>
            <TextInput
              keyboardType={'numeric'}
              value={book["copies"]} // Add this to make it controlled
              style={{ borderWidth: 1, padding: 10, marginBottom:10 }}
              onChangeText={(text) => handleOnChangeText("copies", text)}
            />
      
      
      
      </View>
      
      
      
      
      
      
      
      
      
      
      
      
      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
          <Button title='save' onPress={handleEdit}/>
        {/* <Button title='Save'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
              indexnum = 0;
            }
            datasource[indexnum].data[route.params.index].key=letter;
            navigation.navigate("Home")
          }
        }
        /> */}
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            // let indexnum = 1
            // if(route.params.type=="Vowels") {
            //   indexnum = 0;
            // }
            Alert.alert("Are you sure?",'', 
              [{text:'Yes', onPress:handleDelete
                
                
                // navigation.navigate("Home")
              },
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;