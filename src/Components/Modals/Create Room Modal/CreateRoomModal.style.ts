import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
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
  title: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 17,
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
    fontSize: 13,
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
    flex: 1,
    textAlign: 'center',
  },
  warningText: {
    color: 'red',
    fontSize: 13,
    fontFamily: Fonts.defaultRegularFont,
  },
});
