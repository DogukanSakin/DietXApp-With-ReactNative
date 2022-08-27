import {StyleSheet} from 'react-native';
import Fonts from '../../../Styles/Fonts';
import ModalDefaults from '../../../Styles/ModalDefaults';
export default StyleSheet.create({
  modalContainer: {
    ...ModalDefaults.modalContainer,
  },
  container: {
    ...ModalDefaults.container,
  },
  leaveRoomButton: {
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 18,
  },
});
