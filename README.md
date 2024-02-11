To install:

npm install

To run:

npm run android

If there is any problem to run , change the kotlin version node_modules>@react-native>gradle-plugin>build.gradle.kts

plugins { version 1.7.10 }


If the app crashes on first build , then clean the gradle and run again.
To run the app: 

1. Go to the root directory of project.
2. Run the following commands
---> cd android 
---> ./gradlew clean
---> cd..
3. Run ---> npm run android
