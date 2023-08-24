CREATE DATABASE myShop_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    password_salt VARCHAR(50) NOT NULL,
    user_role VARCHAR(50) NOT NULL
);

CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    client_name VARCHAR(30) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    client_address VARCHAR(100) NOT NULL,
    zip_code VARCHAR(6) NOT NULL,
    city VARCHAR(80) NOT NULL
);

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount FLOAT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    product_description TEXT,
    photo_url VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL 
);

CREATE TABLE articles_for_sale (
    article_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    sale_id INT,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id)
);