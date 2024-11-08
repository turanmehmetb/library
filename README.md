# Library API

> `npm i` to install dependencies.
> `npm run start` to run the application.

### DDL Scripts:

```
CREATE DATABASE library_db;
use library_db;

CREATE TABLE `rating` (`id` int NOT NULL AUTO_INCREMENT, `userScore` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `bookId` int NULL, `borrowRecordId` int NULL, UNIQUE INDEX `REL_504f704a4ad223715a40a4457d` (`borrowRecordId`), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `borrow_record` (`id` int NOT NULL AUTO_INCREMENT, `borrowDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `returnDate` datetime NULL, `userId` int NULL, `bookId` int NULL, `ratingId` int NULL, UNIQUE INDEX `REL_b7aa6704563797d162632264a6` (`ratingId`), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB;
ALTER TABLE `rating` ADD CONSTRAINT `FK_a6c53dfc89ba3188b389ef29a62` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `rating` ADD CONSTRAINT `FK_2ab7f7fc5b63b0147591ba69032` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `rating` ADD CONSTRAINT `FK_504f704a4ad223715a40a4457d7` FOREIGN KEY (`borrowRecordId`) REFERENCES `borrow_record`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `borrow_record` ADD CONSTRAINT `FK_039a56f88d9fd9c6015c640a5b2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `borrow_record` ADD CONSTRAINT `FK_8032acbf1eb063876edcf49e96c` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `borrow_record` ADD CONSTRAINT `FK_b7aa6704563797d162632264a68` FOREIGN KEY (`ratingId`) REFERENCES `rating`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
```