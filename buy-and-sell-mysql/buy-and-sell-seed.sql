-- Step 1: Create Database and Use it
-- CREATE DATABASE IF NOT EXISTS `buy-and-sell`;
ALTER USER 'hapi-server'@'%' IDENTIFIED WITH mysql_native_password BY 'Password1';

USE `buy-and-sell`;

-- Step 2: Create Table
CREATE TABLE IF NOT EXISTS `listings` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `views` DECIMAL(10,0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idnew_table_UNIQUE` (`id` ASC)
);

-- Step 3: Insert Data
INSERT INTO `listings` (id, name, description, price, user_id, views)
VALUES
  ('123', 'Guitar 1', 'My old guitar 1', 200.00, '12345', 0),
  ('124', 'Guitar 2', 'My old guitar 2', 300.00, '12345', 0),
  ('125', 'Guitar 3', 'My old guitar 3', 400.00, '12345', 0);
