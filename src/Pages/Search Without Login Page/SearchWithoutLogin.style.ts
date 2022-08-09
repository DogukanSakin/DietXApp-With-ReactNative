import { StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:10,
        flex:1
    },
    titleInnerContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    titleText:{
        fontFamily:Fonts.defaultSemiBoldFont,
        color:Colors.darkGreen,
        flex:1,
        textAlign:'center',
        fontSize:20
    },
    loadingStateContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
})