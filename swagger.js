const documentData= {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "Parveen App API",
      "description": "Find out how your APIs work",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "host": "localhost:5000",
    "basePath": "/api/v1",
    "tags": [
      {
        "name": "Users",
        "description": "API for users in the system"
      }

    ],
    "schemes": [
      "http",
      "https"
    ],
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "securityDefinitions": {
        "ApiKeyAuth":{
          "type": "apiKey",
          "in": "headers",
          "name": "authorization"
        }
    },
    "paths": {
      "/users/login": {
        "post": {
          "summary": "Login user",
          "tags": [
            "Users"
          ],
          "description": "Login user in system",
          "parameters": [
            {
              "name": "user",
              "in": "body",
              "description": "Login user",
              "schema": {
                "$ref": "#/definitions/User"
              }
            }
          ],
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Login Success",
              "schema": {
                "$ref": "#/definitions/User"
              }
            },
            "401":{
              "description": "Login details are not valid!!"
            },
            "404":{
              "description": "Email is not registered!"
            },
            "500":{
              "description": "User login failed!!"
            }
          }
        }
      }
    },

    "definitions": {

      "User": {
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      "userEmail":{
        "properties": {
          "email": {
            "type": "string"
          }
        }
      }



    }
  }

  export default documentData