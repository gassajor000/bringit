users = require('./database/users.json');
events = require('./database/events.json');
items = require('./database/items.json');

class DatabaseManager {
    constructor(){
        if (!DatabaseManager.initialized){
            DatabaseManager.users = users;
            DatabaseManager.events = events;
            DatabaseManager.items = items;
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
        var items = [];
        for(const category in Object.values(event.categories)){
            for(const itemId in category){
                items.push(DatabaseManager.items[itemId]);
            }
        }

        return items;
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