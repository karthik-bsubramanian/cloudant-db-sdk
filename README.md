<h3 align="center">Endpoints to perform CRUD operations in cloudant DB</h3>

cloudant is a NoSql Database and can be connected using cloudant db sdk ```@ibm-cloud/cloudant``` 

```
  const dbName = 'expenses';

  await cloudant.putDatabase({ db: dbName });

```
- `POST/employees` create a Document entry to the database you've created 
- `GET/employees/get` retrieve all the docs created
- `GET/employees/:id` retrieve employee data W.R.T employee id
- `PUT/employees/update` update an employee's info 
- `DELETE/employees/remove` remove an employee record



