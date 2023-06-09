# auth-express

## Dependencies

https://github.com/motdotla/dotenv

https://github.com/expressjs/generator

https://github.com/sidorares/node-mysql2

https://sequelize.org/docs/v6/getting-started

https://github.com/auth0/node-jsonwebtoken

https://www.passportjs.org/packages/passport-jwt

```shell
npx express-generator --no-view auth-express
npm i -D prettier
npm i -D nodemon
npm i express
npm i cookie-parser
npm i dotenv
npm i cors
npm i mysql2
npm i sequelize sqlite3
npm i -D sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name user --attributes fullName:string,email:string,password:string
npx sequelize-cli db:migrate
npm i argon2
npm i jsonwebtoken
npm i passport passport-jwt
npm i amqplib amqp-connection-manager
```

## Guides

https://sequelize.org/docs/v6/core-concepts/model-instances/

https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
