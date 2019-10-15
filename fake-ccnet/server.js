const express = require("express");
const app = express();
const path = require("path");
const reportPath = path.join(__dirname, "report.xml");
const fs = require('fs');

const route = "/ccnet/XmlStatusReport";
app.get(route, (req, res) => {
    res.set('Content-Type', 'text/xml');

    fs.readFile(reportPath, function(err, report){
        if(err) throw err;
        console.log(`[${new Date().toLocaleTimeString()}] Read ${path.basename(reportPath)}`);
        res.send(report);
    });
});

const port = 8282;
app.listen(port, () => console.log(`${path.basename(reportPath)} available at http://localhost:${port}${route}`));