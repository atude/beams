const domain = require("./domain");
const express = require('express');
const app = express();
const port = 5000;
var token = null;

const getToken = async () => {
    if (!token) {
        token = await domain.getAccessToken("client_51a1164e0a644172b0b0918d6dc03e50", "secret_3c539f2110416814cfebede050260c18");
    }
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/suburb/:suburb/:state', async (req, res) =>
{
    await getToken()
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state)
    res.json(suburbInfo)
})

app.get('/AllDemos/:suburb/:state', async (req, res) =>
{
    await getToken()
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state)
    const result = await domain.getDemographics(token, suburbInfo[0].ids[0].id, req.params.state)
    res.json(result)
})

app.get('/AllStats/:suburb/:state', async (req, res) =>
{
    await getToken();
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state);
    const result = await domain.getStats(token, suburbInfo[0].ids[0].id, req.params.state);
    res.json(result);
})

app.get('/Bedroom/:num/:suburb/:state', async (req, res) =>
{
    await getToken();
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state);
    console.log("req params rooms", req.params.num);
    const result = await domain.getBedroomStats(token, suburbInfo[0].ids[0].id, req.params.state, req.params.num);
    res.json(result);
})

app.get('/Coords/:lat/:lng', async (req, res) =>
{
    await getToken();
    const result = await domain.getSchools(token, req.params.lat, req.params.lng);
    res.json(result);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

// If editting files in server folder, make sure to restart server by running node app.js