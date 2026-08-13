import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Config from "react-native-config";
export default function CustomersContent(){
    const [customers,setCustomers] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);
useEffect(()=>{
    loadCustomers();
  },[]);
  const loadCustomers = async()=>{
    try{
        const response = await fetch(
        `${Config.API_BASE_URL}/reseller/customers`
      );
      console.log("Reseller Customer Status:",response.status);
      const data = await response.json();
      console.log("Reseller Customers:",data);
      if(Array.isArray(data)){
        setCustomers(data);
      }
      else{
        setCustomers([]);
      }
}
    catch(error){
        console.log(
        "Reseller Customers Error:",
        error
      );
      setCustomers([]);
    }
    finally{
        setLoading(false);

    }

  };
  if(loading){
    return(
      <ActivityIndicator
        size="large"
      />
    );

  }
  if(customers.length===0){
    return(
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No Customers Found
        </Text>
    </View>

    );

  }
  return(

    <FlatList

      data={customers}
      keyExtractor={
        (item)=>
        item.user_id.toString()
      }
      renderItem={({item})=>(

        <View style={styles.card}>
            <Text style={styles.name}>
            {item.username}
          </Text>
          <Text>
            📱 {item.mobile_no}
          </Text>
          <Text>
            📦 Orders : {item.total_orders}
          </Text>
        </View>
        
    )}
 />

  );

}
const styles=StyleSheet.create({

emptyContainer:{
 flex:1,
 justifyContent:"center",
 alignItems:"center",
},
emptyText:{
 fontSize:20,
 fontWeight:"700",
 color:"#777",
},
card:{
 backgroundColor:"#FFF",
 padding:16,
 marginBottom:12,
 borderRadius:12,
 elevation:3,
},
name:{
 fontSize:18,
 fontWeight:"700",
 marginBottom:8,
},
});