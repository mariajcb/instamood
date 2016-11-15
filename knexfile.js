module.exports = {
 development: {
  client: 'pg',
  connection: 'postgres://localhost/instamood'
 },
 production: {
  client: 'pg',
  connection: process.env.DATABASE_URL
 }
};
