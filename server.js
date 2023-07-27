import {app} from "./app.js";
import {connectDB} from "./data/database.js"

connectDB();

app.listen(process.env.PORT, () => {        // Server is listening at 4000 port
    console.log(`Server is Working on:${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
 })
