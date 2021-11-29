if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const express = require('express');
const path = require('path')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const MongoStore = require('connect-mongo');



//const MongoStore = require('connect-mongo');
//declaring external route files
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/users');
const publicRoutes = require('./routes/sots')

const port = process.env.PORT || 3000;
// const credentials = 'sotsAdmin:stateofthesnowpack';
//connecting database
const mongoURI = process.env.MONGO_URL;
const secret = process.env.SECRET;

mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const store = MongoStore.create({
    mongoUrl: mongoURI,
    secret,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store: store,
    secret: secret,
    name: 'session',
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: true,
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected')
})
//initializing express app
const app = express();

app.use(express.static((path.join(__dirname + '/public'))));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
//configuring session
app.set('trust proxy', 1)
app.use(session(sessionConfig));
app.use(flash());
//authentication middleware

//setting up custom middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.isAdmin = req.user.isAdmin;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
//routing middleware
app.use('/', userRoutes)
app.use('/', publicRoutes)
app.use('/admin', adminRoutes)
//security middleware
app.use(helmet({ 
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: 'same-site' },
    originAgentCluster: true
}));
app.use(mongoSanitize({ replaceWith: '_' }));



app.listen(port, () =>{
    console.log('Listening on 3000')
})