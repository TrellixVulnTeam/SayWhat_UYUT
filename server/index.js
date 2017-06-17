const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');

// Imports the Google Cloud client library
const Language = require('@google-cloud/language');
// Your Google Cloud Platform project ID
const projectId = 'summer-flux-170815';
// Instantiates a client
const language = Language({
    projectId: projectId
});

//serves up static files
// app.use('*', express.static(path.join(__dirname, 'public')));

//body-parsing
app.use('/', bodyParser.json());
app.use('/', bodyParser.urlencoded({ extended: true }));

app.use(express.static('/Users/ketevantsintsadze/Documents/coding/foundations/speech/SayWhat/public'));

// app.use(express.static('public'))

app.get('*', function (req, res) {
    res.sendFile('/Users/ketevantsintsadze/Documents/coding/foundations/speech/SayWhat/public')
})

app.post('/api/text', (req, res, next) => {
    // The text to analyze
    console.log('REQ.BODY.CONTENT ==========', req.body.content)
    const text = req.body.content;

    // Detects the sentiment of the text
    language.detectSentiment(text)
        .then((results) => {
            const sentiment = results[0];
            console.log(`Text: ${text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
            res.send(sentiment)
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
})

app.listen(3000, () => console.log('Listening on port 3000'))

module.exports = app;
