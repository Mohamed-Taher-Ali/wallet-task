create database taskdb;
use taskdb;


create table users(
id int auto_increment primary key,

name text not null,
mobile text not null,
password text not null,

createdAt datetime,
updatedAt datetime
);


create table wallets(
id int auto_increment primary key,

transactionId int not null,

userId int not null,
amount numeric not null,

createdAt datetime,
updatedAt datetime

FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (transactionId) REFERENCES transactions(id),
);


create table transactions(
id int auto_increment primary key,

transactionType text not null,

fromUserId int not null,
toUserId int not null,

amount numeric not null,

createdAt datetime,
updatedAt datetime
);