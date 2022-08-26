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
  contentText: {
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 20,
    color: Colors.textColor,
  },
  tagText: {
    fontFamily: Fonts.defaultSemiBoldFont,
    fontSize: 20,
    color: Colors.darkGreen,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGreen,
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  banButtonText: {
    color: 'red',
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 20,
    textAlign: 'center',
  },
  banButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    marginLeft: 5,
  },
});
