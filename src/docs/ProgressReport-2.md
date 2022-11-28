# Social CO2 Progress Report 2
by **Khanh Pham, Tung Tran, Cuong Nguyen, Minh Bui**<br>
Last updated: 11/11/2022

## Table of contents
1. [Overview](#1-overview)
3. [Goals and Non-goals](#2-goals-and-non-goals)
4. [Our Features](#3-features)
5. [System Design](#4-system-design)
5. [Team Processes](#5-team-processes)
5. [Reflection](#6-reflection)
5. [Milestones](#7-milestones)

## <a id="1-overview"></a>1. Overview
### The problem
- Waves of Covid-19 infections raise concerns about air quality in closed spaces. Now, some people carry small CO2 sensors to check the air quality on subways, airplanes, grocery stores, etc. However, the sensors are $250 each and not everyone can afford them. 
- Our client, Professor Deborah Sills, is interested in the air quality of closed spaces such as classrooms, gyms, restaurants, etc. 
> "*I want a map that anyone can access on their mobile devices. This map will show CO2 data at any chosen location and timeframe.*" - Prof. Deborah Sills

### Current equipment and supported app
- **Aranet4** is a sensor that collects temperature, humidity, atmosphere pressure, and CO2 data. 
- The Aranet4 sensor can store up to 7 days of data. 
- The Aranet 4 sensor can connect to a mobile app through Bluetooth and the app will feature the data with line charts of CO2 levels versus the time of the day. Through the app, the data can be exported into a CSV file. 

<img src="https://i.ibb.co/TLCMZkS/Screen-Shot-2022-09-24-at-4-26-54-PM.png">

*Aranet4 sensor and Aranet4 app displayed CO2 data, and the different trends of CO2 graphs*

### Current solutions
Our client has 12 sensors. She gave them out to her students and other faculties interested in the air quality. To know the CO2 level of any location, users need to carry the sensor to a location and record the CO2 level. The sensors connect to an Aranet4 app through Bluetooth. The app will get the stored data to create a line chart of CO2 levels versus the hourly time (see Figure above). This approach limits the users to the people who have the Aranet4 sensor and the users must carry this sensor with them to know the CO2 data of any location. 

### Proposed solution
- Our website creates a map with the processed data from the Firebase server. The map will feature the estimated CO2 levels and hourly graph based on historical CO2 data of the past weeks. The CO2 levels are color-coded. For instance, green for good, yellow for average, and red for bad.
- Users can access our website on their mobile devices. With all the provided CO2 information of the 12 locations, they can decide if they want to be in that space.
- Place the Aranet4 sensors at 12 locations at Bucknell University. 
- Get 7-days-stored data (sensor ID, CO2 level with timestamp, and timestep) from the Aranet4 sensors and store them on a Firebase server.
- The Firebase server processes the stored data (sensor ID, CO2 level with timestamp, and timestep) into the hourly CO2 data for each day of the week.

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
**Note: The marked numbers on each image are to indicate each features that we are offering on our website.*
| Screens | Details |
|---|---|
| <img src="https://lh4.googleusercontent.com/ZlaxB9KnPAXYkRWSZgunQLe9-UnJj04GQzB84WoHeUIRx3rsdkUsQCQ-gNDsbyHOlChcYsNToQwKTkcFvo3jnf_ylYDmVr9Gk00Gy-Kavhme67O0TMnI_Pq2TPE859zyVjmVcd7y0xWLf5USdlzGllsdLb7VqeLtTtKVTQtdzyOg2rov7ppdZ9PVIbweVg" alt="sketches" width="700px"> | **1. Location markers:**<br>- Represent different locations that have the CO2 data.<br>- Opaque-colored circles underneath the markers represent the critical CO2 level of the area during that time.<br><br>  Red circle: High CO2 level (above 1400 ppm)<br>  Yellow circle: Medium CO2 level (1000 to 1400 ppm)<br>  Green circle: Low CO2 level (below 1000 ppm)<br><br>**2. Sidebar button:**<br><br>- Open sidebar menu. |
| <img src="https://lh3.googleusercontent.com/DUjcp_ZTkwx90ds7kKZDLmmgTxFwx6Zc6i220jItTkIm5hdRA30rFTPCIjOIgrU98zhDrmEU0P3XyCx5f-5ILk9cqhzqDacYqMuoEmEe-gGS1-KILE08NVJHk5xQDNxyI8x6yEs-_pjEHne3DuWHHRbdmJn0FzhouYkqa8pl_Ufe0NlvlPvYMLQHdhIjNw" alt="sketches" width="700px"> | **3. Sidebar menu:**<br>- Get Bluetooth info: Let users connect with nearby Aranet devices and upload their data to the cloud<br>- How to use SocialCO2: Guide users through the website<br>- About us: Information about the project and the team |
| <img src="https://lh3.googleusercontent.com/acNNTkDiaTQL7H9WavXDyn4o2b862r0kgUvAOxN8XSFnQX9oE4fm09ZOMuKU7WN9OYXlVdZ2NwOOf7-Ssn2ODWpv3a4iTtYJ6zMnJSCD0kaBZCvPzzCpY-lvNv2z8v0aTw1CQf2d7trKTE6frNdISHLT1bAHsePNuB8YnXhmlgtYJth8B7qHXJvDfwf4rw" alt="sketches" width="700px"> | **4. Average CO2 data:**<br>- Represents the average CO2 level during the 1-hour time frame.<br>- For instance: if the user is accessing this website at 2:45 pm, this number represents the average CO2 level of the selected location from 2 pm to 3 pm.<br>- The number is calculated based on past data taken also during that day of week and time.<br>- Different text colors represent different critical levels of CO2.<br><br>**5. A tooltip** explaining the CO2 data’s meaning to the users.<br><br>**6. CO2 Levels Throughout The Day graph’s filter:**<br>- Dropdown menu showing each day in the week.<br><br>**7. A tooltip** explaining the meaning of the graph to the users (see 7).<br><br>**8. Daily CO2 bar graph:**<br>- Each bar represents the average CO2 level during a 1-hour time frame of that day.<br>- The bars are color-coded based on the critical CO2 level.<br>- The highlighted bar represents the current time frame. |

## <a id="4-system-design"></a>4. System Design
### The components

<img src="https://i.ibb.co/02BQCcG/Social-CO2-system-design.png" alt="System Design">

*Integrated components of our Social CO2 website*

**Firebase Firestore:**

[Firebase Firestore](https://firebase.google.com/docs/firestore) is a flexible, scalable NoSQL cloud database where our data will be located:
- Receives CO2 data in the format: device_id, time_latest_measurement, interval, CO2 level array.
- Computes and provides average hourly CO2 data for every day of the week from raw uploaded CO2 data above (Cloud Function).
- Only allows read and create new operations, does not allow changing or deleting current data for everyone except admin.

We chose Firebase Firestore because:
- NoSQL speeds up querying since our queries do not involve many relations or logic. 
- Focused as a backend as a service platform (BaaS), which is most suitable for our purposes. We do not need to have a high degree of freedom such as installing programs on the server so we’re not - using IaaS and PaaS. We also only need the limited cloud function, so SaaS is not necessary.
- Easy to use / previous familiarity
- Free for our use

**Web Bluetooth API:**

The Web Bluetooth API provides the ability to connect and interact with Bluetooth Low Energy peripherals. We use Web BLE to connect to Aranet4 and get CO2 data.

Upon pairing, the device services will be available. Each service will contain characteristics that we can write to or read from. The characteristics we’re interested in are: 
- ```js
  ARANET_SET_HISTORY_PARAMETER_UUID
  ```
  Write to this characteristic to request data from Aranet4

- ```js
  ARANET_SENSOR_LOGS_UUID
  ```
  Read from this characteristic to get requested data. 
Pushing on the “Get all Bluetooth info” will prompt the user to select an Aranet4 device. Upon selection, the app will request all CO2 data from `‘ARANET_SET_HISTORY_PARAMETER_UUID’` and read all packets from `‘ARANET_SENSOR_LOGS_UUID’` until all measurements are read.

We chose WebBLE because it is currently the only choice we have for Bluetooth connection on browsers that we know of.

<img src="https://lh3.googleusercontent.com/SZxml7Eg6AXt8raIp4-D2D8RTrwc5W06jyxZ_K-0ofAwEyoxS5nUWL52g34phLm7xhaNrQa4MEpvmH6o19W2Jmud_zH4bSjfF3a4kz3WS_6FJq1UxAUDiyln-Y0up1Ysk3FuKCF_krfIX7GUHU09tE9iIA6XyiHDaZeHd0Zf4aT2GyUwBIsCTazSI4mtNQ" alt="demo">

*Getting CO2 data through Bluetooth pairing with Aranet4 sensor*

**React:**

Integrate back-end integration (such as Bluetooth connection, Firebase Firestore, and Mapbox integration) into the front-end.

We chose React because:
- Component-based nature allows us to reuse code and build rich user interfaces. 
- Cross-platform support.
- UI-focused designs, and template designing made easy.
- Good support community
- Previous familiarity

**Mapbox:**

[Mapbox](https://www.mapbox.com/) is a location data platform for mobile and web applications:
- Map: The map is from Mapbox APIs, but we use a third-party library, react-map-gl, which is a React wrapper for Mapbox APIs. We also implement a React hook, useEffect(), which contains a function that asks for the user’s location before the web app renders the map to the screen.
- Markers on locations: We use react-map-gl library to implement the markers. We also add an event handler, onClick() event, to the markers. When the user clicks on the marker, a state variable will receive information about that location (such as CO2 level, name, image, etc.) That information will be sent to the location card’s React component via props.
- Location card: Location card is a React component. We design the location card with Figma. Then, we export the CSS code from Figma and put it in our code base to add styling to the card. We also implement a React hook, useRef(), so that when the user clicks outside of the card, the card will disappear. For screen’s sizing responsiveness, we use flexbox.

We chose Mapbox APIs because:
- Mapbox is more affordable than our other option, Google Maps. In every area, Mapbox is significantly more affordable than Google Maps APIs. For example, after a free trial, Mapbox charges $0.60 - $1.00 per 1,000 requests for its Static Maps, while Google Maps charges $2 per 1,000 requests for the same service.
- Mapbox also provides other benefits such as very fast loading, relative ease of customization, and extensive documentation.
<img src="https://lh5.googleusercontent.com/qDVE_ACw7irE8ARqYD11D388ScHAZwTmTTFe4HgDLIm0FaroJbh_J53lignNI0bopUL9E7xf6AFeguo6DObG-GeFX1aZJ2SvIW0LV_Kf8e3pWC6W4wzjDHu9WFyyfm3l1hNmX-kvGhtxr9PihsHjSI1EKuNQuoY3gsxUeliIXsNnzqucCQakB1j6L1rY8A" alt="demo">
*The current use of Mapbox and React in our web application*

## <a id="5-team-processes"></a>5. Team Processes
### Roles and responsibilities
**Product Manager:** Khanh Pham
The team, with the Product Manager as the main communicator, meets the client to discuss features. The product Manager fills in customer requests into Product Backlogs.

**Scrum Master:** Cuong Nguyen
All members of the team selects which item to include in a one-month Sprint (timeline will be updated as the team integrates the Product.) All members turn these items into actionable tasks and assign responsibilities. Then, Scrum Master will facilitate these discussions and ensure the team follows the processes.

**Tech Lead:** Tung Tran
Before working on any features, the assigned members will conceptually document it. Tech Lead will then integrate the document into a Main file on our Gitlab repository to keep track of the team processes. Done features will be passed to Tech Lead for merging. 

**Developers:** Everyone (Minh Bui, Cuong Nguyen, Khanh Pham and Tung Tran)
Each team member will be responsible for their assigned tasks and collaborate with each other, especially when any problems arrive. Done features will need to be tested and updated by the assigned member(s).

### Agile Methodology
We used the Trello Board to manage our Scrum process. Trello is a project management tool that provides collaborative and board-based features. We have multiple sections in the Trello board to divide our tasks: Backlog, Dev, Code Review, Testing, and Done. Each task in the sections includes the assigned person and deadlines to track our progress. 

We have regular communications on Facebook Messenger. If urgent, can be done through SMS or calls. We have a mandatory meeting once per week. Before coming into this meeting, we ask everyone to be prepared such as looking through everyone’s timeline for assigned tasks, coming up with questions or issues to be addressed in the meeting, etc. 

<img src="https://lh5.googleusercontent.com/xohEyg3IxyeAqCtU567N05bxJU839u3d3Z7vBVLCLWx2flM35I4tKFid6hsdkAQkcHp33L2yOe7OQ5ayeWBPPiE98Wklk4lkOBUifYmhfUoVq0nW8FBYWtDpXR9B6topesrrze4b1FimJ4Z_FxVoPD_bDepmokvWp3LX5QNJiFHJ-W4xGLKsX5f40cLYxQ">

*Screenshot of our Trello board*
- **Backlog:** Sprint Backlog. Each sprint will have multiple tasks, which will then be distributed to 3 categories: Dev, Code Review and Testing
- **Dev:** Software development
- **Code Review:** Review code, merge request and git conflicts
- **Testing:** Test out app functionality
- **Done:** Finished tasks

### Communication with clients
Due to our packed schedule, it was hard to have a meeting with our client, Professor Sills, prior to this Progress Report 2’s due date. We will be having a meeting with her to show the alpha version of our website. We will walk our client. We showed our client, Professor Sills, the demo of our website and discussed each feature. We also discussed how we are getting the CO2 data and how the CO2 data along with the time interval will be calculated to display on the website. Lastly, our client insisted on getting in-real-time data. However, we can not afford the Arantet4 routers to constantly push the CO2 data from the Aranet4 sensors to the internet. Our client was very understanding of our limitations. 

### Burndown chart
- We use the Burndown Chart plugin for Trello to display our progress as below.
- We are expecting to finish our final version on November 18th, 2022.

<img src="https://lh6.googleusercontent.com/7W1-MVV4u4_hqmYOHcPHwiVD4M_2axYdMSuVWXHzPo0Nj3CU88eXwrGbqTMdBMo4fUySwwqQpdgV8DuFPDQIdsD25tBH3WzD2iRRM7ir-peISf-tf76pX1_UEdhtF-0JDvV-L3-vr86nZqRbmn71A1Xm3wsb2AcbQGHRsR9pP9l537RWmA61xTZ9Mntu1A">

*The recorded burndown chart so far*

## <a id="6-reflection"></a>6. Reflection
### Our progress
For our first progress report, we created the map, added location markers for our frontend, and connected the Aranet4 data to computers and mobile devices to get the CO2 data. As of this second progress report, we successfully sent and aggregated 7-day hourly CO2 measurements on Firestore. We also set up basic security measures for Firestore. This marks the initial completion of our backend. We were able to draw the hourly CO2 graph using synthetic data, so we developed our front end to the proximal goal. Next, we need to bridge the backend and frontend together. We will also conduct a usability study based on the feedback of our client and some randomly chosen participants. After making necessary adjustments, we will choose a domain to host our website which allows our client and users to use the product. 
### What did we enjoy?
We enjoyed solving the problems of this project. We imagine that when this project is successfully launched, our product can inform Bucknell students, faculty members, and other personnel of CO2 levels at various locations across campus. This is especially beneficial to people who are conscious about the amount of CO2 and ventilation in buildings in times of Covid. 
None of us have ever learned about Bluetooth technology, so learning about its capabilities and limitations is exciting. Similarly, we have never used any map APIs either. This project gives us the opportunity to learn about different map APIs such as Mapbox and Google Maps, and weigh our options. Some members of our team have had experience with React and Firebase, so this project is a good place for us to brush up on these technologies. Interestingly, none of us have ever tried integrating them together, so this project is a great way to do so.

### Challenges
One of the challenges that we faced with this project is that we cannot update the CO2 level data in real time. In order for our database to receive new data, someone, perhaps a user, must be in proximity to a sensor, use our app to connect to the sensor via Bluetooth, and send the sensor’s CO2 data to our Firebase server. So, our server will not have any data until a user is close to a sensor and uses our app to send its data to the database. This will remain a constraint of our project scope.
As for our team processes, it was challenging for us to allocate sufficient time each week to work on the project. As a result, some assigned tasks were a couple of days late. However, we are always keeping each other accountable and checking in if there is a need for reassigning tasks. We are still on track with the project, and confident to deliver the promised features in our project scope. 
As for our technical side, it was challenging to learn and implement our design based on our mock design in Figma. The CO2 graph took us a while to integrate with our synthetic data. We are scaling down to prior all the necessary features to deliver a functional and meaningful product before getting into other details. Therefore, we decided on the search bar and created a form for our client, Professor Sills, to interact with in our stretch goals. The limited support for Bluetooth connection among different mobile web browsers or IOS devices will stay as a constraint of our project. 

<img src="https://i.ibb.co/MnWjZfL/Screen-Shot-2022-10-21-at-12-25-59-PM.png" ><br>
*Chart indicates which Mobile Web Browsers support Bluetooth connection*

## <a id="7-milestones"></a>7. Milestones
We are reaching **Milestone 3** as of now.

**Start Date: Sep 12, 2022**

-   *Milestone 1 - System Design paper (Sep 12, 2022 - Sep 23, 2022):* We set our goals and solutions before conducting any technical design or programming. This way we can follow the right path from beginning to end.
    
-   *Milestone 2 - First progress report (Sep 24, 2022 - Oct 14, 2022):* By this time we will have our User Interface mockups ready, and finish our core frame for development.
    
-   *Milestone 3 - Second progress report (Oct 15, 2022 - Nov 4, 2022):* By this time we will have finished creating the app prototype for conducting usability studies. This is useful for the number of iterations on our product design. The frontend code will be fully developed, and we will have laid out a database and the backend logic for storing our app data.
    

- *Milestone 4 - Project deliverable (Nov 5, 2022 - Dec 2, 2022):* Up until this point we will have our product fully ready for testing, with a Project Documentation being finalized for submission.
    
**End Date: Dec 2, 2022**