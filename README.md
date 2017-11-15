# Codual
### *[Technical documentation](https://docs.google.com/document/d/13zp56pdwaSIk833zA2oDcp1NFBm30PAQD_r9uSreC7o/edit?usp=sharing)*
> Codual is a website for creating and distributing online courses for beginner programming.
> Site users can join existing courses and / or create their own by placing them in the service and opening them to others.

The feature of the service is a combination of:
*  text articles
*  video lessons
* visual programming sandbox for practical programming lessons
* Students will be able to write a program with the help of visual elements and structural blocks, to run and get the result of its execution.

### Scope:
An URL to DB mLab
`mongodb://CodualWebApp:kG44fRUEEAh2GBFLAZJjcrF9@ds042527.mlab.com:42527/codual_db`
The admin's login and password: `admin:admin`

The user's login and password: `1:1`

An URL of heroku app ``http://codual.herokuapp.com``

 Реализованные возможности:
1. RESTFull server, at `{{host}}/api/v1` 
2. Login and authentication with JWT token, using webapp
3. Creation of new publication, using webapp

So, work in progress 


>## Build Setup

``` bash
# install dependencies
npm install

# compile  UI
cd client
 
# build for production with minification
npm run build

# run this application
cd .. 
npm start
```
