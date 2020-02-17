'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-02-16T02:04:58.650Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "FirstName": {
                "type": Sequelize.STRING,
                "field": "FirstName",
                "allowNull": false
            },
            "LastName": {
                "type": Sequelize.STRING,
                "field": "LastName",
                "allowNull": false
            },
            "Email": {
                "type": Sequelize.STRING,
                "field": "Email",
                "allowNull": false,
                "unique": true
            },
            "Username": {
                "type": Sequelize.STRING,
                "field": "Username",
                "allowNull": false,
                "unique": true
            },
            "Password": {
                "type": Sequelize.STRING,
                "field": "Password",
                "allowNull": false
            },
            "Admin": {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "defaultValue": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
