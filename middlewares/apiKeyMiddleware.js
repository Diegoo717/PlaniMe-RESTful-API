require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
    const clientKey = req.headers['x-api-key']; 

    if (!clientKey) {
        return res.status(401).json({ error: 'API Key is missing' });
    }

    if (clientKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    next(); 
};

module.exports = apiKeyMiddleware;
