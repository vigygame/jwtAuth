# API Authentication using NodeJs

The API based on Node.js, Express,  Redis(Testing for in memmory tokens ), following the **MVC pattern** i.e. Model ~~View~~ Controller.


**Redis** is used for storing Refresh Tokens - to validate them as well at the same time Blacklisting them this for Testing only 


---

#### To start setting up the project

Step 1: Clone the repo


Step 2: cd into the cloned repo and run:

```bash
npm install
```

Step 3: Put your credentials in the .env file.

```bash
PORT=3000
MYSQL_URI=mongodb://localhost:27017
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
REFRESH_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
```

Step 4: To generate 256-bit keys for JWT

```bash
node ./helpers/generate_keys.js
```

Step 5: Start the API by

```bash
npm start
```

Step 6 (Optional): Change the expiration time of Access Token and Refresh Token according to your needs by going inside the **`./helpers/jwt_helper.js`** file.

## Author

- [**Vignesh Rajan vignesh@40k.com.au**]

## Contribute

## License

This project is licensed under the MIT License.
