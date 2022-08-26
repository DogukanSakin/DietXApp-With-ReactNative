import auth from '@react-native-firebase/auth';
const currentUserInfo={
    userID:auth().currentUser?.uid,
    userName:auth().currentUser?.email?.split('@')[0]
}
export default currentUserInfo;