//  to register and get token
const axios = require("axios");
const fs = require("fs");

const BASE_URL = "http://20.244.56.144/test";

const config = {
  companyName: "SUJALLIMJE",
  ownerName: "Sujal Limje",
  rollNo: "RA2211003010821",
  ownerEmail: "sl5387@srmist.edu.in",
  accessCode: "SUfGJv",
};

async function register() {
  try {
    console.log("Registering");
    const response = await axios.post(`${BASE_URL}/register`, config);

    const credentials = {
      clientID: response.data.clientID,
      clientSecret: response.data.clientSecret,
      ...config,
    };

    console.log("Credentials:", credentials);

    const envContent = Object.entries(credentials)
      .map(([key, value]) => `${key.toUpperCase()}=${value}`)
      .join("\n");

    fs.writeFileSync(".env", envContent);
    console.log("Credentials saved to .env file");

    return await getAuthToken(credentials);
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
  }
}

async function getAuthToken(credentials) {
  try {
    console.log("Getting authentication token...");
    const response = await axios.post(`${BASE_URL}/auth`, credentials);

    console.log("Authentication successful!");
    console.log("Token:", response.data.access_token);
    console.log("Token Type:", response.data.token_type);

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
  }
}

register();
