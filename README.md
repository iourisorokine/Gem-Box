# Gem-Box
"Get Inspired, Explore Places, Share Discoveries"

## Project Owners

The app was co-created with [Anna-Marie Nauruschat](https://github.com/annamarie-now), [Harinath Vulta](https://github.com/harinathvutla), and [Jörg Stommel](https://github.com/Jrgsto). All features and functionnalities were planned and designed together as the third and final project of Ironhack Full Stack Web Development Bootcamp Berlin.

## Concept of the App

Gem-Box is a social travel app made to share unique travel experiences. “Hidden gems” is an idiom which means something which is extremely outstanding and not many people may know about.

The app allows its users to share their hidden gems by pinning a location with a photo and description on a global map.
Gems can be "discoveries" (first time visit of a spot or center of interest) or "experiences" (when the spot is visited again by another user)

After creating gems, users can connect them together, creating a Trip, which is represened by a path on the map. The trip is accessible via the profile of the user who created it.

## Technology - Backend

The app is built using Node.js and Express.js. Data is stored on MongoDB and accessed via Mongoose. The main data models are: 
User: containing data for authentification and profile info.
Gem: containing the picture, type, description and social interation data (likes)
Trip: a collection of Gem models that identify a travel that the user did to join several gems.
Wisdom: contains an inspiration quote that is shown at the logout.

The Transport model, initially planned, is set but not used in the current version of the app.

Cloudinary API is used for managing the upload of photos such as profile pics and gem related photos.

![Welcome screen of the app](https://github.com/iourisorokine/Gem-Box/public/screenshots/welcome-screen.png)

## Technology - Frontend

The frontend is built with React.js, as well as React Bootstrap and custom CSS. react-mapbox-gl is used for the creation of map, visualization of the gems and creation of the trips.
The app is planned for a mobile usege first and all views have been built to fit the design of a narrow screen.

![Map view with Gem popup](https://github.com/iourisorokine/Gem-Box/public/screenshots/map-view-1.png)

The visualization of the trip, as a connection of several gems together with a route, is made possible by calling the Mapbox GL API that returns a serie of coordinates used to visializa a route point by point. For some locations, the API doesn't provide a detailed route, in which case a backup function draws a strait line between the Gems to provide a schematic visualization.

![The visualization of a trip](https://github.com/iourisorokine/Gem-Box/public/screenshots/trip-screen.png)

## Further Developments

The initial app was planned, buit and deployed in 10 days, which forced us to stick to the core features. Here are some additional developments that we would like to add progressively to the app:

### Gamification
The user profile features a dummy score. This sccore should be connected to the activity of the user in order to add fun and interactivity to the app usage and encourage the user to use the app.
### Trips
Add means of transportation to the trips in a way that each pair of gems get joined with the information of how the user traveled (bycicle, train, plane, car...).
Add Interactivity to the trip details view, being able for exaple to add/remove gems, to change their order, or to update the trip in a more independant way (currently, it is bout to the process of creating the gems)
Track the travel location during the travel and adding the trip to the travel.
Display the trips on the Explore places map.
### Filters
Add a filter per interactions (most popular gems)
Add a filter for the trips.

## Extras and Special thanks
Initial mockups of the app are available [here](https://marvelapp.com/project/4346573/).

Special thanks to the people who helped us during the development - the Ironhack teaching staff - [Montasar] (https://github.com/mjarraya), [Svenja](https://github.com/Svemakawe), [Bruno](https://github.com/brudolce), [Min](https://github.com/angminsheng), and [Pierre](https://github.com/pierreportal)



