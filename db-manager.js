initUsers = require('./database/users.json');
initEvents = require('./database/events.json');
initItems = require('./database/items.json');

class DatabaseManager {
    constructor(){
        if (!DatabaseManager.initialized){
            DatabaseManager.users = initUsers;
            DatabaseManager.events = initEvents;
            DatabaseManager.items = initItems;
            DatabaseManager.initialized = true;
        }
    }
    /*Getters*/
    getUser(username){
        return DatabaseManager.users[username];
    }

    getUserFriends(username){
        // TODO: nuke passwords and filter by user's friends 
        return DatabaseManager.users;
    }
    
    getEvent(eventId){
        return DatabaseManager.events[eventId];
    }
    
    getItem(itemId){
        return DatabaseManager.items[itemId];
    }
    
    getEventsForUser(username){
        /*Returns all events for the specified user in an array []*/
        var user_events = Object.values(DatabaseManager.events).filter(event => event.owner === username);

        return user_events;
    }
    
    getItemsForEvent(eventId){
        var event = DatabaseManager.events[eventId];
        var retItems = {};
        for(var category in event.categories){
            event.categories[category].forEach(itemId => {
                retItems[itemId] =  DatabaseManager.items[itemId];
            });
        }

        return retItems;
    }
    
    getUsersForEvent(eventId){
        var event = DatabaseManager.events[eventId];
        var retUsers = {};

        if(!event.guests){
            return retUsers;
        }

        event.guests.forEach(username => {
            retUsers[username] =  DatabaseManager.users[username];
        });

        // Add host too
        retUsers[event.owner] = DatabaseManager.users[event.owner];

        return retUsers;
    }

    /*Modifiers*/
    addItem(name, description, quantity, points, category, eventId){
        /*Add event item*/
                
        var item = {
            "id": Date.now(),   // Make an id somehow
            "name": name,
            "description": description,
            "quantity": quantity,
            "points": points,
            "claimedBy": {}
        }
        DatabaseManager.items[item.id] = item;
        DatabaseManager.events[eventId].categories[category].push(item.id);
    }

    removeItem(itemId){
        /*Remove an item*/
        delete DatabaseManager.items[itemId]
    }

    updateItem(item){
        /*Update an item*/


    }

    claimItem(itemId, username, quantity){
        /* Assign user as bringing an item*/
        if(quantity === 0){
            delete DatabaseManager.items[itemId].claimedBy[username]; 
        } else {
            DatabaseManager.items[itemId].claimedBy[username] =  quantity; 
        }
    }

    addEvent(title, date, type, owner, guests, categories){
        /*Create an event*/
        DatabaseManager.event.push({
            id: Date.now(),
            title: title,
            date: date,
            type: type,
            owner: owner,
            guests: guests,
            categories: catagories
        })
    }

    removeEvent(eventId){
        /*Remove an event*/
        delete DatabaseManager.events[eventId];
    }

    updateEvent(title, date, type, guests, eventId){
        var oldGuests = this.getUsersForEvent(eventId);
        var event = DatabaseManager.events[eventId];

        var removedGuests = Object.values(oldGuests).filter(g => !guests.includes(g.username) && g.username != event.owner);

        // If any users were removed, remove them from all the items they had claimed.
        if(removedGuests.length > 0){
            var items = this.getItemsForEvent(eventId);
            removedGuests.forEach(rGuest =>{
                for(var itemId in items){
                    if(rGuest.username in items[itemId].claimedBy){
                        delete DatabaseManager.items[itemId].claimedBy[rGuest.username];
                    }
                }
            });
        }

        /*Update an event*/
        DatabaseManager.events[eventId].title = title;
        DatabaseManager.events[eventId].date = date;
        DatabaseManager.events[eventId].type = type;
        DatabaseManager.events[eventId].guests = guests;
    }

    addUser(name, username, password){
        /*Create an event*/
        DatabaseManager.users.push({
            username: username,
            name: name,
            password: password
        })
    }

    removeUser(username){
        /*Remove an event*/
        delete DatabaseManager.users[username];

    }

    updateUser(user){
        /*Update an event*/

    }

    addCategory(category, eventId) {
        DatabaseManager.events[eventId].categories[category] = [];
    }

    removeCategory(category) {
        delete DatabaseManager.events[eventId].categories[category];
    }

    
    
}


module.exports = DatabaseManager;