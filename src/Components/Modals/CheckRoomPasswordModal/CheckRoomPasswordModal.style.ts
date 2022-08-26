import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
import ModalDefaults from '../../../Styles/ModalDefaults';
const baseStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 16,
  },
});
export default StyleSheet.create({
  container: {
    ...ModalDefaults.container,
  },
  modalContainer: {
    ...ModalDefaults.modalContainer,
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
