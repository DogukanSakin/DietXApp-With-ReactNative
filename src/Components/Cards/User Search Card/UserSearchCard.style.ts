import { StyleSheet } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        backgroundColor:Colors.lightGreen,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginTop:10,
        marginBottom:10

    },
    userNameText:{
        color:Colors.textColor,
        fontFamily:Fonts.defaultRegularFont,
        flex:1,
        textAlign:'center',
        fontSize:17
    }
})