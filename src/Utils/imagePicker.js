import { launchImageLibrary} from 'react-native-image-picker';
export default  async function getImage(){
  let options = {
    title: 'Select Image',
    allowsEditing: true,
    quality:0.9,
    noData: true,
    maxWidth:1200,
    maxHeight:1200,
    mediaType: "photo",
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
        skipBackup: true,
        cameraRoll: false
    },
  };

  let imageRes= await launchImageLibrary(options, response => {
    //console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {

        const previewFileName= response.assets[0].uri;
        return previewFileName;
       
      
    }
  });
  return imageRes;
}

   
      
