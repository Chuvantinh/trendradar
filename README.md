# Trendradar
- Introduction: the master thesis of van tinh chu about the trend radar for the health or the trending of technology in the life
- Abstract:
#####

## Angular 
I made a decesion for the intergration of NgRx for this website in order to manage 
```
  ng g c new-component --module app
```

error while installing beccause of npm version 7 , downstream could be better
https://stackoverflow.com/questions/66101540/npm-install-unable-to-resolve-dependency-tree
```
npm install --legacy-peer-deps
```
## Backend 
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

show table:
``
example:
SELECT * FROM "Comment";
``

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
how to compare date in Potgestsql:
```
SELECT *
FROM table
WHERE update_date >= '2013-05-03'::date
AND update_date < ('2013-05-03'::date + '1 day'::interval);
```
#####

# Prisma 2x
how to generate a token for calling data in graphql web :
prisma token --env-file env but in prisma version 1

in version 2.x we have to change it to : 
methode 1 : https://jwt.io/ and scret-key is 2021, payload is uid: 12345

eg: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.HGXEycl3l88-B8ZHpRkXndVrqXTHdcMzG7i18BR4X7E

methode 2 run command to get automatic token : 
```
npm run prismatoken
```
add migration for database when changing something
```
npx prisma migrate dev --name edit_relation_category_trend_manytomany
```
change prisma client after changing model, run with a command as below:
```
yarn or npm or npx prisma generate
```


# Nexus version 1.0.0
Nexus will automatic remove or add mutation or query for you, also in database so.
I split the mutation and query and types in the folder 'graphql' and then export all in index file, in the schema file I will import in the fild types.
The puporse is the maintance for this project and wirte code easyer.
See more at the documentation : https://nexusjs.org/docs/

-- add more table in the file prisma/schema.prisma
-- create Data for TrendSource
```
  createTrendSource(data:{
      title: "test trend sourc1e",
      description: "test trend sourc1e",
      url: "https://google.co1m",
      source: [Internet] 
    })
    {
      title
    }
```

```

  // create category
  mutation{
    createCategory(data:{
      title: "test",
      description: "test",
      parentId: 0
    }){
      title
    }
    
    updateStatusCategory(
    status: DEACTIVE,
    id: 10
    )
    {
      title
    }
    
    deleteCategory(id: 10){title}
  
  }
```
    
````
  // create trend
  createTrend(data:{
      title: "test "
      description: ""
      status: ACTIVE
    }){
      id
      title
      description
      createdAt
      createdBy{
        id
      	name
      }
    }
    
    updateTrend(data:{
       title: "test tren1222111d"
       description: "des222c"
       status: ACTIVE
     },
     id: 4){
       id
       title
       description
       createdAt
       createdBy{
         id
       	name
       }
     }
     
     deleteTrend(id: 4){
       createdBy{name}
       updatedBy{name}
       deletedBy{name}
     }
  // create comment
````

#### Config jest unitest 
install : https://jestjs.io/docs/getting-started


https://stackoverflow.com/questions/56595053/cannot-find-name-it-in-jest-typescript
in the tsconfig.json add
````
    "types": ["node", "jest"]
````
