import flask, json
from flask_cors import CORS
import sqlite3
from contextlib import closing


#Basic BE made in Flask, got 4 routes for 2 for POST and 2 for GET
#first 2 routes are for chats specifically, messages in chats with information about senders and recipients
#from the sqlite3 databate, specifically chats.db
#second 2 routes are from chats as a whole, they returns available chats for the user that requests them
#post functions as an adder for a chat, this route is called when someone adds a person to chat with

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = False


@app.route('/api/get', methods=['GET'])    #requesting all messages in a speficied chat, specifications come from parameters in url
def onGet():
    username = flask.request.args.get('name')
    other_user = flask.request.args.get('other') 
    if other_user!='n':
        with closing(sqlite3.connect("chats.db")) as connection:
            with closing(connection.cursor()) as cursor:
                chatsFromDB = cursor.execute("SELECT DISTINCT sender, recipient, message FROM chats WHERE (sender=? and recipient=?) or (sender=? and recipient=?)",(username, other_user, other_user, username)).fetchall()
                chatsFromDB = [{'sender':msg[0], 'recipient':msg[1], 'message':msg[2]} for msg in chatsFromDB]
                return flask.jsonify(chatsFromDB)
    else:
        return {}


@app.route('/api/post', methods = ['POST'])    #adding a message with a sender and recipient to the database after calling
def onPost():
    received = flask.request.get_json()
    with closing(sqlite3.connect("chats.db")) as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute("INSERT INTO chats VALUES (?, ?, ?)",(received['sender'], received['recipient'], received['message']) )
            connection.commit()

    return 'Sucesss', 200

@app.route('/api/getchat', methods=['GET'])    #requesting people the user chats with
def onGetChatters():
    username = flask.request.args.get('name')
    with closing(sqlite3.connect("chatters.db")) as connection:
            with closing(connection.cursor()) as cursor:
                chats = cursor.execute("SELECT DISTINCT sender, recipient FROM chatters WHERE (sender=? or recipient=?)",(username, username)).fetchall()
                #print(chats)
                chats = [x for x in [y for y in chats]]

                return flask.jsonify(chats)

@app.route('/api/postchat', methods = ['POST'])  #adding a person to chat with
def onPostChatters():
    received = flask.request.get_json()
    with closing(sqlite3.connect("chatters.db")) as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute("INSERT INTO chatters VALUES (?, ?)",(received['username'], received['other_user_name']) )
            connection.commit()
    return 'Sucesss', 200


@app.errorhandler(404) #error handler for unused paths
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.route('/')
def home():
    return flask.render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  #host='0.0.0.0' is for flask to listen on public port, but it doesn't work this way, you have to run the server with flask run --host=0.0.0.0