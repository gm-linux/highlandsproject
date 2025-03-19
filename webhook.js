const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
    // Validate GitHub secret (optional)
    console.log("Webhook received, deploying...");
    
    // Run deployment script
    exec("sh /var/www/highlandsproject.com/deploy.sh", (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err}`);
            return res.sendStatus(500);
        }
        console.log(stdout);
        res.sendStatus(200);
    });
});

app.listen(9000, () => console.log("Webhook listener running on port 9000"));
