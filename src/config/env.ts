import dotenv from 'dotenv';

dotenv.config()

const envVars = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_DB_URI || "",
  pokeApiBaseUrl: process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2',
};

export default envVars;
