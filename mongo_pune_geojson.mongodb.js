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