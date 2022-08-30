import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  keyText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 14,
    flex: 1,
  },
  valueText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 14,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    opacity: 0.5,
    marginTop: 10,
  },
});
