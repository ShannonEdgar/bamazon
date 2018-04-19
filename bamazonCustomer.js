var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});


function start() {
  inquirer.prompt({
      name: "displayTable",
      type: "confirm",
      message: "Would you like to see the items in our store?",
    })
    .then(function(answer) {
      if (answer.displayTable) {
        showTable();
      }
      else {
      	console.log("Ok, goodbye");
      	connection.end();
      }
    });
}


function showTable() {
	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  ||  ';
			strOut += 'Product Name: ' + data[i].product_name + '  ||  ';
			strOut += 'Department: ' + data[i].department_name + '  ||  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
			
		}
	})
	getOrder()
}



function getOrder() {
  inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "Enter the ID of the item you would to buy below."
      },
      {
        name: "units",
        type: "input",
        message: "How many units of that item would you like?"
        }
    ])
     .then(function(answer) {
     	var item = answer.id;
     	var quantity = answer.units;


     	var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('Please select a valid Item ID.');
		

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed. Your total is $' + productData.price * quantity);
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log('Sorry, we do not have enough of that item.');
					console.log("\n---------------------------------------------------------------------\n");
				}
			}
		})
	})
}




     






