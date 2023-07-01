import express, { Application} from 'express';
import indexRoutes from './routes/index';
const app: Application = express();
const cors = require('cors')

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// })
app.use(cors())

// Routes
app.use(indexRoutes);

app.listen(8000);
console.log('Server on port', 8000);