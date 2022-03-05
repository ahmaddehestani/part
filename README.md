# [Project -----> REST Group] [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]

## Installation

If you need to create databases and tables, run the [dbMigration.js] file first
but you must change credentials suitable for your system:
```
node dbMigration.js
```
run the project :
```
node index.js
```

## Features

### This project has 3 services :
#### * UserManager : Admins can add user in 3 roles : Admin ,Supprot ,Employee
#### * DeviceManager : Support can assign device to employee
#### * TicketManager : Employee can send ticket about his device to supports and support can respond

## Examples
we have a several example about any of services to make you feel more comfortable to use :

### UserManager (3 route) :

#### /user/signup   POST
Admin can signup any user as a 3 role (Admin,Support,Employee) like this:
```
you must login first to get token , after that :

Address : http://localhost/User/Signup
remember set token to x-auth header
fill body of requset like this :
                   { "name" : "Admin" ,
                     "email" : "Admin@example.com",
	          "role" : "Admin",
	          "password" : "123456",}
```

#### /user/login     POST
Any user mst be login before using of sevices
```
Address : http://localhost/User/Login
remember set token to x-auth header
fill body of requset like this :
                   { 
                     "email" : "Admin@example.com",
	          "password" : "123456",}
```
#### /user/iist        GET
Admins and supports can access to list of user specify by role , but supports can access only support list
```
you can send role with QueryParams
Address : http://localhost/User/List?role=Admin
remember set token to x-auth header
```






## ©Mostafa Pahlevani & Ahmad Dehestani