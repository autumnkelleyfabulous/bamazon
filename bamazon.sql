-- Drops the bamazon_db if it already exists --
DROP DATABASE IF EXISTS bamazon_DB;
-- Create a database called bamazon_db --
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

-- Use programming db for the following statements --
USE bamazon_DB;

  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
  
  CREATE TABLE products (
  item_id INTEGER(50) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR (100)NOT NULL,
  departmant_name VARCHAR (100) NOT NULL,
  price DECIMAL (10,2)NOT NULL,
  stock_quantity DECIMAL (10,4) NOT NULL,
  primary key (item_id)
);
 


SELECT * FROM bamazon_DB.products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee","grocery", 10.00, 97),
	   ("cats","pets", 70.00, 65),
       ("roses","plants", 30.00, 46),
	   ("cactus","plants", 7.00, 50),
       ("Iphone chargers","electronics", 15.00, 34),
	   ("coke","grocery", 3.00, 87),
	   ("light bulbs","miscellaneous", 8.00, 42),
	   ("coconuts","pets", 13.00, 50),
       ("goldendoodle","pets", 99.00, 5),
	   ("quartz","miscellaneous", 19.00, 9)



