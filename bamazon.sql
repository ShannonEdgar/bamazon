DROP DATABASE IF EXISTS Bamazon_db;
CREATE DATABASE Bamazon_db;
USE Bamazon_db;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,4) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)	
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	('Apple', "grocery", .89, 1),
		('Orange', "grocery", .99, 1),
		('Banana', "grocery", 1.05, 500),
		('Grapes', "grocery", 4.89, 500),
		('Carrots', "grocery", 2.89, 500),
		('Sweatshirt', "clothing", 24.00, 500),
		('T-shirt', "clothing", 15.00, 500),
		('Jeans', "clothing", 50.00, 500),
		('Jacket', "clothing", 75.00, 500),
		('Vest', "clothing", 15.00, 500);
