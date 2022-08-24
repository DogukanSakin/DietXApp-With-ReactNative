import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
const baseStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 16,
  },
});
export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  text: {
    ...baseStyles.text,
    color: Colors.textColor,
  },
  errorText: {
    ...baseStyles.text,
    color: 'red',
  },
});
