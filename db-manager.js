init_data = require('./mock-event.json');

class DatabaseManager {
    constructor(){
        if (!DatabaseManager.database){
            DatabaseManager.database = init_data;
        }
    }

    getDatabase(){
        /*Return a pointer to the database*/
        return DatabaseManager.database;
    }

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