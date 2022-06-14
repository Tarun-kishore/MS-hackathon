# Morgan Stanley hackathon

# What do I need to run the code on my local machine?

- The backend server is based on `NodeJS`. So you need NodeJS on your local machine (An LTS version is preferred).
- You need `npm package manager`.
- You need `mongoDB` for database.
- At last you need an IDE of your choice.

  All Above softwares can be downloaded easily using any standard package manager. If that's not the case for you, you can download them from their official site.

# How can i run the source code on local machine?

- First clone this repository onto your local machine using your preferred method(Do not download the code but clone it to be able to get latest changes and make contribution).

Then follow the below mentioned steps.

First you need to setup an environment for the server to run (You have to do it only once).

- Create a file named `.env` into the cloned folder.
- Into the file place content :
  DATABASE_URL = `mongodb database url in form of mongodb://localhost:27017/dbname`
  
  SECRET = `any random string`

  ADMIN_EMAIL = `admin email`

  ADMIN_MOBILE = `admin mobile number`

  ADMIN_PASSWORD = `password`
  
  API_KEY = `api key` of [https://rapidapi.com/darkmanaminovic/api/email-sender1/](https://rapidapi.com/darkmanaminovic/api/email-sender1/)


  Every time you pull contents form repository make sure you run `npm install` to install all required modules.

Then every time you run the server, run mongodb shell beforehand using command `mongod`.
Then run `npm run devstart` to start server.

Run `npm start` in `client` folder to start react app after running `npm install` to install react packages.

# How can i contribute to repository?

- When you want to push some changes to original code, create a branch in your local repository.
- Then push to changes in remote repository by creating the branch in remote repository.
- After pushing the changes, create a pull request or you can also directly push to main.
