import {StyleSheet} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.greyColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
  },
  icon: {
    marginLeft: 10,
  },
});
