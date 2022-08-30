import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
import ModalDefaults from '../../../Styles/ModalDefaults';
export default StyleSheet.create({
  container: {
    ...ModalDefaults.container,
  },
  modalContainer: {
    ...ModalDefaults.modalContainer,
  },
  title: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 18,
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    flex: 1,
    color: Colors.darkGreen,
  },
  optionalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
    flex: 1,
    textAlign: 'center',
  },
  warningText: {
    color: 'red',
    fontSize: 14,
    fontFamily: Fonts.defaultRegularFont,
  },
});
