// Constants.js
const prod = {
 url: {
  API_URL: ‘https://master.d1mm5pvnsxz7da.amplifyapp.com/',
  API_URL_ACCESS: ‘https://master.d1mm5pvnsxz7da.amplifyapp.com/access'}
};
const dev = {
 url: {
  API_URL: ‘http://localhost:3000'
 }
};
export const config = process.env.NODE_ENV === ‘development’ ? dev : prod;