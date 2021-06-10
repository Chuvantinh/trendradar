# Trendradar
- Introduction: the master thesis of van tinh chu about the trend radar for the health or the trending of technology in the life
- Abstract:
#####

# Postgresql 
```
for sqlite
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

for postgresql
```
- tutorial : https://www.tutorialspoint.com/postgresql/postgresql_schema.htm
\d "User" to see the describe of the table user

```
- create migrate as new table for postgres
npx prisma migrate dev --name init

- run seed 
npx prisma db seed --preview-feature
- get data:
select * from "Post";
- update table as migration
npx prisma migrate dev --name add-profile
```

#####

# Prisma 2x
how to generate a token for calling data in graphql web :
prisma token --env-file env but in prisma version 1

in version 2.x we have to change it to : 
methode 1 : https://jwt.io/ and scret-key is 2021, payload is uid: 12345

eg: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.HGXEycl3l88-B8ZHpRkXndVrqXTHdcMzG7i18BR4X7E

methode 2 run command to get automatic token : npm run prismatoken

# Nexus version 1.0.0
Nexus will automatic remove or add mutation or query for you, also in database so.
I split the mutation and query and types in the folder 'graphql' and then export all in index file, in the schema file I will import in the fild types.
The puporse is the maintance for this project and wirte code easyer.

