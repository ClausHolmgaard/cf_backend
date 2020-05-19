const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//const testRoute = require('./routes/TestApi')
require('./routes/routes.js')(app)

const server = app.listen(3300, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Listening on ${host}:${port}`);
})

/*
app.get('/', (req, res) => {s
    res.send('Hello Express')
});
*/
//app.use("/testAPI", testRoute);

//app.listen(process.env.PORT || 3300)

