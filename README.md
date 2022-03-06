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

### UserManager  :

#### /user/signup   POST
Admin can signup any user as a 3 role (Admin,Support,Employee) like this:
```
you must login first to get token , after that :

Address : http://localhost/user/signup
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
Address : http://localhost/user/login
remember set token to x-auth header
fill body of requset like this :
                   { 
                     "email" : "Admin@example.com",
	          "password" : "123456",}
```
#### /user/list        GET
Admins and supports can access to list of user specify by role , but supports can access only support list
```
you can send role with QueryParams
Address : http://localhost/user/list?role=Admin
remember set token to x-auth header
```
### EquipmentManager  :

#### /equipments     POST
Supports can add equipments to database
```
Address : http://localhost/equipments
remember set token to x-auth header
fill body of requset like this :
                   {
                      "name" : "modem"
                     "email" : "Employee@example.com"
	       }
note : email is optional in this stage , if you add , equipments assign to employee at the same time insert to database
```
#### /equipments     GET
Support can view list of equipments based on employee , assigned or unassigned
```
you can send email with QueryParams
Address : http://localhost/equipments?email=Employee@example.com
Address : http://localhost/equipments?ownership=false
Address : http://localhost/equipments?ownership=true
remember set token to x-auth header
```
#### /equipments/selectOwner    POST
Support can assign equipment to employee 
```
Address : http://localhost/equipments/selectOwner
remember set token to x-auth header
fill body of requset like this :
                   {
                      "equipmentID" : "2"
                      "email" : "Employee@example.com"
	       }
```

### TicketManager  :

#### /tickets    POST
Employees can send ticket about their equipments 
```
Address : http://localhost/tickets
remember set token to x-auth header
fill body of requset like this :
                   {
	          "title" : "Modem failure"
                      "body" : "hello dear ....."
                      "equipmentID" : "2"  
	       }
```
#### /tickets    GET
Employees can view thier thickets 
Supports can view thier thickets and unassiged tickets (based on period of time , state , :Optional)
note : employees only access to their tickets
```
you can send email with QueryParams
Address : http://localhost/tickets?state=Open&from=1646328465500&to=1646328000000
Address : http://localhost/tickets?unassigned=true
remember set token to x-auth header
```
#### /tickets/assign   POST
Supports can assigned ticket to themselves
```
Address : http://localhost/tickets/assign
remember set token to x-auth header
fill body of requset like this :
                   {
                      "ticketID" : "2"  
	       }
```
#### /tickets/comment    POST
Employee and Support can write a comment on specific ticket with Open state
```
Address : http://localhost/tickets/comment
remember set token to x-auth header
fill body of requset like this :
                   {
                      "ticketID" : "2"  
                      "body" : "Hello Dear ....."
	       }
```
#### /tickets/comment    GET
Employee and Support can view a comment on specific ticket
```
you can send email with QueryParams
Address : http://localhost/tickets/comment?ticketID=3
remember set token to x-auth header

```






### Mostafa Pahlevani & Ahmad Dehestani