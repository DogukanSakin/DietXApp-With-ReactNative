import {StyleSheet} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  measureText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 15,
    padding: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
