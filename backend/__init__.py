from flask import Flask, render_template
from flask_socketio import SocketIO, emit

def create_app():
	app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")
	app.config['SECRET_KEY'] = 'mysecret'
	socketio = SocketIO(app, cors_allowed_origins='*')

	logs = []

	# @app.route('/ping')
	# def ping():
	#     socketio.emit('ping event', {'data': 42}, namespace='/chat')

	@socketio.on('connect')
	def connect():
		print("New client connected! Update calculation logs.")
		emit('update', logs, broadcast=True)

	@socketio.on('handleCalculationLogs')
	def handleCalculationLogs(data):
		data = ''.join(data.split())
		logs.append(data)
		if len(logs) > 10:
			logs.pop(0)
		print("Update " + data + ". len(logs) <= 10 = " + str(len(logs) <= 10))
		emit("update", logs, broadcast=True)

	@socketio.on('disconnect')
	def disconnect():
		print("Client disconnected")

	@app.route('/', defaults={'path': ''})
	@app.route('/<path:path>')
	def index(path):
		return render_template('index.html')

	return app

# if __name__ == '__main__':
# 	socketio.run(app, host='0.0.0.0', port=5000, debug = True)