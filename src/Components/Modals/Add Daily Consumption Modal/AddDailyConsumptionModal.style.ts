import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
const baseTextStyle=StyleSheet.create({
    baseText:{
        fontFamily:Fonts.defaultRegularFont,
        fontSize:15,
        textAlign:'center',
        marginTop:10,
        marginBottom:10
    }
})
export default StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:10

    },
    modalContainer:{
        justifyContent:'flex-end',
        margin:0
    },
    foodNameText:{
        color:Colors.darkGreen,
        ...baseTextStyle.baseText
    },
    totalCalText:{
        color:Colors.textColor,
        ...baseTextStyle.baseText
    }
})