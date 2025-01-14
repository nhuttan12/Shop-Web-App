import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());

app.listen(process.env.DB_PORT, ()=>{
    console.log(`Server started on port ${process.env.DB_PORT}`);
});