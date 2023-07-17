import React, { useEffect } from 'react';  
import { SafeAreaView,View, Text, Button , Image } from 'react-native'; 
import { StyleSheet } from 'react-native'; 
import {createAppContainer } from 'react-navigation';  
import {createStackNavigator} from 'react-navigation-stack';
import DraggableSprite from './components/DraggableSprite';
import ActionSelectorPanel from './components/ActionSelectorPanel';


const Imag = () => {
    
  return(
    <SafeAreaView style={{alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    marginBottom:100,}}>
      <Image 
        source={require('./assets/scratch.png')} 
        style={styles.img}
      />
    </SafeAreaView>
  )
}

class Splashscreen extends React.Component {

  constructor(props){
  super(props);
  this.state = {
  timePassed: false
  };
}

componentDidMount() {
  setTimeout( () => {
     this.setTimePassed();
  },1000);
}

setTimePassed() {
   this.setState({timePassed: true});
}


render() {

if (!this.state.timePassed){
  return <Imag/>;
}else{
  return (
    <AppContainer/>
  );
}
}
    
}


class HomeScreen extends React.Component {
  static navigationOptions = {  
        title: 'Scratch',  
        headerStyle: {  
            backgroundColor: '#65a9cd',  
        },  
        headerTintColor: 'rgb(250, 250, 250)',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    }; 
    render () {
      return (
        
        <DraggableSprite navigation={this.props.navigation}/>
        
      )
    }
}
 
class ProfileScreen extends React.Component {  
    static navigationOptions = {  
        title: 'Profile',  
        headerStyle: {  
            backgroundColor: 'rgb(137, 185, 92)',  
        },  
        headerTintColor: 'rgb(12, 11, 11)',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  
    render() {  
        return (
          <View style={styles.container}>
            <ActionSelectorPanel/>  
          </View>
    );  
    }  
}  
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Profile: ProfileScreen  
    },  
    {  
        initialRouteName: "Home"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
    render() {  
        return <Splashscreen />;  
    }  
}  



const styles = StyleSheet.create({
  img:{
    
    width: 190,
    height: 150,
  },
  container:{
    
    flex:1,
    marginBottom:100,
  },
  butt:{
    backgroundColor:"65a9cd"
  }
  
  
  
}
)

