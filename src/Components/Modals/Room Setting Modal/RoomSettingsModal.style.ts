import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
import ModalDefaults from '../../../Styles/ModalDefaults';
const deviceSize = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    ...ModalDefaults.container,
    height: deviceSize.height,
    top: 50,
    flex: 1,
  },
  modalContainer: {
    ...ModalDefaults.modalContainer,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  placeHolderText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 15,
  },
  formContainer: {
    marginTop: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGreen,
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  pageContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
