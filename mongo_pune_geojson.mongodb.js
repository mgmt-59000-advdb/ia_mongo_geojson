/*
INSTRUCTIONS

Use MongoDB Compass to upload new data to your cluster.

-- Database: Pune
In Compass, 
    1. Create a new database named `pune`
    2. Create a new collection named `wards`
    3. Use the Add Data feature to upload the JSON file `pune_wards.json`
    4. Create a new collection named `restaurants` in the `pune` database
    5. Use the Add Data feature to upload the JSON file `pune_restaurants.json`

-- Build 2dsphere indexes
In Compass, 
    1. Click on the `wards` collection
    2. Click on the **Indexes** tab
    3. Click Create > Index
    4. For the Index fields, choose `geometry`
    5. For 'Select a type', choose `2dsphere`
    6. Click on the `neighborhoods` collection
    7. Click on the **Indexes** tab
    8. Click Create > Index
    9. For the Index fields, choose `location`
    10. For 'Select a type', choose `2dsphere`

Once your data is uploaded, copy and paste this playground file into your Visual Studio code window and connect to your cluster.

You should see the new databases in the MongoDB extension.
*/

// Select the database to use.
use('pune');

/***
 * EXAMPLE QUESTION 1
 * What is the name of the ward located at the point LONGITUDE 73.834124, LATITUDE 18.5304580?
***/

var q1neighborhood = db.wards.findOne(
    { geometry: 
        { $geoIntersects: 
            { $geometry: 
                { type: "Point", coordinates: [ 73.834124, 18.5304580 ] 
                } 
            } 
        } 
    }
)

console.log('The name of the ward for question 1 is ' + q1neighborhood.name);

/***
 * EXAMPLE QUESTION 2
 * How many restaurants can be found within the ward from question 1?
***/

var numberRestaurants = db.restaurants.find( 
    { location: 
        { $geoWithin: 
            { $geometry: q1neighborhood.geometry } 
        } 
    } 
).count()

console.log('There are ' + numberRestaurants + ' restaurants in ' + q1neighborhood.name);


/*** 
 * IA QUESTION 1 - 3 points
 * How many restaurants whose list of categories includes "Chinese" are within 2km of longitude 73.94461877875536, latitude 18.545868550081565 ?
***/


/*** 
 * IA QUESTION 2 - 4 points
 * What is the name of the restaurant closest to the point longitude 73.73859430249657, latitude 18.489515369800266 that has a `dining_rating` greater than 4 and a `pricing_for_2` less than 1,000?
***/


/*** 
 * IA QUESTION 3 - 5 points
 * How many restaurants in the neighborhood containing the point longitude 73.76415038261914, latitude 18.570314608276487 have the word "Ambience" (any case) in their `known_for_atmos` field?
***/


/*** 
 * IA QUESTION 4 - 5 points
 * What is the name of the restaurant with the lowest `pricing_for_2` that has a dining_rating greater than 4.5, a `category` of "European", and whose `locality` includes either "Baner" or "Kalyani Nagar"?
***/


/*** 
 * IA QUESTION 5 - 8 points
 * What ward has the highest number of restaurants with the `category` of "Bengali"?
***/

