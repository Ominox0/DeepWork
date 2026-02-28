from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Serve index.html from the root directory
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

# Serve other static files (css, js) from the root directory
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == "__main__":
    app.run(debug=True)
