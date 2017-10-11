# fullstack

This project is web application for tracking the movie details of the entered of the form in tabular manner using reactjs at frontend python at backend and mysql database and the application is created for centos:7 operating system

1.Installation steps for packages

  a.Install mysql database server in centos machine use the below link for the guidance
  https://www.linode.com/docs/databases/mysql/how-to-install-mysql-on-centos-7
  
    set the username - root
    password - admin
    databse name - MOVIES_DATA_SET

  b.python2.7.6
  c.pip python package manager
  d.using pip install python packages using below command
    pip install gevent,Flask
==================================================================================================================================
2.Create three tables inside MOVIES_DATA_SET database 

using the command

CREATE TABLE movie_details
(
  movie_id INT NOT NULL ,
  movie_name VARCHAR(40) NOT NULL , 
  movie_url VARCHAR(40) NOT NULL , 
  movie_release_date VARCHAR(40) NOT NULL , 
  movie_genere VARCHAR(40) NOT NULL ,
  movie_lead_actor VARCHAR(40) NOT NULL ,
  movie_director VARCHAR(40) NOT NULL ,
  PRIMARY KEY ( movie_id )
 )
 
 CREATE TABLE lead_actor_details
(
  movie_lead_actor_id INT NOT NULL AUTO_INCREMENT,
  movie_lead_actor VARCHAR(40) NOT NULL  
  PRIMARY KEY ( movie_id )
 )
 
 CREATE TABLE director_details
(
  movie_director_id INT NOT NULL AUTO_INCREMENT,
  movie_director VARCHAR(40) NOT NULL  
  PRIMARY KEY ( movie_id )
 )
 
 3.Clone the repository
 =======================================================================
 4.Run the python script using command python fullstack.py
 ========================================================================
 5.Browse hostname:8070(example localhost:8070)
 ========================================================================
 
 Custom files
 
 1.python file 
  fullstack.py
  ========================================================================
 2.css file
  static/css/mystyle.css
  ========================================================================
 3.html files
  templates/index.html
  =======================================================================
 4.React Component files
  static/js/movie-skills-set/MainPageComponent.jsx
  static/js/movie-skills-set/MovieDetailsComponent.jsx
  static/js/movie-skills-set/MovieFormComponent.jsx
  static/js/movie-skills-set/MovieListComponent.jsx
  =======================================================================
 
 

