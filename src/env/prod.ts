module.exports = {
  dbUrl: process.env.PROD_MONGODB_CONNEXION_STRING!,
  cert: process.env.PROD_SSL_CERTIFICATE_PATH!,
  key: process.env.PROD_RSA_KEY_PATH!,
};
