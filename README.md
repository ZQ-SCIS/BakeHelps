[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=453395&assignment_repo_type=GroupAssignmentRepo)
# :wave: is216-project

## 🤓 IS216 - GROUP 2 - BakeHelps

* Manikandan Isha | isham.2020@scis.smu.edu.sg
* Loo Jie Yi, Sheena | sheena.loo.2020@scis.smu.edu.sg
* Yeo Zi Qing | ziqing.yeo.2020@scis.smu.edu.sg
* Lim Shu Ying | shuying.lim.2020@scis.smu.edu.sg
* Cheung Kok Kit Jethro | kkcheung.2020@scis.smu.edu.sg


## 🤓 Project Overview ##

In this project, we developed a web application to allow aspiring bakers to use their leftover ingredients and provide them with recipes that they can work with to bake. Baking can be an intimidating process for aspiring bakers, with a list of ingredients they need to procure. There are also a lot of variations of the same ingredients, so they would not have to purchase more or have to waste ingredients. 
1. While there are a myriad of recipe websites available for aspiring bakers to search for recipes, it is often a hassle to sieve through various recipes before they can find a preferred recipe they can use(with the existing ingredients they have on hand)
2. This problem is best solved via web application as it caters to each individual. Each user will have to select the ingredients they have on hand to generate a recipe suitable for them.
3. Users can create their own accounts to have the choice of saving recipes that they like as they use the web application over a period of time. This enables them to refer back to the saved recipes if they would like to go back and use it again.
4. If users already have an idea of what they want to bake, our web application will search for the recipe, and automatically populate ingredients across all available recipes. 
5. If the user does not know what to bake but would like to try baking, they can type the ingredients they have at home to search for matching recipes. 
6. Based on the ingredients that the user listed, our web application will be able to suggest recipes that fit the selection of ingredients using Spoonacular’s API. If there are no results that match the listed ingredients, the search page will display the error “No matching recipe found :(”
7. Our goal is to make a web application that is attractive to aspiring bakers such that the obtaining for recipes based on the ingredients that they have on hand is fast and easy
8. Our site’s homepage will feature the ‘Recipes of the Day’ function and a search bar for recipes, which is a major part of the page. This recommends users across the platform a few randomized recipes that are standardized across all users (like the word of the day in a dictionary app) with easy access to look for recipes (which is the goal of the web application). Additionally, any user can access the search function of the web application regardless of whether they are registered or not.

## Architecture Diagram ##
![arch_dia](https://user-images.githubusercontent.com/89063862/141647830-284696d5-9333-492e-b09d-22b0c8a8a644.jpg)

## Navigation Diagram ##
![nav_dia](https://user-images.githubusercontent.com/89063862/141648011-270c7cf6-7dcb-49d6-8f01-49adff2eada6.png)

## Login Details (If you wish to use our existing Database) ##

### Account 1:

Email: sheena@gmail.com
Password: 123456

### Account 2:

Email: test@gmail.com
Password: test123

### Account 3:

Email: supremeleader@gmail.com
Password: sl1234

### Account 4:

Email: liuximu@shangchi.com
Password: 10rings

## 🤓 How to Install and Run Our Web Application (for Developers) ##
### What you will need:
* Visual Studio Code
* GitHub
* Firebase
* Node.js (for NPM and Vue.js)
* GitHub Desktop

### Phase 1: Installation of Applications
For Visual Studio Code, Node.js, and GitHub Desktop, follow the installation instructions in the default settings.

### Phase 2: Setting up a new database with Firebase (Skip if you wish to use our existing database)
#### FBP1: Basic Setup
1. Visit https://console.firebase.google.com/
2. Select 'Add Project'
![image](https://user-images.githubusercontent.com/89063862/141068269-2d470fe8-9b39-48bf-aa1a-5769543a3d81.png)

3. Enter any project name you prefer, and click 'Continue'
![image](https://user-images.githubusercontent.com/89063862/141068592-4f1631cd-d789-4812-b565-977ee3ac3e5a.png)

4. Turn off 'Enable Google Analytics for this project', and click 'Create Project'
![image](https://user-images.githubusercontent.com/89063862/141068793-5c38a8d4-f266-41d6-83d5-7ceceb7a8246.png)


5. Click 'Continue' when the project is ready.
![image](https://user-images.githubusercontent.com/89063862/141069544-86617268-1d20-4bf8-bad7-e919af2a4b6e.png)

#### FBP2: Get Config Details

6. Click on the 'Web' icon. ![image](https://user-images.githubusercontent.com/89063862/140893117-5cfe0212-af88-4628-a5f0-d525f5a7d463.png)
![image](https://user-images.githubusercontent.com/89063862/141069759-2d367eba-7704-4468-96f6-0a643eb139ce.png)

7. Register web app with any nickname you prefer, and click 'Register app'.
![image](https://user-images.githubusercontent.com/89063862/141069899-da0bb542-86bc-45e6-8ffc-d7c6dce14cbd.png)

8. Once done, select the 'Use a <script> tag' radio button.
![image](https://user-images.githubusercontent.com/89063862/141070004-0f98063f-7199-4260-a988-c67c19414dd6.png)

9. Take note of the following Firebase Configuration details in the ```firebaseConfig``` object in the existing code. You'll need to overwrite certain elements as seen in the screenshot to match the existing settings. (see green censored boxes)
![firebaseconfig](https://user-images.githubusercontent.com/89063862/141070531-0352d17b-b176-4543-8ba0-2d49b392e86f.png)

In the existing code:  
```
  const firebaseConfig = {
    apiKey: "(API Key Here)",
    authDomain: "(yourprojectname).firebaseapp.com",
    databaseURL: "https://(yourprojectname).firebaseio.com",
    projectId: "(your project id)",
    storageBucket: "(yourprojectname).appspot.com",
    messagingSenderId: "(yoursenderid)",
    appId: "(yourappid)"
  };
```
#### FBP3: Setup Database
 
10. Click 'Realtime Database' and click 'Create Database'
![image](https://user-images.githubusercontent.com/89063862/141070958-f01d4c48-da03-41f5-8a71-f04d5f99c474.png)
  
11. Select 'United States' as your Realtime Database Location, and click 'Next'
![image](https://user-images.githubusercontent.com/89063862/141071027-d70baa3e-d37b-49e1-aa1a-221af98b53df.png)
  
12. On security rules, select 'Start in test mode', and click 'Enable'
![image](https://user-images.githubusercontent.com/89063862/141071061-f5f4064a-7fb9-417a-942d-52ca7b821f02.png)
  
13. When done, we'll need to modify the security rules to enable database writing. Select the 'Rules' tab.
![image](https://user-images.githubusercontent.com/89063862/141605284-f414cbfd-a1e3-40db-96f7-718012fd7a12.png)

14. Edit the following rules to 'true' to enable read and write without any time limit.

Before:
  ![image](https://user-images.githubusercontent.com/89063862/141605340-079788bb-3bf4-4cde-8c72-8eb119f8311a.png)
After:
  ![image](https://user-images.githubusercontent.com/89063862/141605348-ed25cd49-804f-41af-91c0-ed1705aa9100.png)
15. Select 'Publish' once you are done.
 
#### FBP4: Set up Authentication
  
16. Click on 'Authentication' on the side menu
![image](https://user-images.githubusercontent.com/89063862/141612787-350ecbfc-59d9-43ff-be8e-5f0dbc2f2a79.png)

17. Click 'Get Started'
![image](https://user-images.githubusercontent.com/89063862/141612825-c0af3882-961e-4571-9b3e-3fada719ba99.png)

18. Select 'Email/Password'
![image](https://user-images.githubusercontent.com/89063862/141612847-5f0507be-11e8-4a3f-8dab-46816409a886.png)

19. Enable Email/Password sign in and Click 'Save'
![image](https://user-images.githubusercontent.com/89063862/141612868-3c79a7ad-01fc-4adb-8539-c4f0e154dba4.png)

20. The process is complete.
  ![image](https://user-images.githubusercontent.com/89063862/141612931-3c3b24a4-bf22-4e35-ba7f-e3b2c081421e.png)

  
### Phase 3: Setting up Node.js NPM  
#### Before deploying:
##### Re-direct to bakehelps vue-cli project
```
cd bakehelps
```

##### Project setup
```
npm install
```

If you wish to use your newly created Firebase database from Phase 2, modify the code in step 9 of FBP2 at '/src/App.vue'.
  
#### To deploy:
##### Compiles and hot-reloads for development
```
npm run serve
```

##### Compiles and minifies for production
```
npm run build
```

##### Lints and fixes files (Optional)
```
npm run lint
```

##### When the deployment is successful, launch either one of these URLs that will be shown with the load success message:
  <img width="197" alt="runningat" src="https://user-images.githubusercontent.com/89063862/141675219-73e71bbe-93be-45d2-84e2-0bbbf0495625.png">

* Local: http://localhost:8080/
* Network: http://192.168.1.128:8080/

## 🤓 How to Use Our Web Application (for Visitors to our Website) ##
* To begin, the user will key in their email address and password in the Log In page and click on the Login button. If they do not have an account, they will need to sign up. They will be then be directed to the Home Page. 
* On the search bar, the user gets to search based on recipes or names of ingredients. 
* After typing in the search bar and when the user clicks on the submit button, the user will be redirected to the explore recipes page. The explore recipes page has a similar feature to the home page, namely the one that allow users to search by recipe or ingredients. 
* Cards of different results with dietary restrictions will be shown. Some of the examples are Cake Balls, Cake Pops, Cake Shake and more. Users can add/remove their saved recipes from that page too.

** Since it is difficult to find a recipe that fully matches the set of ingredients that a user would key in, the cards would show the missing ingredients as well. For example, when a user searches for Chocolate and Egg, it is insufficient to find a recipe with just these ingredients. Therefore, the cards would display missing ingredients as well.
* When the user wants to know more about the recipe, the user will have to click on 'More details' of that specific recipe.
* An external details page will show all the information such as the image of the recipe, dietary restrictions, preparation information, ingredients and instructions. If the user needs additional information, the user can also click on the link to the source button located at the bottom which will display an external page.
* If the user likes a recipe, the user could press the 'Bookmark' button to save the recipe in the list. To remove, the same button can be pressed if it is already added.
* The 'Saved Recipes' page also enables users to view their saved recipes. Users can remove their saved recipes from that page too.
* On the 'Profile' page, the user has the option to change the password and Log Out of their account.
  
Features that require Logging In: Saving of Recipe, Profile Page and Changing Password.
  
## Figma Prototype ##
  
### Web Version:
https://www.figma.com/proto/GunUeikKdngc8HvRrf1gNs/Web-App-II-team-library?node-id=339%3A176&scaling=scale-down&page-id=313%3A2&starting-point-node-id=339%3A176

### Mobile Version:
https://www.figma.com/proto/GunUeikKdngc8HvRrf1gNs/Web-App-II-team-library?node-id=778%3A2329&scaling=min-zoom&page-id=777%3A243&starting-point-node-id=778%3A2329
