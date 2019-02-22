var mysql = require("mysql");

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "F@bulous123",
    database: "bamazon_DB"
});

connection.connect(function (err) {
            if (err) throw err;
            console.log("connected as id " + connection.threadId);
            var query = "SELECT * FROM products";
            connection.query(query, function (err, results) {
                console.table(results);
            });
        
            function buyItem() {
                inquirer.prompt({

                                name: "products",
                                type: "list",
                                message: "what are you looking for??",
                                choices: ["coffee", "cats", "roses",
                                "cactus", "Iphone chargers", "coke",
                                "light bulbs", "coconuts", "goldendoodle", "quartz"],
                
                }
                            .then(function (answer) {
                                    var query = "SELECT * FROM products";
                                    connection.query(query, {
                                        quantity: answer.quantity
                                    }, function (err, results) {
                                        for (var i = 0; i < results.length; i++) {
                                            console.log("coffee: " + results[i].coffee + "\ncats: " + results[i].cats + "\nroses: " + results[i].roses + "\ncactus: " + results[i].cactus + "\nIphoneChargers: " + results[i].IphoneChargers + "\ncoke: " + results[i].coke + "\nlightbulbs: " + results[i].lightbulbs + "\ncoconuts: " + results[i].coconuts + "\ngoldendoodle: " + results[i].goldendodle + "\nquartz: " + results[i].quartz + "\n--------");
                                        

                                        for (var i = 0; i < res.length; i++) {
                                            //if product name equals to one of the selections then returns true for purchase
                                            if (res[i].product_name == answer.choice) {
                                                correct = true;
                                                //product = choice the buyer made
                                                var product = answer.choice;
                                                //id of the item
                                                // var id = i;
                                                //asks user how many of the item which they chose they would like to purchase


                                                inquirer.prompt({
                                                    type: "input",
                                                    name: "quantity",
                                                    message: "How many would you like to buy?",
                                                    //validate function below checks to see if the value inputted is a number
                                                    validate: function (value) {
                                                        if (isNaN(value) == false) {
                                                            return true;
                                                        } 
                                                        else {
                                                            return false;
                                                        }
                                                    }
                                                })
                                                .then(function (answer) {
                                                    //if number isn't less than stock quantity then the purchase is allowed to happen as well as updating the database minus the quantity purchased
                                                    if ((res[id].stock_quantity - answer.quantity) > 0) {
                                                        connection.query("UPDATE products SET stock_quantity=' " + (res[id].stock_quantity - answer.quantity) + "' WHERE product_name='" + product + "'", function (err, res2) {
                                                            console.log("Thank you for your purchase!");
                                                            purchaseItem(res);
                                                        })
                                                    } else {
                                                        //if product is sold out or less than quantity wanting to purchase then console log below
                                                        console.log("Insufficient quantity!");
                                                        purchaseItem(res);
                                                    }
                                                });
                                                runSearch();
                                         connection.end();
                                            });
                                        });
                                
                                    }