import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import product_routes from './models/handlers/product';
import user_routes from './models/handlers/user';
import order_routes from './models/handlers/order';
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {origin: "*"};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', cors(corsOptions) , (req: Request, res: Response) => {
    res.send('Hello World!')
})

product_routes(app);
user_routes(app);
order_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
