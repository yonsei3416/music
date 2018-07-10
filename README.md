# Music-Playlist

Develop a user interface for a music playlist. The playlist is made of one or more objects that represent a song. The user should be able to search, edit, insert new and delete songs.

For the UI actions there is a REST API you can use. Please make sure you have the software npm installed on your computer and that you have run the command

npm install

in the root of the project folder.
The Server API can be then started with the command:

npm start

After you have started the server you can use the following REST-API endpoints:

GET http://localhost:3000/music/

POST http://localhost:3000/music/

DELETE http://localhost:3000/music/:id

GET http://localhost:3000/music/:id
