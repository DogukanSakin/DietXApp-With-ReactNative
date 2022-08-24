/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import styles from './ForumPage.style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
import InputBox from '../../Components/InputBox';
import RoomCard from '../../Components/Cards/Room Card';
import FloatingButton from '../../Components/Buttons/Floating Button';
import CreateRoomModal from '../../Components/Modals/Create Room Modal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import parseContentData from '../../Utils/parseContentData';
import CheckRoomPasswordModal from '../../Components/Modals/CheckRoomPasswordModal';
const Tab = createMaterialTopTabNavigator();
const deviceSize = Dimensions.get('window');
const currentUserUNAME = auth().currentUser?.email?.split('@')[0];
const currentUserUID = auth().currentUser?.uid;

function ForumPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {shadowColor: 'transparent', paddingTop: 15},
        tabBarIndicatorStyle: {opacity: 0},
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="SearchFoodsAndDrinks"
        component={AllRooms}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.darkGreen : '',
                  padding: 10,
                  borderRadius: 100,
                  width: deviceSize.width / 2.5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : Colors.textColor,
                    fontFamily: Fonts.defaultRegularFont,
                    fontSize: 17,
                  }}>
                  All Rooms
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchUsers"
        component={MyRooms}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.darkGreen : '',
                  padding: 10,
                  borderRadius: 100,
                  width: deviceSize.width / 2.5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : Colors.textColor,
                    fontFamily: Fonts.defaultRegularFont,
                    fontSize: 17,
                  }}>
                  My Rooms
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const MyRooms = ({navigation}: any) => {
  const [myRoomsData, setMyRoomsData] = useState<any>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<any>(null);
  const [checkRoomPasswordModalVisible, setCheckRoomPasswordModalVisible] =
    useState<boolean>(false);
  const [roomForCheckPassword, setRoomForCheckPassword] = useState<any>();
  useEffect(() => {
    fetchMyRoomsData();
  }, []);
  async function fetchMyRoomsData() {
    const fetchedData: any = [];
    if (currentUserUID) {
      await database()
        .ref('rooms')
        .orderByChild('users')
        .on('value', function (snapshot) {
          snapshot.forEach(function (data): any {
            if (data.val().users.includes(currentUserUID)) {
              const roomContent = {
                id: data.key,
                ...data.val(),
              };
              fetchedData.push(roomContent);
            }
          });
          setMyRoomsData(fetchedData);
        });
    }
  }
  function searchInMyRooms(roomName: string) {
    roomName = roomName.trim();
    if (roomName === '') {
      setFilteredRoomData(null);
    } else {
      setFilteredRoomData(myRoomsData);
      if (filteredRoomData) {
        const result = filteredRoomData.filter((room: any) => {
          roomName = roomName.toLowerCase();
          const currentRoomName = room.name.toLowerCase();
          return currentRoomName.indexOf(roomName) > -1;
        });
        if (result) {
          setFilteredRoomData(result);
        }
      }
    }
  }
  function handleCheckRoomPasswordModalVisible() {
    setCheckRoomPasswordModalVisible(!checkRoomPasswordModalVisible);
  }
  const renderRooms = ({item}: any) => (
    <RoomCard
      room={item}
      onPress={() =>
        goMessagesPage(
          item,
          setRoomForCheckPassword,
          setCheckRoomPasswordModalVisible,
          navigation,
        )
      }
    />
  );
  return (
    <View style={styles.container}>
      <InputBox
        iconName="magnify"
        placeholder="Search in my rooms..."
        onChangeText={t => searchInMyRooms(t)}
      />
      <Text>MYROOMS</Text>
      {filteredRoomData ? (
        <FlatList
          data={filteredRoomData}
          renderItem={renderRooms}
          numColumns={2}
        />
      ) : (
        <FlatList data={myRoomsData} renderItem={renderRooms} numColumns={2} />
      )}
      <CheckRoomPasswordModal
        isVisible={checkRoomPasswordModalVisible}
        onClose={handleCheckRoomPasswordModalVisible}
        room={roomForCheckPassword}
      />
    </View>
  );
};
const AllRooms = ({navigation}: any) => {
  const [createRoomModalVisible, setCreateRoomVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<any>(false);
  const [roomsData, setRoomsData] = useState<any>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<any>(null);
  const [checkRoomPasswordModalVisible, setCheckRoomPasswordModalVisible] =
    useState<boolean>(false);
  const [roomForCheckPassword, setRoomForCheckPassword] = useState<any>();
  useEffect(() => {
    fetchRoomData();
  }, []);
  function searchInAllRooms(roomName: string) {
    roomName = roomName.trim();
    if (roomName === '') {
      setFilteredRoomData(null);
    } else {
      setFilteredRoomData(roomsData);
      if (filteredRoomData) {
        const result = filteredRoomData.filter((room: any) => {
          roomName = roomName.toLowerCase();
          const currentRoomName = room.name.toLowerCase();
          return currentRoomName.indexOf(roomName) > -1;
        });
        if (result) {
          setFilteredRoomData(result);
        }
      }
    }
  }
  async function fetchRoomData() {
    await database()
      .ref('rooms/')
      .on('value', snapshot => {
        const fetchedData = snapshot.val();
        if (fetchedData != null) {
          const parsedData = parseContentData(fetchedData);

          setRoomsData(parsedData);
        }
      });
  }
  function handleCreateRoomVisible() {
    setCreateRoomVisible(!createRoomModalVisible);
  }
  async function createARoom(roomName: string, roomPassword: string) {
    try {
      setLoading(true);
      const roomInfo = {
        name: roomName,
        password: roomPassword ? roomPassword : null,
        admin: currentUserUID,
        isPrivate: roomPassword ? true : false,
        users: [{id: currentUserUID, userName: currentUserUNAME}],
      };
      await database().ref('rooms/').push(roomInfo);
      await database().ref(`users/${currentUserUID}/rooms/`).push(roomInfo);
      setLoading(false);
      showMessage({
        message: 'Your room was successfuly created!',
        type: 'success',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
      setCreateRoomVisible(false);
    } catch (error) {
      setCreateRoomVisible(false);
      setLoading(false);
      showMessage({
        message: 'Opps... There is an error!',
        type: 'danger',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
    }
  }

  function handleCheckRoomPasswordModalVisible() {
    setCheckRoomPasswordModalVisible(!checkRoomPasswordModalVisible);
  }

  const renderRooms = ({item}: any) => (
    <RoomCard
      room={item}
      onPress={() =>
        goMessagesPage(
          item,
          setRoomForCheckPassword,
          setCheckRoomPasswordModalVisible,
          navigation,
        )
      }
    />
  );
  return (
    <View style={styles.container}>
      <InputBox
        iconName="magnify"
        placeholder="Search in all rooms..."
        onChangeText={t => searchInAllRooms(t)}
      />
      {filteredRoomData ? (
        <FlatList
          data={filteredRoomData}
          renderItem={renderRooms}
          numColumns={2}
        />
      ) : (
        <FlatList data={roomsData} renderItem={renderRooms} numColumns={2} />
      )}
      <FloatingButton onPress={handleCreateRoomVisible} />
      <CreateRoomModal
        isVisible={createRoomModalVisible}
        onClose={handleCreateRoomVisible}
        onCreateRoom={createARoom}
        loading={loading}
      />
      <CheckRoomPasswordModal
        isVisible={checkRoomPasswordModalVisible}
        onClose={handleCheckRoomPasswordModalVisible}
        room={roomForCheckPassword}
      />
    </View>
  );
};
//---------------------------------------------------------------------------------------
//common functions for two pages
async function goMessagesPage(
  room: any,
  roomPassword: any,
  modalVisible: any,
  navigation: any,
) {
  if (room.isPrivate) {
    roomPassword(room);
    modalVisible(true);
  } else {
    if (currentUserUID) {
      await database()
        .ref(`rooms/${room.id}/users`)
        .orderByChild('users')
        .on('value', function (snapshot) {
          let isUserRegisteredTheRoom = false;
          snapshot.forEach(function (data): any {
            if (data.val().id === currentUserUID) {
              navigation.navigate('Messages', {room});
              isUserRegisteredTheRoom = true;
            }
          });
          if (isUserRegisteredTheRoom === false) {
            database()
              .ref(`rooms/${room.id}/`)
              .update({
                users: [...room.users, currentUserUID],
              });
          }
        });
    }
  }
}

export default ForumPage;
