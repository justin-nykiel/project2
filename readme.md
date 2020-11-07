npm i express ejs express-ejs-layouts
require express
require layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
set controllers
router = express.Router()
include middleware for body parser
app.use(express.urlencoded({extended:false}))


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
5. Migrate the `user` model 
```
sequelize db:migrate
```

6. Add a `SESSION_SECRET` enironment variable in a `.env` file