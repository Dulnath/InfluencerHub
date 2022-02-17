Email verification for a new user registration

Need to install bellow dependencies 

For server 

    "axios": "^0.26.0",
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^10.0.0",
    "express": "^4.17.2",
    "joi": "^17.6.0",
    "joi-password-complexity": "^5.1.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.1.2",
    "nodemailer": "^6.7.2",
    "nodemon": "^2.0.15"
  },


  For client
  
    "axios": "^0.24.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.2.1",

    In addition need to enter a valid gmail addrress and password in .env file.

    It is better to turn off 2-factor authentication for the above gmail
    and allow less secure apps:On https://myaccount.google.com/lesssecureapps
