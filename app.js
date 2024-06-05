const express = require('express');
const app = express();
const connectDB = require('./db/database')
const jobs = require('./routes/jobs')
const users = require('./routes/users')
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const authenticateUser = require('./middlewares/authentication')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, //  30 seconds
    max: 4, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false, // Disable the X-RateLimit-* headers
    store: undefined, // Add a store option if you want to use Redis or other stores
});
app.use(limiter);
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet())
app.use(cors())
app.use(xss())



app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1>');
});

app.use('/api/v1/jobs', authenticateUser, jobs)
app.use('/api/v1/users', users)


app.use(notFound);
app.use(errorHandler);

// Error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});
const PORT = process.env.PORT || 6000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, (req, res) => {
            console.log(`Server running on port: ${PORT}`)
            console.log("database connected sucessfully")
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

