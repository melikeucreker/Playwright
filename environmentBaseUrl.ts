// environmentBaseUrl.js
const environmentBaseUrl = {
  local: {
    home: 'http://localhost:3000',  
  },
  staging: {
    home: 'https://staging.example.com', 
  },
  ci: {
    prefix: 'https://ci.example.com/',   
    suffix: '/home',                     
  },
};

export default environmentBaseUrl;
