#### 

https://another-nodejs-todo-api.herokuapp.com/todos

#### Start server:
`$ nodemon server/server.js`

#### Run tests:
`$ npm run test-watch`

#### Deploy to heroku:
`$ heroku create`
`$ heroku addons:create mongolab:sandbox`

_________________

#### DB's

There is a DB for each environment (production, development and testing):

**package.json**
```
...
"start": "node server/server.js"
"test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
...
```
