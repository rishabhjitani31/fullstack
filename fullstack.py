__author__ = 'Crest Systems'

from flask import Flask, render_template, request, jsonify
import logging
from logging.handlers import RotatingFileHandler
import MySQLdb
import ast
import gevent.pywsgi

app = Flask(__name__)

#Making the connection to the database
db = MySQLdb.connect("localhost", "root", "admin", "MOVIES_DATA_SET")
cursor = db.cursor(MySQLdb.cursors.DictCursor)

#Renders to the main html page on hitting this url
@app.route('/', methods=['GET'])
def main_page():
    return render_template('index.html')

#add the new movie details to the movie_details table
@app.route('/addmoviedetails', methods=['POST'])
def add_movie_details():
    dict = {}
    movie_id = request.args.get('movie_id')
    movie_name = request.args.get('movie_name')
    movie_url = request.args.get('movie_url')
    movie_release_date = request.args.get('movie_release_date')
    movie_genere = request.args.get('movie_genere')
	movie_lead_actor = request.args.get('movie_lead_actor')
	movie_director = request.args.get('movie_director')

    movie_id = int(movie_id)
    movie_name = str(movie_name)
    movie_url = str(movie_url)
    movie_release_date = str(movie_release_date)
    movie_genere = str(movie_genere)
	movie_lead_actor = str(movie_lead_actor)
	movie_director = str(movie_director)

    #Mysql query for inserting new movie records to the movie_details table
    sql = "INSERT INTO movie_details" \
          "(movie_id,movie_name,movie_url,movie_release_date,movie_genere,movie_lead_actor,movie_director)" \
          "VALUES('%d','%s','%s','%s','%s','%s','%s')" % \
          (movie_id, movie_name, movie_url, movie_release_date, movie_genere,movie_lead_actor,movie_director)
	
	sql_movie_lead_actor = "INSERT INTO lead_actor_details" \
						   "(movie_lead_actor)" \
						   "VALUES('%s')" % \
						   (movie_lead_actor)
	
	sql_movie_director =  "INSERT INTO director_details" \
						   "(movie_director)" \
						   "VALUES('%s')" % \
						   (movie_director)
    try:
        cursor.execute(sql)
		cursor.execute(sql_movie_lead_actor)
		cursor.execute(sql_movie_director)
        db.commit()
        dict['status'] = "success"
        dict['message'] = "Successfully added records to the database"
        dict['reason'] = "Valid Data"
        return jsonify(dict)

    except(MySQLdb.Error, MySQLdb.Warning) as e:
        app.logger.error("Failed to execute mysql query ", e)
        dict['status'] = "failure"
        dict['message'] = "Failed to add records to the database"
        dict['reason'] = "Duplicate Data"
        return jsonify(dict)

#View the movie details of movie_details table
@app.route('/viewmoviedetails', methods=['GET'])
def view_movie_details():
    final_dict = {}
    final_list = []
    dict_result = {}
    list_of_headers = ["movie_id", "movie_name", "movie_url", "movie_release_date", "movie_genere","movie_lead_actor","movie_director"]

    #Mysql query for viewing all the details of movie_details table
    sql = """SELECT * FROM movie_details"""
	sql_lead_acror = """SELECT movie_lead_actor from lead_actor_details"""
	sql_movie_director = """SELECT movie_director from director_details"""
	
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
		cursor.execute(sql_lead_acror)
		resultleadadactor = cursor.fetchall()
		cursor.execute(sql_movie_director)
		resultdirector = cursor.fetchall()
        final_list = list(results)
		list_actor = list(resultleadactor)
		list_director = list(resultdirector)
        db.commit()
		dict_result['headers'] = list_of_headers
        dict_result['response_data'] = final_list
		dict_result['respone_actor'] = list_actor
		dict_result['response_director'] = list_director
        final_dict['status'] = "success"
        final_dict['message'] = "successfully fetched the records"
        final_dict['data'] = dict_result
        return jsonify(final_dict)

    except(MySQLdb.Error, MySQLdb.Warning) as e:

        app.logger.error("Failed to execute mysql query ", e)
        final_dict['status'] = "failure"
        final_dict['message'] = "Failed to add records to the database"
        final_dict['response_data'] = []
        return jsonify(final_dict)


#Update the movie details of movie_details table
@app.route('/updatemovieedetails', methods=['PUT'])
def update_movie_details():
    dict = {}
	
	movie_id = request.args.get('movie_id')
    movie_name = request.args.get('movie_name')
    movie_url = request.args.get('movie_url')
    movie_release_date = request.args.get('movie_release_date')
    movie_genere = request.args.get('movie_genere')
	movie_lead_actor = request.args.get('movie_lead_actor')
	movie_director = request.args.get('movie_director')

    movie_id = int(movie_id)
    movie_name = str(movie_name)
    movie_url = str(movie_url)
    movie_release_date = str(movie_release_date)
    movie_genere = str(movie_genere)
	movie_lead_actor = str(movie_lead_actor)
	movie_director = str(movie_director)

    #Mysql query for updating the details of movie_details table
    sql = "UPDATE movie_details SET movie_name='%s',movie_url='%s',movie_release_date='%s',movie_genere='%s',movie_lead_actor='%s',movie_director='%s'where movie_id='%d'" % \
          (movie_name, movie_url, movie_release_date,movie_genere,movie_lead_actor,movie_director)
    try:
        cursor.execute(sql)
        db.commit()
        dict['status'] = "success"
        dict['message'] = "successfully updated the database"
        return jsonify(dict)

    except(MySQLdb.Error, MySQLdb.Warning) as e:

        app.logger.error("Failed to execute mysql query ", e)
        dict['status'] = "failure"
        dict['message'] = "Failed to update the database"
        return jsonify(dict)

#Delete the whole details of movie_details table
@app.route('/deletemoviedetails', methods=['DELETE'])
def delete_movie_details():
    dict = {}
    movie_id = request.args.get('movie_id')
    movie_id = int(movie_id)
    
	#mysql query for deleting the details of movie_details table
    sql = "delete from movie_details where movie_id='%d'"%(movie_id)
    try:
        cursor.execute(sql)
        db.commit()
		dict['status'] = "success"
        dict['message'] = "successfully updated the database"
        return jsonify(dict)
        
   
    except(MySQLdb.Error, MySQLdb.Warning) as e:

        app.logger.error("Failed to execute mysql query ", e)
        dict['status'] = "failure"
        dict['message'] = "Failed to delete value from  the database"
        return jsonify(dict)



if __name__ == '__main__':
    # logger file named as error.log will be created on exception with 1 replica
    logHandler = RotatingFileHandler('logs/error.log', maxBytes=1000, backupCount=1)
    app.logger.setLevel(logging.ERROR)
    app.logger.addHandler(logHandler)
    # the port on which app will run
    port = 8070
    gevent_server = gevent.pywsgi.WSGIServer(('', 8070),app)
    gevent_server.serve_forever()
    #app.run(host='0.0.0.0', port=port)
