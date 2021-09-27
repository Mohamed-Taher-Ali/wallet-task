import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'

import { runSql } from './instances/sequalize';
import { appRouter } from './routes';
import { seed } from './utils/seed';

const app = express()
const port = 5000;

runSql(); // run db connection;
seed(); // seed admin;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

appRouter(app);

try {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`)
    });
} catch (e) {
    console.log(`Error raised : ${e}`);
}