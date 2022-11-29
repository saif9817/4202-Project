import time
from flask_cors import CORS, cross_origin
from flask import Flask
from flask import request

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/time')
@cross_origin()
def get_current_time():
    
    print("origin - ", request.args.get("origin"))
    print("destination - ", request.args.get("destination"))

    return {'time': time.time()}