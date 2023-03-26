# auth-express

## Dependencies

https://github.com/motdotla/dotenv

https://github.com/expressjs/generator

https://github.com/sidorares/node-mysql2

https://sequelize.org/docs/v6/getting-started

```shell
npx express-generator --no-view auth-express
npm i -D prettier
npm i nodemon
npm i dotenv
npm i cors
npm i mysql2
npm i sequelize sqlite3
npm i -D sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name user --attributes fullName:string,email:string,password:string
npx sequelize-cli db:migrate
npm i argon2
```

## Guides

https://sequelize.org/docs/v6/core-concepts/model-instances/
