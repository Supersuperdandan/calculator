from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins='*')

logs = []

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

if __name__ == '__main__':
	socketio.run(app, debug = True)