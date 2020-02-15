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
        event.guests.forEach(username => {
            retUsers[username] =  DatabaseManager.users[username];
        });

        // Add host too
        retUsers[event.owner] = DatabaseManager.users[event.owner];

        return retUsers;
    }

    /*Modifiers*/
    addItem(name, description, quantity, points){
        /*Add event item*/
    }

    removeItem(itemId){
        /*Remove an item*/

    }

    updateItem(item){
        /*Update an item*/

    }

    addEvent(title, date, type, owner, guests, categories){
        /*Create an event*/
    }

    removeEvent(eventId){
        /*Remove an event*/

    }

    updateEvent(event){
        /*Update an event*/

    }

    addUser(name, username, password){
        /*Create an event*/
    }

    removeUser(username){
        /*Remove an event*/

    }

    updateUser(user){
        /*Update an event*/

    }
    
}


module.exports = DatabaseManager;