npm i express ejs express-ejs-layouts
require express
require layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
set controllers
router = express.Router()
include middleware for body parser
app.use(express.urlencoded({extended:false}))