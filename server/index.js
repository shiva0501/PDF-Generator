import express from 'express';
import bodyParser from 'body-parser';
import pdf from 'html-pdf';
import cors from 'cors';
import pdfTemplate from './documents/index.js';
import path from 'path';

const __dirname = path.resolve();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//POST - PDF generation and fetching of the data

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf',(err) => {
        if(err){
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//GET -send the generated PDF to the client

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));