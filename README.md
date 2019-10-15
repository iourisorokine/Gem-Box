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

![Welcome screen of the app](https://github.com/iourisorokine/gem-box/public/screenshots/welcome-screen.png)

## Technology - Frontend

The frontend is built with React.js, as well as React Bootstrap and custom CSS. react-mapbox-gl is used for the creation of map, visualization of the gems and creation of the trips.

The app is planned for a mobile usege first.

Initial mockups of the app are available [here](https://marvelapp.com/project/4346573/)

![Map view with Gem popup](https://github.com/iourisorokine/gem-box/public/screenshots/map-view-1.png)

## Further Developments



