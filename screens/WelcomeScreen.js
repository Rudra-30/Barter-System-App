import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal,ScrollView,KeyboardAvoidingView } from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
      isModalvisible: 'false',
    }
  }
  showModal = ()=>{
    return(
      <Modal
      animationType = 'fade'
      transparent = {true} 
      visible = {this.state.isModalvisible}>

      <View>
      <ScrollView style = {{width: '100%'}}>
      <KeyboardAvoidingView>
      <Text style = {{fontSize: 25, alignItems: "center", alignSelf: "center"}}>
      Registration Form
      </Text>
      <TextInput style = {styles.loginBox}
      placeholder = {"First Name"}
      maxLength = {12}
      onChangeText = {(text)=>{
      this.setState({ 
      firstName: text
       }) 
       }} 
       />
       <TextInput style = {styles.loginBox}
      placeholder = {"Last Name"}
      maxLength = {12}
      onChangeText = {(text)=>{
      this.setState({ 
      lastName: text
       }) 
       }} 
       />
      <TextInput style = {styles.loginBox}
      placeholder = {"Address"}
      multiline = {true}
      onChangeText = {(text)=>{
      this.setState({ 
      address: text
       }) 
       }} 
       />
       <TextInput style = {styles.loginBox}
      placeholder = {"Email Id"}
      keyboardType = {'email address'}
      onChangeText = {(text)=>{
      this.setState({ 
      emailId: text
       }) 
       }} 
       />
      <TextInput style = {styles.loginBox}
      placeholder = {"Contact"}
      keyboardType = {'numeric'}
      onChangeText = {(text)=>{
      this.setState({ 
      contact: text
       }) 
       }} 
       />
       <TextInput style = {styles.loginBox}
      placeholder = {"Password"}
      secureTextEntry = {true}
      onChangeText = {(text)=>{
      this.setState({ 
      password: text
       }) 
       }} 
       />
       <TextInput style = {styles.loginBox}
      placeholder = {"Confirm Password"}
      secureTextEntry = {true}
      onChangeText = {(text)=>{
      this.setState({ 
      confirmPassword: text
       }) 
       }} 
       />
       <View>
       <TouchableOpacity style = {styles.loginBox}
       onPress = {()=>
       this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
       <Text>
       Register
       </Text>
       </TouchableOpacity>

       <TouchableOpacity style = {styles.loginBox}
       onPress = {()=>
       this.setState({'isModalvisible': false})}>
       <Text>
       Cancel
       </Text>
       </TouchableOpacity>
       </View>
       </KeyboardAvoidingView>
       </ScrollView>
       </View>
       </Modal>


    )

  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return Alert.alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address
       })
       return  Alert.alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return Alert.alert(errorMessage)
     });
   }
 }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
         {this.showModal()} /////////////////
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
