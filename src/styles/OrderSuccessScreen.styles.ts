import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#FFF',
  },

  icon:{
    fontSize:70,
  },

  title:{
    fontSize:24,
    fontWeight:'700',
    marginTop:20,
  },

  subtitle:{
    marginTop:10,
    color:'#666',
    textAlign:'center',
  },

  button:{
    marginTop:30,
    backgroundColor:'#A84B21',
    padding:15,
    borderRadius:10,
    width:'80%',
    alignItems:'center',
  },

  buttonText:{
    color:'#FFF',
    fontWeight:'700',
  },
});

export default styles;
