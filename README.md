# API Reference

This REST API is useful to bot developers who want to resolve a username to get the userid of a Telegram user.

_This API depends on a bot ([ThorsHammer](https://telegram.me/ThorsHammerBot)) to collect this data. As at the time of writting this the bot had 55k+ cached users. To improve this service I recommend all users to add the bot to groups as it serves 2 advantages:_
- _Protects the group from Globally Banned Users by sending a message when a banned user joins the group_
- _Allows the database to grow making this API much better_

 The data sent from this API, back and forth is formatted in JSON and the API itself is unauthenticated.
 
 #### Base URL
 
 ```
🔒 https://tgrest.herokuapp.com/api
```


#### API Endpoints


```bash
GET /users
```
Returns a list of all cached users in the structure below:

```javascript
[{
	userid: "135207785",
	name: "Kamikaze",
	username: "kamikazechaser",
	timestamp: "September 6th 2016, 2:02:06 pm"
}, {
.
.
. // Alot of users here 
.
.
}, {
	userid: "58258161",
	name: "gochomugo",
	username: "gochomugo",
	timestamp: "September 6th 2016, 3:37:04 pm"
}]

```
**************************************************************************
```bash
GET /users:username
```
Returns an object of the user in the structure below:
```javascript
{
userid: "135207785",
name: "Kamikaze",
username: "kamikazechaser",
timestamp: "September 6th 2016, 2:02:06 pm"
}
````

*************************************************************************
#### Data

Field | Description 
--- | --- 
**userid** | Unique Telegram identifier
**username** | Unique username
**name** | First name of user at time of caching
**timestamp** | Date and time the user was cached