const axios = require('axios');
require('dotenv').config();

const hardcoded_info1 =
    {lines: ["INFO HARDCODED IN BACKEND",
             "First info piece",
             "Some info",
             "A much much much much much much much much much much much much much longer string",
             "more",
             "more"]
    };

const hardcoded_info2 =
    {lines: ["INFO HARDCODED IN BACKEND",
             "Second info piece",
             "Some other info",
             "Not quite as ling a string",
             "more",
             "more"]
    };

exports.info = async (req, res) => {
    //res.end("Something something other info...");

    console.log(`Processing info request from ${req.hostname}`);

    let resData = {};
    resData['data'] = [];
    resData['data'].push(hardcoded_info1);
    resData['data'].push(hardcoded_info2);
    res.end(JSON.stringify(resData));
}
