import * as React from 'react';
import { Text, View, StyleSheet, Platform,TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';


//exemplo de validacao de Registro
async function validateRegistrer(user,password,statusSetter,activitySetter){

    activitySetter(true)

    var obj = { "email": user,
                "password":password};


    await fetch(
      'https://reqres.in/api/register', 
      {
          method: 'POST',
          headers: 
          {
             Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
      }).then(response => {
          if (response.status === 200) {
            statusSetter('OK, Registrado')
            response.text().then(function(result){ 
              console.log(result); 
              });
          } else {
            statusSetter('Falha no Registro')
          }
          activitySetter(false)
      })
      .then(response => {
        console.debug(response);
      }).catch(error => {
        console.error(error);
      });
}

export default function App() {

  const [user,setUser]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [status,setStatus]=React.useState('')
  const [activity,setActivity]=React.useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>tela de registro</Text>

      <Text style={styles.loginLabel}>Usuário</Text>

      <TextInput 
        autoCorrect = {false} 
        placeholder = "Digite o usuário" 
        placeholderTextColor = "grey" 
        style = {styles.textInput}
        clearButtonMode = "always"
        onChangeText={(value) => setUser(value)}
       />

      <Text style={styles.loginLabel}>Senha</Text>

      <TextInput 
        autoCorrect = {false} 
        placeholder = "Digite a senha" 
        placeholderTextColor = "grey"
        secureTextEntry={true} 
        style = {styles.textInput}
        clearButtonMode = "always"
        onChangeText={(value) => setPassword(value)}
       />

      <TouchableOpacity
        onPress={()=>{
          validateLogin(user,password,setStatus,setActivity)
        }}>
          <Text style={styles.button}>Registrar</Text>
      </TouchableOpacity>
      

      <View style={{marginTop:10}}>
        <ActivityIndicator size="large" animating={activity}/>
      </View>

      <Text style={styles.loginLabel}>{status}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#00f',
    padding: 8,
  },
  paragraph: {
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLabel: {
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button:{
    backgroundColor:'grey',
	    color:'white',
      fontSize: 15,
	    width: 200,
	    marginTop: 70,
	    marginHorizontal:20,
	    paddingHorizontal:10,
      textAlign: 'center',
      fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
	    alignSelf: 'center'
  },
  textInput: {
	    backgroundColor:'white',
	    color:'black',
      fontSize: 15,
	    height: 40,
	    width: 250,
	    marginTop: 20,
	    marginHorizontal:20,
	    paddingHorizontal:10,
      fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
	    alignSelf: 'center'}
});
