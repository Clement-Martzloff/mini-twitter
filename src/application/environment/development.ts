import path from 'path';

module.exports = {
  dbUrl: process.env.MONGODB_CONNEXION_STRING_DEV!,
  cert: path.join(__dirname, process.env.SSL_CERTIFICATE_PATH_DEV!),
  key: path.join(__dirname, process.env.RSA_KEY_PATH_DEV!),
};
