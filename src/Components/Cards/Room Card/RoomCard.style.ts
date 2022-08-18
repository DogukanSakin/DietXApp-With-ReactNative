import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        height:150,
        width:150,
        backgroundColor:Colors.lightGreen,
        borderRadius:10,
    
    },
    roomNameText:{
        color:Colors.textColor,
        fontFamily:Fonts.defaultRegularFont,
        fontSize:17,
        textAlign:'center'
    },
    innerContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        bottom:5 
    },
    roomInfoText:{
        color:Colors.textColor,
        fontFamily:Fonts.defaultRegularFont,
        fontSize:13,
        marginLeft:5
    },
    titleContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    roomAccessContainer:{
        backgroundColor:'white',
        borderRadius:50,
        position: "absolute", 
        right: -5,
        height:30,
        width:30,
        justifyContent:'center',
        alignItems:'center',
        top:-5,
        
    },
})