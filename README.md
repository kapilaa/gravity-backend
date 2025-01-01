# Getting Started with Create Node Express App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

This is Toto task based project 
In this is implemented on React, Node, Mongo, Express
This is backend repository which is created on Node js
first clone this project by using this command 

git clone https://github.com/kapilaa/gravity-backend.git

After clone successfull please run following command

npm install

Create env file and add following variables 

# ################# REQUIRED ENV VARS START #################
PORT=8080
MONGODB_URI=mongodb://localhost:27017 # `mongodb://localhost:27017` in case using local mongodb

NODE_ENV=development # changing this will avoid stack traces in the error response

EXPRESS_SESSION_SECRET==**********

DB_NAME=gravity_task or "create any"

ACCESS_TOKEN_SECRET=**********

TO run this project please run following command

npm start
