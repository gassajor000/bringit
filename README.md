bringIt!
====

Collaborative event planning app for coordinating who brings what.

## Database Schema
### Tables
```
// All tables are indexed by id (eventId, itemId, username)
events
items
users
```

### Event
```javascript
{
    'id': string,
    'title': string,
    'date': string,
    'type': string,
    'owner': username,
    'guests': [username],
    'categories': {
        categoryName: [itemId]
    }
}
```

### Item
```javascript
{
    'id': string,
    'name': string,
    'description': string,
    'quantity': int,
    'points': int,
    'claimedBy': [username: quantity];
}
```

### User
```javascript
{
    'username': string, // Must be unique
    'name': string,
    'password': string,
}
```
