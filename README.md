# XMeme

XMeme is a web application where anyone can upload meme and see the last 100 memes uploaded.

## Installation and Configuration

- Clone the repository
- Move to the directory (`cd rishav_rajput34dtg-me_buildout_xmeme`)

- It is designed using EJS. So, backend will render page dynamically. 

- Default port is 8081. So, locally it will be hosted on `localhost:8081`

-  Deployment is done on `https://secure-inlet-35092.herokuapp.com/`


## Routes

For crio Assessment
- GET /memes - list all memes
- GET /meme/:id - get a meme with the given ID
- POST /memes - post a meme
- PATCH /memes/:id - update a meme with the given ID

For deployment 
- GET / - list of last 100 memes and submit form 
- POST / - for posting meme using form
- GET /edit/meme - for editing the url and caption


## Tech Stack Used

- NodeJS
- Express
- EJS
- MongoDB