// User-Service (Node.js + Supertokens)

// /user-service/src/app.js
const express = require('express');
const supertokens = require('supertokens-node');
const { middleware, errorHandler } = require('supertokens-node/framework/express');
const Session = require('supertokens-node/recipe/session');
const EmailPassword = require('supertokens-node/recipe/emailpassword');
const cors = require('cors');

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "http://localhost:3567",
        apiKey: "your-api-key",
    },
    appInfo: {
        appName: "Translation Summarization Platform",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init(),
    ],
});

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());

// Additional User Routes (e.g., fetching user details)
app.get("/user/profile", async (req, res) => {
    let userId = req.session.getUserId();
    // Fetch user details from DB
    res.send({ userId });
});

app.use(errorHandler());

const port = 3001;
app.listen(port, () => console.log(`User service running on port ${port}`));

