import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';

export default StyleSheet.create({
    container:{
        borderRadius:10,
        backgroundColor:Colors.lightGreen,
        marginTop:10,
        marginBottom:10
    },
    imageContainer:{
        borderRadius:10
    },
    innerContainer:{
        flexDirection:'row'
    },
    textInfoContainer:{
        marginLeft:15,
        marginTop:15
    },
    calText:{
        color:Colors.darkGreen,
        fontFamily:Fonts.defaultSemiBoldFont,
        fontSize:15,
        marginBottom:10
    },
    nameText:{
        color:Colors.textColor,
        fontSize:17,
        fontFamily:Fonts.defaultRegularFont,
        marginBottom:10
    },
    brandText:{
        color:Colors.lightTextColor,
        fontSize:14,
        fontFamily:Fonts.defaultLightFont
    },
    image:{
        width:100,
        height:100,
    }
})