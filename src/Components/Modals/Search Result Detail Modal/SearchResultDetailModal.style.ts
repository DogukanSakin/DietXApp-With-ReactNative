import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
const deviceSize=Dimensions.get('window');
export default StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height:deviceSize.height,
        top:100, 
        padding:20    
    },
    modalContainer:{
        justifyContent:'flex-end',
        margin:0
    },
    foodNameText:{
        color:Colors.darkGreen,
        fontFamily:Fonts.defaultRegularFont,
        fontSize:20,
        marginLeft:10
    },
    resultDetailTitleInnerContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
  

})