import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
const deviceSize = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGreen,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: deviceSize.height,
    justifyContent: 'center',
    top: 75,
    marginBottom: 25,
  },
  welcomeText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultSemiBoldFont,
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  logo: {
    marginTop: 15,
  },
  logoContainer: {
    alignItems: 'center',
  },
  otherChoiceLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {
    borderBottomWidth: 0.5,
    flex: 1,
    color: Colors.darkGreen,
  },
  otherChoiceContainerText: {
    fontSize: 13,
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
    flex: 1,
    textAlign: 'center',
  },
  innerOptionalContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 13,
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
  },
  uploadPhotoText: {
    fontSize: 15,
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
    textAlign: 'center',
    flex: 1,
  },
  backToPageInnerContainer: {
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToPageText: {
    fontFamily: Fonts.defaultRegularFont,
    color: Colors.textColor,
    fontSize: 15,
  },
});
