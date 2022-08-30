# DietXApp with React Native
A simple diet app developed using React Native and TypeScript. 

## Features

- You can search for food and drinks and see their nutritional values without logging in to the application. 
- When registering for the application, you can optionally enter your weight, age, height, gender. In this way, the application calculates your daily calorie needs. 
- You can add what you consume daily from the search page. The app calculates the calories you take. The amount of carbohydrates, proteins and fats contained in your daily meals is also added to the homepage. 
- You can find the user you want by searching. When you go to the profile page, if the user entered, their body measurements and their registered rooms are shown to you. 
- You can create as many chat rooms as you want on the forum page. If you want, you can make the room private by entering a password for the room. 
- You have authority as an admin in the rooms you own. You can ban any user or remove this ban from the user. 
- Banned users cannot enter your room in any way. Also, if your room has a password, no one except you can join your room without entering the password. 
- You can update your profile information at any time on the profile page. 
- If you're the room's admin, the section where you can change room settings will be visible to you. Otherwise, you can only see members in the room. You don't have any authority. 

## Tools & Resources

- [API](https://developer.nutritionix.com/docs/v1_1)
- [Firebase](https://firebase.google.com/) for database
- [React Navigation](https://reactnavigation.org/) for page hierarchy
- [React Native Config](https://github.com/luggit/react-native-config) for `.env` files
- [Axios](https://github.com/axios/axios) for data fetching
- [Vector Icons](https://github.com/oblador/react-native-vector-icons) for icons
- [React Native Modal](https://reactnative.dev/docs/modal) for bottom screen
- [React Native Bouncy Checkbox](https://github.com/WrathChaos/react-native-bouncy-checkbox) for checkbox
- [React Native Progress Indicator}(https://www.npmjs.com/package/react-native-circular-progress-indicator) for circle progress bar in home page
- [React Native Image Picker](https://github.com/react-native-image-picker/react-native-image-picker) for select and upload images
- [React Native Formik](https://formik.org/docs/guides/react-native) for sign in/up
- [React Native Flash Message](https://github.com/lucasferreira/react-native-flash-message) for notifications

## Real Android Device ScreenShots

<div align='center'> 
<img src="https://user-images.githubusercontent.com/86911611/187496265-efc9a576-5c32-4961-a76c-9bf31b7472a3.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496353-621887e7-5e36-4567-bbe8-260f49ffee7b.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496494-d1f8f3f1-6fa1-4e86-99bc-1c847d294a52.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496538-37d93a70-da3a-4e96-938f-dd292042ced3.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496584-0af4a48e-8093-4933-857d-3c8aa520141a.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496676-ef7f4303-33a6-44eb-be29-fe60317a00d7.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496722-fa3942f1-993e-4110-8584-ea88f98907ab.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496766-48ec4414-aa07-45eb-bbdc-6797b689312b.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496798-468f8956-ebc0-4291-8f53-499815a82bf3.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187496858-d9d1ff86-6807-45a9-9c04-37053ac89943.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497182-d9d7705a-e234-4828-b346-e13ac40b02a2.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497217-7d95bd1b-9ac4-46b8-86d3-6f62ef9a1695.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497256-0edc2300-bbb8-4d00-892f-b18cf49c8bfe.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497285-5947c9d4-62d1-4c81-933e-7cbee832366d.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497336-ec386cac-cbf2-4319-95ee-26b46d8aa229.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497369-faa1dcb6-1bc2-4017-85d5-0f0491e1901c.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497412-21cc3d73-400e-48ea-b795-d9b87cd2677e.jpg" width="400" height="900" /><img/>
<img src="https://user-images.githubusercontent.com/86911611/187497475-2962bd0c-6ed9-4f70-a5f1-a9d602d788bc.jpg" width="400" height="900" /><img/>
</div>

## Installation

Clone this repository on your local machine.

```
git clone https://github.com/DogukanSakin/DietXApp-With-ReactNative.git
```

## Usage

Run the following commands in the project folder to install the project dependencies.

```
npm init
npm install
npx react-native start
```
These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

## To Run the Application
In the project directory you can run:

```
For Android Emulator: npx react-native run-android
```

```
For iOS Emulator: npx react-native run-ios
```
