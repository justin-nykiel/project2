# What's Nextflix?

What's Nextflix is an app created to help users search for new content they can watch on Netflix. Users are able to search for content based on title or one of over 500 genres available using the unogsNG API. 

## Technologies Used
* HTML
* CSS
* Javascript
* Node/Express

This is a full stack application built using node/express and a variety of packages. Packages including session and passport were used to authenticate and authorize users for use. Axios was used to make front- and back-end API calls in order the access the unosNG API and fetch Netflix data. 


## Approach

Before beginng the application, it was planned using an entity relational diagram to map out the datastructure. The overall look was planned using wireframing. 

## Installation Instructions

How to set up:
1. fork & clone

2. Install dependencies 
```
npm i
```
3. Create a config.json with the following code:
```
{
  "development": {
    "database": "<insert developmment DB here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test DB here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production DB here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

**NOTE:** If your DB requires a username and password add fields above

4. Create Databse:
```
sequelize db:create <insert db name here>
```
5. Migrate the `user`, `show` and `review` model 
```
sequelize db:migrate
```