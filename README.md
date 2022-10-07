# Social Ventilation 
by **Khanh Pham, Tung Tran, Cuong Nguyen, Minh Bui**
Last updated: 9/24/2022

## Table of contents
[Getting started](#getting-started)

[System Design Proposal](#system-design-proposal)

## <a id="getting-started"></a> Getting started

Step 1: Go to the project directory. To install dependencies, libraries, etc. run the following command

```
npm install
```

Step 2: Setup credentials for HTTPS server.

*Note: This is important for Bluetooth connection*

```
npm install -g mkcert
mkcert create-ca
mkcert create-cert
mkdir .cert && mv *.crt .cert/ && mv *.key .cert/
```
	

Step 3: Start the project with the following command

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## <a id="system-design-proposal"></a> System Design Proposal

### Proposal's table of contents
1. [Overview](#1-overview)
3. [Goals and Non-goals](#2-goals-and-non-goals)
4. [Proposed solution](#3-proposed-solution)
5. [Milestones](#4-milestones)

### <a id="1-overview"></a>1. Overview
#### The problem
-   The waves of Covid-19 raise concerns about air quality in closed spaces. Some people carry small CO2 sensors to check the air quality on subways, airplanes, grocery stores, etc.
-   The sensors are $250 each and not everyone can afford them.
-   Our client, Professor Deborah Sills, is interested in the air quality of closed spaces such as classrooms, gyms, restaurants, etc.
> "*I want a map that anyone can access on their mobile devices. This map will show CO2 data at any chosen location and timeframe.*"

#### Proposed solution
-   Get data from the CO2 sensor
-   Create a map on a website or an app
-   Send the CO2 data to the map
-   The map will show the color-coded range of CO2 levels. For instance, green for good, yellow for average, red for bad.

#### Current equipment and supported app
-   The sensors are **Aranet4**. There are 12 of them to be located throughout Bucknell University’s campus.
-   They use Bluetooth to connect to mobile devices
-   Aranet4 has an app to collect various data such as temperature, humidity, atmosphere pressure, and CO2. We only focus on CO2 data for this project.
-   The sensors store up to 7 days of data.
-   This app provides line charts of CO2 levels versus the time throughout the day.
-   The data can be exported into a CSV file.

<img src="https://i.ibb.co/TLCMZkS/Screen-Shot-2022-09-24-at-4-26-54-PM.png">

### <a id="2-goals-and-non-goals"></a>2. Goals and Non-Goals
#### Our users
-   People who care about the air quality of their surroundings
-   People who can not afford a $250 sensor
-   People who have access to mobile devices and know how to use one
    
#### Goals
-   Users can download the app or access the website on their mobile device.
-   A map in the app/website will display CO2 levels of different locations at the current time
-   Users can tap on a location for an hourly trend CO2 graph of the day
-   Users can decide if they want to be in that location based on the estimated CO2 level.

#### Non-goals
-   Users cannot upload CO2 level data of their current location
-   The app/website will not provide in-real-time CO2 data
-   Users cannot create their own account
    
#### Current solutions
-   Our client has 12 sensors. She gave them out to her students and other faculties who were interested in the air quality.
-   To know the CO2 level of any location, users need to carry the sensor to a location and record the CO2 level
-   The sensors connect to an Aranet app through Bluetooth. In a close distance, the app will get the stored data to create a line chart of CO2 levels versus the hourly time. Therefore, users need their phone next to the sensor to see the CO2 level trend of the day.

#### Diagram of current solution
**Current Technical system:**
-   Sensor sends data to the Aranet4 app through Bluetooth.
-   The Aranet4 app displays data and graphs based on the data.

<img src="https://i.ibb.co/DpC1NKP/Screen-Shot-2022-09-24-at-4-01-37-PM.png">

**Current User story:**

<img src="https://i.ibb.co/fnrQsZ3/Screen-Shot-2022-09-24-at-4-05-27-PM.png">

-   If the user wants to know the daily trend CO2 level of any location:
	-   Users must be at the location.
	-   That location must have installed and set up the Aranet4 sensor to collect and store data.
	-   Users need the Aranet4 app on their mobile devices to access the CO2 data and graph.
-   If the user want to know the current CO2 level:
	-   Users must have the Aranet4 sensor.
	-   User will carry the sensor to the location, so the sensor can measure the CO2 level.

### <a id="3-proposed-solution"></a>3. Proposed solution
#### Overview
-   Place the sensors at 12 locations of Bucknell University. They store up to 7 days of data.
-   Create the app/website to take in the stored CO2 data through bluetooth.
-   Load the data to a server
-   The app/website will take the data from the server
-   The app/website displays a map of all the installed locations.
-   Based on the prior data, the map displays an estimate of the CO2 level at a given time and the hourly trend of CO2 level on that day of the week.

**Proposed Technical system:**
-   The Aranet4 sensor sends data to the website.
-   The website requests the CO2 data from the server based on the user’s chosen location.
-   The server sends back the CO2 data to the website.
-   The website processes all data and displays a map of the chosen location with a CO2 trend graph.

<img src="https://i.ibb.co/WknNVZV/Screen-Shot-2022-09-24-at-4-08-40-PM.png">

**Proposed User story:**
- The user can remotely access both daily trend CO2 level and current predicted CO2 level through going to our website.

<img src="https://i.ibb.co/wJtcD22/Screen-Shot-2022-09-24-at-4-09-43-PM.png">

#### Improvement
-   Open up the pool of users: Everyone on Bucknell University’s campus can access the CO2 level data.
-   Users can see the current CO2 level without owning a sensor and being at the location.
- Users have access to the hourly trend of CO2 level without being at the location.

#### Constraints
-   No in-real-time CO2 data.
-   Must install Aranet4 sensors at the locations.
-   Still need some volunteers to go to the sensors’ location to update the 7 days of CO2 level to the server.

#### Interaction elements
- The map/website will display Bucknell University campus map by default. 
- The main screen is a map-view of the users’ current surroundings.
- Little icons signify the areas with available CO2 information. When you click on an icon, a pop-up will appear from the bottom of the screen to show more details about the area (such as location name, CO2 level, graphs, etc.)
- If time allows, we will add a search bar, profile page, etc.

<img src="https://i.ibb.co/RpJWsGs/Untitled-Artwork-7.png" alt="sketches">

#### Major technical components of the system
<img src="https://i.ibb.co/9pC5tpx/Screen-Shot-2022-09-24-at-4-16-09-PM.png">

- Aranet4 (CO2 sensor):
	-   Collect CO2 data
-   The website (users):
	-   Get CO2 data from Aranet4.
	-   Send CO2 data to Server.
	-   Request CO2 daily level of user’s requested location(s).
	-   Display CO2 daily level of user’s requested location(s) on a map.
-   The server:
	-   Get CO2 data from the website.
	-   Send CO2 daily level back to the website upon the user's requested location(s).

#### Frontend
-   The website’s front-end can be made with React: [https://reactjs.org/](https://reactjs.org/)
-   People can use browsers on either their phones or computers to access the web app.
-   We chose React because its component-based nature allows us to reuse code and build rich user interfaces.

#### Backend
-   Using Python code to allow users to connect to the Aranet4 sensor through Bluetooth.
-   Aranet4 sensors send all stored data to our website on users’ mobile devices. The data will be in the format: device_id, timestamp, CO2 level.
-   The website automatically uploads the received data to our remote server. The remote server stores the data.
-   The remote server will process data to find CO2 concentration by hours in a particular location. Then, store the processed data.
-   When using the website, users can choose a location to request the CO2 level data. The remote server will receive this request from our website and send back the processed data.

#### The Server option
-   We will use Firebase server for data storage (CO2 level, time, location) and user authentication (if time allows). We have some experience using this server. It also has a free plan which includes useful authentication features, ease of access and integration.
-   Some other options include SQLite, Realm (which is designed to work with React Native), Core Data (framework made by Apple) and Bucknell University's provided server.

#### Other artifacts (React Components, Mapbox API)
<img src="https://i.ibb.co/3zj2XMb/Screen-Shot-2022-09-24-at-4-21-24-PM.png">

-   Firebase server stores all data such as CO2 level, time, locations.
-   Firebase server sends all data to React Components.
-   React Components requests a map of a location.
-   Mapbox API sends back a map of location to React Components to store.
-   React Components matches CO2 data with the requested location and displays the data on a map for users.

### <a id="4-milestones"></a>4. Milestones
**Start Date: Sep 12, 2022**

-   *Milestone 1 - System Design paper (Sep 12, 2022 - Sep 23, 2022):* We set our goals and solutions before conducting any technical design or programming. This way we can follow the right path from beginning to end.
    
-   *Milestone 2 - First progress report (Sep 24, 2022 - Oct 14, 2022):* By this time we will have our User Interface mockups ready, and finish our core frame for development.
    
-   *Milestone 3 - Second progress report (Oct 15, 2022 - Nov 4, 2022):* By this time we will have finished creating the app prototype for conducting usability studies. This is useful for the number of iterations on our product design. The frontend code will be fully developed, and we will have laid out a database and the backend logic for storing our app data.
    

- *Milestone 4 - Project deliverable (Nov 5, 2022 - Dec 2, 2022):* Up until this point we will have our product fully ready for testing, with a Project Documentation being finalized for submission.
    
**End Date: Dec 2, 2022**
