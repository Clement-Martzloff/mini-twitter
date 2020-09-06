module.exports = {
  dbUrl: process.env.DEV_MONGODB_CONNEXION_STRING!,
  cert: process.env.DEV_SSL_CERTIFICATE_PATH!,
  key: process.env.DEV_RSA_KEY_PATH!,
};
