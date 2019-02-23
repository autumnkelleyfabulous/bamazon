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
// connect to mysql
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    var query = "SELECT * FROM products";
    connection.query(query, function (err, results) {
        console.table(results);
        readTable();
    });

    function readTable() {
        // var query = "SELECT * FROM products";
        connection.query(query, function (err, results) {
            console.log("\n Let's Shop Bamazon! \n");
            connection.query("SELECT * FROM products", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    // console.log(res[i].itemid + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");
                    // console.log(res[i].coffee + "|" + res[i].cats + "| " + res[i].roses + " | " + res[i].cactus + "| " + res[i].IphoneChargers + "| " + res[i].coke + "| " + res[i].lightbulbs + "| " + res[i].coconuts + "| " + res[i].goldendodle + "| " + res[i].quartz + "|"); 

                }

                buyItem(res);
            })
            // ASK ITEM TO BUY
            function buyItem(res) {
                inquirer.prompt([{
                    // name: "products",
                    type: "input",
                    name: "choice",
                    message: "what are you looking for?? [press x to leave]"
                    // choices: "coffee, cats, roses, cactus, Iphone chargers, coke,light bulbs, coconuts, goldendoodle, quartz (please type your selection)"
                }]).then(function (answer) {
                    var correct = false;
                    // exit option
                    if (answer.choice.toUpperCase() == "X") {
                        process.exit();
                    }
                    for (var i = 0; i < res.length; i++) {
                        // console.log(res[i].itemid + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");
                        // console.log("-------------------------------------------------");
                        if (res[i].product_name == answer.choice) {
                            correct = true;
                            // product chosen
                            var product = answer.choice;
                            // ID#
                            var id = i;
                            // ASKS QUANTITY
                            inquirer.prompt({
                                type: "input",
                                name: "quantity",
                                message: "How many units would you like to buy?",
                                //validate function below checks to see if the value inputted is a number
                                validate: function (value) {
                                    if (isNaN(value) == false) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }

                            }).then(function (answer) {
                                //      //if number isn't less than stock quantity then the purchase is allowed to happen as well as updating the database minus the quantity purchased
                                if ((res[id].stock_quantity - answer.quantity) > 0) {
                                    connection.query("UPDATE products SET stock_quantity=' " + (res[id].stock_quantity - answer.quantity) + "' WHERE product_name='" + product + "'", function (err, res2) {
                                        console.log("Thank you for your purchase!");
                                        buyItem(res);
                                    })
                                } else {
                                    //if product is sold out or less than quantity wanting to purchase then console log below
                                    console.log("Insufficient quantity!");
                                    buyItem(res);
                                }
                                connection.end();
                            })

                       }
                     }
                 })
             }
        })
    }
});
