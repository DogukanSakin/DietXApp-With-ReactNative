import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
const deviceSize=Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.lightGreen,
      
    },
    innerContainer:{
        backgroundColor:'white',
        padding:10,
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        height:deviceSize.height,
        justifyContent:'center',
        bottom:75
      
        
    },
    welcomeText:{
        color:Colors.textColor,
        fontFamily:Fonts.defaultSemiBoldFont,
        fontSize:25,
        marginTop:15,
        marginBottom:15

    },
    logo:{
        marginTop:15,
    },
    logoContainer:{
        alignItems:'center'
    },
    otherChoiceLineContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    line:{
        borderBottomWidth:0.5, 
        flex:1,
        color:Colors.darkGreen
    },
    otherChoiceContainerText:{
        fontSize:13,
        fontFamily:Fonts.defaultRegularFont,
        color:Colors.textColor,
        flex:1,
        textAlign:'center'
    },
    registerText:{
        fontSize:14,
        fontFamily:Fonts.defaultRegularFont,
        color:Colors.textColor,
        flex:1
        
    },
    registerTextInline:{
        color:Colors.darkGreen,
       
    },
    choiceContainer:{
        flexDirection:'row'
    },
    justSearchText:{
        fontSize:14,
        fontFamily:Fonts.defaultRegularFont,
        color:Colors.textColor,
        flex:1,
        textAlign:'right'
    }
})