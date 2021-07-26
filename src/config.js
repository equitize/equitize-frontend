const SERVER_URL = process.env.NODE_ENV === "production" ? "https://api.equitize.xyz/api" : "http://localhost:8080/api"

const ConfigData = {
    "SERVER_URL": SERVER_URL,
    "AUTH_URL": "https://dev-cus1s5do.au.auth0.com",
    "JWKS_CLIENT": "https://dev-cus1s5do.au.auth0.com/.well-known/jwks.json"
}

export default ConfigData