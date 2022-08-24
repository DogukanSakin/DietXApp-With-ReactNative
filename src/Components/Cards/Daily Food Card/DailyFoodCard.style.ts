import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.greyColor,
    borderRadius: 10,
    width: 150,
    height: 150,
    padding: 10,
    margin: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  calText: {
    color: Colors.darkGreen,
    fontFamily: Fonts.defaultRegularFont,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  foodNameText: {
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
  },
});
