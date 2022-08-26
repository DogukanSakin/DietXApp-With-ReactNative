import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
import ModalDefaults from '../../../Styles/ModalDefaults';
const baseTextStyle = StyleSheet.create({
  baseText: {
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
export default StyleSheet.create({
  container: {
    ...ModalDefaults.container,
  },
  modalContainer: {
    ...ModalDefaults.modalContainer,
  },
  foodNameText: {
    color: Colors.darkGreen,
    ...baseTextStyle.baseText,
  },
  totalCalText: {
    color: Colors.textColor,
    ...baseTextStyle.baseText,
  },
  errorText: {
    color: 'red',
    fontFamily: Fonts.defaultRegularFont,
    textAlign: 'center',
  },
});
