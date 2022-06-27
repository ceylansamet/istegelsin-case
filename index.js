'use strict';

const express = require('express');
const getApi = require('./utils/serviceCaller');
const producer = require('./producer');
const utils = require('./utils');

const app = express();

const port = 3000;

app.get('/write-topic', async (req, res) => {
    try {
        const response = await getApi(utils.requestURL).request();

        const parsedResult = await utils.getParseRequest(response.data);
        parsedResult['requestTimeStamp'] = new Date().getTime();
        parsedResult['operationName'] = 'Write Kafka Topic!';
        if(parsedResult.success){
            let success = producer.write(JSON.stringify(parsedResult));
            if (success) {
                parsedResult.message += " *** message queued ***";
                res.json(parsedResult);
            } else {
                parsedResult.message += " *** Too many messages in the queue already.. ***";
                res.json(parsedResult);
            }
        } else{
            res.json(parsedResult);
        }

    }
    catch (error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))