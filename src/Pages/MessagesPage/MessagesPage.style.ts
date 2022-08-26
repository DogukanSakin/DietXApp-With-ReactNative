import {StyleSheet} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  roomNameText: {
    color: Colors.textColor,
    fontSize: 17,
    fontFamily: Fonts.defaultSemiBoldFont,
    textAlign: 'center',
    flex: 1,
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.textColor,
    marginTop: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.greyColor,
    borderRadius: 10,
    padding: 10,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputInnerContainer: {
    flex: 1,
    marginRight: 10,
  },
});
