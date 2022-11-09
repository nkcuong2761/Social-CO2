# Social CO2 
by **Khanh Pham, Tung Tran, Cuong Nguyen, Minh Bui**
Last updated: 10/21/2022

## Table of contents
[Getting started](#getting-started)

[System Design Proposal](#system-design-proposal)

## <a id="getting-started"></a> Getting started

Step 1: Go to the project directory. To install dependencies, libraries, etc. run the following command

```
npm install
cd functions 
npm install
cd ..
sudo npm install -g firebase-tools
```

Step 2: Setup credentials for HTTPS server.

*Note: This is important for Bluetooth connection*

```
npm install -g mkcert
mkcert create-ca
mkcert create-cert
mkdir .cert && mv *.crt .cert/ && mv *.key .cert/
```

Step 3: 
- If start Firebase Emulator

```
firebase login
firebase init emulators
firebase emulators:start
```
Choose Firebase Hosting and Functions options
when running `firebase init emulators`.
Then open links for function logging and firestore view 
as instructed in terminal.

- Else if deploy directly to Firestore

Uncomment `connectFirestoreEmulator(db, 'localhost', 8080);` in file `dataToFirebase.js`, then run

```
firebase login
firebase deploy --only functions
firebase deploy --only firestore:rules
```

Step 4: Start the project locally with the following command

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.




# <a id="system-design-proposal"></a> System Design Proposal

### Table of contents
1. [Overview](#1-overview)
3. [Goals and Non-goals](#2-goals-and-non-goals)
4. [Our Features](#3-features)
5. [System Design](#4-system-design)
5. [Team Processes](#5-team-processes)
5. [Reflection](#6-reflection)
5. [Milestones](#7-milestones)

## <a id="1-overview"></a>1. Overview
### The problem
-   The waves of Covid-19 raise concerns about air quality in closed spaces. Now, some people carry small CO2 sensors to check the air quality on subways, airplanes, grocery stores, etc. However, the sensors are $250 each and not everyone can afford them. 
-   Our client, Professor Deborah Sills, is interested in the air quality of closed spaces such as classrooms, gyms, restaurants, etc.
> "_I want a map that anyone can access on their mobile devices. This map will show CO2 data at any chosen location and timeframe._"

### Current equipment and supported app
- **Aranet4** is a sensor that collects various data such as temperature, humidity, atmosphere pressure, and CO2. 
- The Aranet4 sensor can store up to 7 days of data. 
- The Aranet 4 sensor can connect to a mobile app through Bluetooth and the app will feature the data with line charts of CO2 levels versus the time of the day. Through the app, the data can be exported into a CSV file. 

<img src="https://i.ibb.co/TLCMZkS/Screen-Shot-2022-09-24-at-4-26-54-PM.png">

*Aranet4 sensor and Aranet4 app displayed CO2 data, and the different trends of CO2 graphs*

### Current solutions
- Our client has 12 sensors. She gave them out to her students and other faculties interested in the air quality.
- To know the CO2 level of any location, users need to carry the sensor to a location and record the CO2 level.
- The sensors connect to an Aranet4 app through Bluetooth. The app will get the stored data to create a line chart of CO2 levels versus the hourly time. 

### Proposed solution
- Place the Aranet4 sensors at 12 locations at Bucknell University. 
- Get 7-days-stored data (sensor ID, CO2 level with timestamp, and timestep) from the Aranet4 sensors and store them on a Firebase server.
- The Firebase server processes the stored data (sensor ID, CO2 level with timestamp, and timestep) into the hourly CO2 data for each day of the week.
- Our website creates a map with the processed data from the Firebase server. The map will feature the estimated CO2 levels and hourly graph based on historical CO2 data of the past weeks. The CO2 levels are color-coded. For instance, green for good, yellow for average, and red for bad.
- Users can access our website on their mobile devices. With all the provided CO2 information of the 12 locations, they can decide if they want to be in that space.


## <a id="2-goals-and-non-goals"></a>2. Goals and Non-Goals
### Our users
-   People who care about the air quality of their surroundings.
-   People who can not afford a $250 sensor.
-   People who have access to mobile devices and know how to use one.
    
### Goals
- Users can access our website on their mobile devices.
- Users can access the hourly estimated CO2 levels of different geographic locations based on the recorded data of the previous weeks.
- Users can access the hourly trend CO2 graph of the day.

### Non-goals
-   Users cannot manually input CO2 level data from their personal Aranet4 sensor.
-   The website will not provide in-real-time CO2 data.
-   Users cannot create their own account.

## <a id="3-features"></a>3. Our Features
_*Note: The marked numbers on each image are to indicate each features that we are offering on our website._
| Screens | Details |
|---|---|
| <img src="https://i.ibb.co/tbQJt5f/Social-CO2.png" alt="sketches" width="700px"> | 1. Location markers:<br>- Represent different locations that have the CO2 data.<br>- Opaque-colored circles underneath the markers represent the critical CO2 level of the area during that time.<br><br>  Red circle: High CO2 level (above 1400 ppm)<br>  Yellow circle: Medium CO2 level (1000 to 1400 ppm)<br>  Green circle: Low CO2 level (below 1000 ppm)<br><br>2. Search bar:<br><br>- Allow users to search for a specific location by its name. |
| <img src="https://i.ibb.co/tbQJt5f/Social-CO2.png" alt="sketches" width="700px"> | 3. Average CO2 data:<br>- Represents the average CO2 level during the 1-hour time frame.<br>- For instance: if the user is accessing this website at 2:45 pm, this number represents the average CO2 level of the selected location from 2 pm to 3 pm.<br>- The number is calculated based on past data taken also during that day of week and time.<br>- Different text colors represent different critical levels of CO2.<br><br>4. A tooltip explaining the CO2 data’s meaning to the users.<br><br>5. CO2 Levels Throughout The Day graph’s filter:<br>- Dropdown menu showing each day in the week.<br><br>6. A tooltip explaining the meaning of the graph to the users (see 7).<br><br>7. Daily CO2 bar graph:<br>- Each bar represents the average CO2 level during a 1-hour time frame of that day.<br>- The bars are color-coded based on the critical CO2 level.<br>- The highlighted bar represents the current time frame.<br><br>8. See Full Graph button:<br>- Take users to a second screen showing a more detailed graph, with ventilation analysis, prediction, and recommendations for users. (This screen will be developed in the future) |

## <a id="4-system-design"></a>4. System Design
<img src="https://i.ibb.co/HdyndWf/Social-CO2-system-design.png" alt="System Design">

### The components
1. **Firebase Firestore:**
- [Firebase Firestore](https://firebase.google.com/docs/firestore) is where our database will be located:
	- Receives CO2 data in the format: device_id, time_latest_measurement, interval, CO2 level array.
	- Computes and provides average hourly CO2 data for every day of the week for visualization.
- We chose Firebase Firestore because:
	- NoSQL speeds up querying since our queries do not involve many relations or logic. 
	- Focused as a backend as a service platform (BaaS), which is most suitable for our purposes. We do not need to have a high degree of freedom such as installing programs on the server so we’re not using IaaS and PaaS. We also only need limited cloud function, so SaaS is not necessary.
	- Easy to use / previous familiarity 
	- Free for our use


2. **WebBLE:**
- The [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) provides the ability to connect and interact with Bluetooth Low Energy peripherals. We use Web BLE to connect to Aranet4 and get CO2 data:
- Connect to Aranet4 and get CO2 data:
	- Upon pairing, the device services will be available. Each service will contain characteristics that we can write to or read from. The characteristics we’re interested in are: 
		- ARANET_SET_HISTORY_PARAMETER_UUID: Write to this characteristic to request data from Aranet4
		- ARANET_SENSOR_LOGS_UUID: Read from this characteristic to get requested data. 
	- Pushing on the “Get all Bluetooth info” will prompt the user to select an Aranet4 device. Upon selection, the app will request all CO2 data from ARANET_SET_HISTORY_PARAMETER_UUID and read all packets from ARANET_SENSOR_LOGS_UUID until all measurements are read.
- We chose WebBLE because it is currently the only choice we have for Bluetooth connection on browsers that we know of.

<img src="https://lh3.googleusercontent.com/wBthHFBMGfNjPKrqwlyQ8x_adAhBEAAO4dTfb2_OeWz1frT78kaG6dD1zqKfktmG0_Z2fMBtGUbhzfSbISyXQFbbnrwgF7BKdoTqVg1YhtK8StDsvFw4_4JtyHkDHF7nONGn9MDBLLyqCcR519SOZ1env5JyqobWpCQClgYAQRfu707SZ9F0QTx97A" alt="demo">

_Getting CO2 data through Bluetooth pairing with Aranet4 sensor_

3. **React:**
- Integrate back-end integration (such as Bluetooth connection, Firebase Firestore, and Mapbox integration) into the front-end.
- We chose React because:
	- Component-based nature allows us to reuse code and build rich user interfaces. 
	- Cross-platform support.
	- UI-focused designs, and template designing made easy.
	- Good support community
	- Previous familiarity

4. **Mapbox:**
- Mapbox is a location data platform for mobile and web applications:
	- Map: The map is from Mapbox APIs, but we use a third-party library, react-map-gl, which is a React wrapper for Mapbox APIs. We also implement a React hook, useEffect(), which contains a function that asks for the user’s location before the web app renders the map to the screen.
	- Markers on locations: We use react-map-gl library to implement the markers. We also add an event handler, onClick() event, to the markers. When the user clicks on the marker, a state variable will receive information about that location (such as CO2 level, name, image, etc.) That information will be sent to the location card’s React component via props.
	- Location card: Location card is a React component. We design the location card with Figma. Then, we export the CSS code from Figma and put it in our code base to add styling to the card. We also implement a React hook, useRef(), so that when the user clicks outside of the card, the card will disappear. For screen’s sizing responsiveness, we use flexbox.
- We chose Mapbox APIs because:
	- Mapbox is more affordable than our other options Google Maps. In every area, Mapbox is significantly more affordable than Google Maps APIs. For example, after a free trial, Mapbox charges $0.60 - $1.00 per 1,000 requests for its Static Maps, while Google Maps charges $2 per 1,000 requests for the same service.
	- Mapbox also provides other benefits such as very fast loading, relative ease of customization, and extensive documentation.
<img src="https://lh3.googleusercontent.com/4Dtvt0KaD-V-EiS5vbvXNOJmXcstZFIVrdLGkxHU-BHHgKMA3qRe3tfUsDflXjbvYpM9XoO8-k7C0XAuoxkq_uHErEeqWBaoWpqUKRJtn4atI-WHqJZocbpm2Hj6ofDr1Ej6NLe2Tw41l2jfTWVO3AoIx6kMSGauhWw0_qR2nn78ih1s2KAa7AQHuA" alt="demo">

_The current use of Mapbox and React in our web application_

## <a id="5-team-processes"></a>5. Team Processes
- **Product Manager:** Khanh Pham
The team, with the Product Manager as the main communicator, meets the client to discuss features. The product Manager fills in customer requests into Product Backlogs.
- **Scrum Master:** Cuong Nguyen 
All members of the team selects which item to include in a one-month Sprint (timeline will be updated as the team integrates the Product.) All members turn these items into actionable tasks and assign responsibilities. Then, Scrum Master will facilitate these discussions and ensure the team follows the processes.
- **Tech Lead:** Tung Tran
Before working on any features, the assigned members will conceptually document it. Tech Lead will then integrate the document into a Main file on our Gitlab repository to keep track of the team processes. Done features will be passed to Tech Lead for merging. 
- **Developers:** Everyone (Minh Bui, Cuong Nguyen, Khanh Pham and Tung Tran)
Each team member will be responsible for their assigned tasks and collaborate with each other, especially when any problems arrive. Done features will need to be tested and updated by the assigned member(s).

### Agile Methodology
- We used the Trello Board to manage our Scrum process. Trello is a project management tool that provides collaborative and board-based features. We have multiple sections in the Trello board to divide our tasks: Backlog, Dev, Code Review, Testing, and Done. Each task in the sections includes the assigned person and deadlines to track our progress. 
- We have regular communications on Facebook Messenger. If urgent, can be done through SMS or calls.
- We have a mandatory meeting once per week. Before coming into this meeting, we ask everyone to be prepared such as looking through everyone’s timeline for assigned tasks, coming up with questions or issues to be addressed in the meeting, etc. 
<img src="https://lh4.googleusercontent.com/PcnIHXjMFWBWFQeCClmPOiNhedoJ6JqeeqM4bJfwjuoIDg83uKc4eFmpWpdWtVjV__tXNdX5l1ji_eA4tbPo_uvkyh3Diqxx0TF_yy0Ju7BkMpQfvlSB1gPdG84NXQ6gy4VZmUgLKplw2q45rwgySZJDZ3FN3lsBiRG8dyyh2RGwhE-4mCCf6GioTw">

_Screenshot of our Trello board_
- **Backlog:** Sprint Backlog. Each sprint will have multiple tasks, which will then be distributed to 3 categories: Dev, Code Review and Testing
- **Dev:** Software development
- **Code Review:** Review code, merge request and git conflicts
- **Testing:** Test out app functionality
- **Done:** Finished tasks

### Communication with clients
- We showed our client, Professor Sills, the demo of our website and discussed what each feature do. We also discussed how we are getting the CO2 data and how the CO2 data along with the time interval will be calculated to display on the website.
- Our client insisted on getting in-real-time data. However, we can not afford the Arantet4 routers to constantly pushing the CO2 data from the Aranet4 sensors to the internet. Our client was very understanding for our limitations.  

### Burndown chart: 
- We use the Burndown Chart plugin for Trello to display our progress as below.
- We are expecting to finish our alpha version on November 3rd, 2022.
<img src="https://lh6.googleusercontent.com/QHpGZ1hsCIHtkErmHEj_K6U25cQcKDCiSvU0CMK-R0Ut98hEQdmVjbgcOJ9NAAnWEVWLSqmtwMzyHsFVoCetEXHnDzzxrsawA72h9dG-XZ3NIQuoQUzN5Aq_2WPmm0-RjP6ywHfvtk14wYj7s1KfCEtM09waZAFXeMWFD4QssIC5j4KGTsZlQ5yDiQ">

_The recorded burndown chart based on the 3-sprint periods so far_

## <a id="6-reflection"></a>6. Reflection
### What did we enjoy?
- The problem we are trying to solve:
If successful, our product can inform Bucknell students, faculty members and other personnel of CO2 levels at various locations across campus. This is especially beneficial to people who are conscious about the amount of CO2 and ventilation in buildings in times of Covid. So the impact of our project could be great.
- Learning new technology:
None of us have ever learned about bluetooth technology, so learning about its capabilities and limitations is exciting.
We also have never used any map APIs. It is a good opportunity to learn about different map APIs such as Mapbox and Google Maps, and weigh our options.
- Brushing up on technologies we know:
Some members of our team have had experience with React and Firebase, so this project is a good place for us to brush up on these technologies. Interestingly, none of us have ever tried integrating them together, so this project is a great way to do so.
### Challenges
- Challenge with Project Scope: 
One of the challenges that we faced with this project is that we cannot update CO2 level data in real time. In order for our database to receive new data, someone, perhaps a user, must be in proximity to a sensor, use our app to connect to the sensor via Bluetooth, and send the sensor’s CO2 data to our Firebase server. So, our server will not have any data until a user is close to a sensor and uses our app to send its data to the database. This will remain as a constraint of our project scope.
- Team Processes: 
It was challenging for us to allocate sufficient time each week to work on the project. As a result, some assigned tasks were a couple of days late. However, we are always keeping each other accountable and checking in if there is a need for reassigning tasks. We are still on track with the project, and confident to deliver the promised features in our project scope. 
- Technical Challenges:
	- Frontend: 
		- Search feature of Mapbox.
		- Responsive design feature: Location card can go full screen or half screen on mobile devices.
	- Backend:
		- Firebase Firestore integration.
		- Not supporting browsers on PCs currently.
		- Not all mobile browsers support Bluetooth connection.
<img src="https://i.ibb.co/MnWjZfL/Screen-Shot-2022-10-21-at-12-25-59-PM.png" >

_Chart indicates which Mobile Web Browsers support Bluetooth connection_

_*Note that the technical challenges are future features and tasks in our next phase of the project. It is just a matter of learning and implementing. Except for the limited support for Bluetooth connection among different mobile web browsers, that will stay as a constraint of our project._

## <a id="7-milestones"></a>7. Milestones
We are reaching **Milestone 3** as of now.

**Start Date: Sep 12, 2022**

-   _Milestone 1 - System Design paper (Sep 12, 2022 - Sep 23, 2022):_ We set our goals and solutions before conducting any technical design or programming. This way we can follow the right path from beginning to end.
    
-   _Milestone 2 - First progress report (Sep 24, 2022 - Oct 14, 2022):_ By this time we will have our User Interface mockups ready, and finish our core frame for development.
    
-   _Milestone 3 - Second progress report (Oct 15, 2022 - Nov 4, 2022):_ By this time we will have finished creating the app prototype for conducting usability studies. This is useful for the number of iterations on our product design. The frontend code will be fully developed, and we will have laid out a database and the backend logic for storing our app data.
    

- _Milestone 4 - Project deliverable (Nov 5, 2022 - Dec 2, 2022):_ Up until this point we will have our product fully ready for testing, with a Project Documentation being finalized for submission.
    
**End Date: Dec 2, 2022**
