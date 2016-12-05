START TRANSACTION;
insert into author(authorId,authorName, nationality, birthDate) values(1,'Jozsef Attila','Hungarian',Date('1905-04-11'));
insert into author(authorId,authorName, nationality, birthDate) values(2,'William Shakespeare','British',Date('1564-04-23'));
insert into author(authorId,authorName, nationality, birthDate) values(3,'Ady Endre','Hungarian',Date('1877-11-22'));
insert into author(authorId,authorName, nationality, birthDate) values(4,'George Orwell','Hungarian',Date('1903-06-25'));
insert into author(authorId,authorName, nationality, birthDate) values(5,'Cavan Scott','British',Date('1973-04-17'));
insert into author(authorId,authorName, nationality, birthDate) values(6,'Tom Hiddleston','British',Date('1981-02-09'));


insert into book(bookId, title) values (1,'Romeo and Juliet');
insert into book(bookId, title) values (2,'1984');
insert into book(bookId, title) values (3,'Adventures in Wild Space');

insert into bookAuthor values(1,2);
insert into bookAuthor values(2,4);
insert into bookAuthor values(3,5);
insert into bookAuthor values(3,6);

insert into genre values('Romance',1);
insert into genre values('Novel',2);
insert into genre values('SciFi',3);

COMMIT;