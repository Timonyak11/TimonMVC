const database = require('../config/databaseConfig');

class Database{
    static queries = [];

    execQuery(query, values = null){
        let index = 0;
        let queryArray = query.split('');
        for(let i = 0; i < queryArray.length; i++){
            if(queryArray[i] == '?'){
                queryArray[i] = "'" + values[index] + "'";
                index++;
            }
        }
        let newQuery = queryArray.join('');
        Database.queries.push(newQuery);
        return new Promise((resolve, reject) => database.query(newQuery, function(err, rows){
            if(err){
                resolve(err);
            } else{
                resolve(rows);
            }
        }));
    }
}

module.exports = Database;