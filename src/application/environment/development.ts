module.exports = {
  dbUrl: process.env.MONGODB_CONNEXION_STRING_DEV!,
  cert: process.env.SSL_CERTIFICATE_PATH_DEV!,
  key: process.env.RSA_KEY_PATH_DEV!,
};
