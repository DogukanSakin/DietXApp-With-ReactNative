import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './ProfilePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import database from '@react-native-firebase/database';
import currentUserInfo from '../../Utils/getUserInfo';
import BodyMeasurements from '../../Components/Body Measurements';
import InputBox from '../../Components/InputBox';
import MainButton from '../../Components/Buttons/MainButton';
const userTEST = {
  age: 18,
  email: 'Nra@nra.com',
  gender: 'Male',
  height: 188,
  userName: 'Nra',
  weight: 90,
};

function ProfilePage() {
  const [currentUserData, setCurrentUserData] = useState<any>(userTEST);
  const [bmi, setBMI] = useState<number>(0);
  useEffect(() => {
    fetchUserInfoData();
  }, []);

  async function fetchUserInfoData() {
    await database()
      .ref(`users/${currentUserInfo.userID}`)
      .on('value', snapshot => {
        const fetchedData = snapshot.val();
        if (fetchedData) {
          setCurrentUserData(fetchedData);
          if (fetchedData.weight && fetchedData.height) {
            const BMI = Math.floor(
              Math.floor(fetchedData.weight) /
                ((Math.floor(fetchedData.height) / 100) *
                  (Math.floor(fetchedData.height) / 100)),
            );
            setBMI(BMI);
          }
        }
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <View style={styles.iconContainer}>
          <Icon
            name="logout"
            size={30}
            color={Colors.darkGreen}
            onPress={() => auth().signOut()}
          />
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePhotoContainer}>
          <Icon name="account-question" size={30} color={Colors.iconColor} />
          <View style={styles.addProfilePhotoButton}>
            <Icon name="plus" size={15} color="white" />
          </View>
        </View>
        <Text style={styles.userNameText}>{currentUserData.userName}</Text>
        {currentUserData.gender && (
          <Text style={styles.genderText}>{currentUserData.gender}</Text>
        )}
        <BodyMeasurements
          weight={currentUserData.weight}
          height={currentUserData.height}
          bmi={bmi}></BodyMeasurements>
      </View>
      <InputBox iconName="email"></InputBox>
      <InputBox iconName="lock" secureTextEntry={true}></InputBox>
      <View style={styles.formInnerContainer}>
        <InputBox iconName="weight-kilogram"></InputBox>
        <InputBox iconName="human-male-height-variant"></InputBox>
        <InputBox iconName="baby-carriage"></InputBox>
      </View>
      <MainButton title="Update profile"></MainButton>
    </View>
  );
}
export default ProfilePage;
