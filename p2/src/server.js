import express from 'express';
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//get the file path from the URL of the curr module
const __filename=fileURLToPath(import.meta.url)

//get the directory name 
const __dirname=dirname(__filename)

//middlerware
app.use(express.json())


// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
});



//Routes
app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
