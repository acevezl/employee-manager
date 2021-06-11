USE employee_manager;

INSERT INTO departments (department_id, department_name) 
VALUES (1, 'Finance'),(2, 'Operations'),(3, 'Engineering'),(4, 'Product'),(5,'Executive');

INSERT INTO roles (role_id, role_title, role_salary, department_id)
VALUES 
(1,'Financial Analyst', '65000',1),
(2,'Finance Manager', '85000',1),
(3,'Finance Assistant', '45000',1),
(4,'Ops Director', '95000',2),
(5,'Support Manager', '85000',2),
(6,'Support Analyst', '65000',2),
(7,'Web Launcher', '75000',2),
(8,'Project Manager', '75000',2),
(9,'Web Designer', '75000',2),
(10,'Software Engineer', '85000',3),
(11,'Software Engineering Manager', '95000',3),
(12,'QA Engineer ', '85000',3),
(13,'Database Admin', '75000',3),
(14,'Product Manager', '90000',4),
(15,'Program Manager', '90000',4),
(16,'Product Director', '95000',4),
(17,'CEO','500000',5);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
(1,'Elon','Tusk',17,null),
(2,'Karen','Smith',2,1),
(3,'Karyn','Johnson',1,2),
(4,'Kiran','Jones',1,2), 
(5,'Caryn','Gray',3,2), 
(6,'Kevin','Andrews',4,1), 
(7,'Keith','McGraw',5,6), 
(8,'Terry','Lewis',6,7), 
(9,'John','Kowalski',6,7), 
(10,'Tina','Labowski',7,6), 
(11,'Jenny','Macintosh',7,6), 
(12,'Jenna','Marconi',8,6), 
(13,'David','Rice',9,6), 
(14,'Paul','McGovern',11,1), 
(15,'Rita','Arnold',10,14), 
(16,'Randy','Owens',10,14), 
(17,'Reynald','Johnson',10,14),
(18,'Ron','Weissmann',10,14),  
(19,'Evan','Ramsay',10,14), 
(20,'Christina','Hecker',12,14), 
(21,'Kenya','Jackson',12,14), 
(22,'Ashley','Madison',13,14), 
(23,'Charleene','Dempsey',16,1), 
(24,'Charles','Minskopf',14,23), 
(25,'Amy','Starr',14,23),
(26,'Eva','Prince',15,23);



