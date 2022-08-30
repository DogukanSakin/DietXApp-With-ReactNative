/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import styles from './UserInfoPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import Colors from '../../Styles/Colors';
import storage from '@react-native-firebase/storage';
import BodyMeasurements from '../../Components/Body Measurements';
import RoomCard from '../../Components/Cards/Room Card';
function UserInfoPage({route, navigation}: any) {
  const {userInfo} = route.params;
  const [userData, setUserData] = useState<any>({});
  const [profilePhotoURL, setProfilePhotoURL] = useState<any>(null);
  const [bmi, setBMI] = useState<number>(0);
  const [userRoomData, setUserRoomData] = useState<any>({});
  useEffect(() => {
    fetchUserData();
    fetchMyRoomsData();
  }, []);
  async function fetchMyRoomsData() {
    const fetchedDataArray: any = [];
    await database()
      .ref('rooms')
      .orderByChild('users')
      .on('value', function (snapshot) {
        snapshot.forEach(function (data): any {
          if (data.val().users[0].id === userData.id) {
            fetchedDataArray.push(data.val());
          }
        });
        setUserRoomData(fetchedDataArray);
      });
  }
  async function fetchUserData() {
    try {
      await database()
        .ref(`users/${userInfo.id}/`)
        .once('value')
        .then(snapshot => {
          const fetchedData = snapshot.val();
          if (fetchedData !== null) {
            setUserData(fetchedData);
            if (fetchedData.profilePhotoURL) {
              storage()
                .ref('/' + fetchedData.profilePhotoURL)
                .getDownloadURL()
                .then(url => {
                  setProfilePhotoURL(url);
                })
                .catch(e => console.log('Errors while downloading => ', e));
            }
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
    } catch (error) {
      console.log(error);
    }
  }
  const renderRooms = ({item}: any) => <RoomCard room={item} />;
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.goBackButtonContainer}>
          <Icon name="chevron-left" size={30} color={Colors.iconColor} />
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.profileInfoContainer}>
        {userData.profilePhotoURL ? (
          <Image source={{uri: profilePhotoURL}} style={styles.profilePhoto} />
        ) : (
          <Icon name="account-question" size={30} color={Colors.iconColor} />
        )}
        <Text style={styles.userNameText}>{userData.userName}</Text>
        <Text style={styles.genderText}>{userData.gender}</Text>
        {userData.weight && userData.height ? (
          <BodyMeasurements
            height={userData.height}
            weight={userData.weight}
            bmi={bmi}
          />
        ) : null}
        <FlatList data={userRoomData} renderItem={renderRooms} />
      </View>
    </View>
  );
}
export default UserInfoPage;
