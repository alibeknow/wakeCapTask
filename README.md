# Nodejs Backend Challenge

​

## Objectives

​
The purpose of completing this test is to show us how you approach and solve a problem.
​

- **State your assumptions.** Anywhere you feel that the requirements are unclear please make
  an assumption and document that assumption.
- **Describe Trade-offs.** When you are making a decision about using one design/approach vs. another
  try to make a quick note about why you made the choice you did.
- **Provide tests.** You should provide unit tests for the code that you write.
  ​
  ​

## Requirements

- Wakecap is an IoT company that has a products dealing with workers helmets to get data needed to track their movement and measure their productivity as well. The solution provides a lot of reports to the sites' admins and allow them to track their efficiently.
- The structure of each site is as following:
  - Client (Al Futtaim for example)
  - Al Futtaim has multiple sites (Like City Center)
  - Every Site has it's own workers
    ​
- For each site, there is a specific configuration:

  - Timezone (Used to manage the timing of the tracked workers against UTC)
  - Starting hour (Used to figure out the time the workers start their daily operation as Check In)
  - Ending hour (Used to figure out the time the workers end their daily operation as Check Out)
  - Late threshold (the Value where every worker exceeds the work shift interval they will be considered as late worker)

- The site admin need daily report contains:
  - Show a summary of absent workers
  - Show a summary of late workers
  - Total active hours for workers "is_active=true"
  - Total inactive hours for workers "is_active=false" (The hours that the worker spent in the site leaving the helmet away, or not moving from his place for 5 minutes)
    ​
- Make sure the report should be generated every **midnight** depends on site's different timezone assuming we have multiple sites in different time zones.

- We receive every 3 minutes new location update from our assets
  ```
  {
      "coordinates" : {
          "coordinates" : [
              55.1404609680176,
              25.0615882873535
          ],
          "_id" : ObjectId("5daddacc03feb33cb822ac23"),
          "type" : "Point"
      },
      is_active: true,
      "duration" : 180,
      "worker_id" : "24"
  }
  ```
  - coordinates: His location when this message is sent from the device
  - is_active we have sensor detect if the worker is working or not
  - duration: number of seconds between sending this message and the pervious message.

## Technologies

- Node.js
- Mongoose
- Testing [Mocha](https://mochajs.org) and [Chai](http://chaijs.com)
- Docker
  ​

## Criteria

​

- Use following [coding style guide](https://github.com/airbnb/javascript)
- Efficient MongoDB queries and indexes
- Mongoose schemas and models
- [JSDoc](https://jsdoc.app/) for documenting JavaScript code

# Wakecap backend task

WakeCap backend task is a backend for an IOT app

To start up the containers, we can open the terminal (or command prompt) in the root folder of our project and issue the below command:

\$ docker-compose up

Another useful command for docker compose is when you want to rebuild a new image for your container. Basically, this is for a case where you have made some changes to your application code and want to rebuild the images:

\$ docker-compose up --build

you can still run the test like this:

\$ docker-compose run --rm project_name npm run test

We can now access the application documentation at http://localhost:3000/api/v0/explore

# if you starting applicaiton locally not in container just change variable in env to localhost
