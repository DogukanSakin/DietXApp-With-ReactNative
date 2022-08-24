import React, {FC} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MainButton from '../../Buttons/MainButton';
import InputBox from '../../InputBox';
import styles from './CreateRoomModal.style';
import {Formik} from 'formik';
interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string, roomPassword: string) => void;
  loading?: boolean;
}
const CreateRoomModal: FC<IModalProps> = ({
  isVisible,
  onClose,
  onCreateRoom,
  loading,
}) => {
  const initialFormValues = {
    roomName: '',
    roomPassword: '',
  };
  function handleCreateRoom(formValues: any) {
    onCreateRoom(formValues.roomName, formValues.roomPassword);
  }
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your room!</Text>
        <Formik initialValues={initialFormValues} onSubmit={handleCreateRoom}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <InputBox
                iconName="forum"
                numberOfLines={1}
                placeholder="Room name..."
                onChangeText={handleChange('roomName')}
                value={values.roomName}
              />
              <View style={styles.optionalTextContainer}>
                <View style={styles.line} />
                <Text style={styles.text}>Optional</Text>
                <View style={styles.line} />
              </View>
              <InputBox
                iconName="lock"
                numberOfLines={1}
                placeholder="Room password..."
                secureTextEntry={true}
                onChangeText={handleChange('roomPassword')}
                value={values.roomPassword}
              />
              <Text style={styles.warningText}>
                * If you enter a password, your room will be private and only
                those who know the password can join the room. You can change
                this password later.
              </Text>
              <MainButton
                title="Create a room!"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
};
export default CreateRoomModal;
