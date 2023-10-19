
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import requests
import base64
from io import BytesIO
from PIL import Image, ImageDraw


api_key = 'acc_d65436097cef4d5'
api_secret = '54a3820956cc66082a49abca57f37355'

headers = {
    'Authorization': 'Basic ' + base64.b64encode((api_key + ':' + api_secret).encode('utf-8')).decode('utf-8')
}

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello from Flaskk!'


@app.route('/tags',methods=["POST"])
def tagging():
    data = request.get_json()
    image_base64 = data.get('image_base64', '')

    # Prepare the payload
    payload = {
        'image_base64': image_base64
    }
    try:
        response = requests.post('https://api.imagga.com/v2/tags', headers=headers, data=payload)
        return response.json()
    except Exception as api_error:
            # Handle errors related to the Imagga API request
        return jsonify({'error': 'Error in Imagga API request: ' + str(api_error)}), 500

@app.route('/face', methods=["POST"])
def face():
    image_base64 = request.form.get('image_base64', '')
    imaggg = request.files['image']

    # Prepare the payload
    payload = {
        'image_base64': image_base64
    }

    try:
        response = requests.post('https://api.imagga.com/v2/faces/detections', headers=headers, data=payload)
        response_data = response.json()

        if "result" not in response_data or "faces" not in response_data["result"]:
            return jsonify({'error': 'No faces detected in the image'}), 400

        faces = []
        for face in response_data["result"]["faces"]:
            faces.append(face)

        facez=[]
        for i in range(len(faces)):
            inn={}
            inn["coordinates"]=faces[i]["coordinates"]
            facez.append(inn)
        try:
            image_binary = Image.open(imaggg)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        draw = ImageDraw.Draw(image_binary)
        totalfaces=0
        for i in range(len(facez)):
            left_top = (facez[i]["coordinates"]["xmin"], facez[i]["coordinates"]["ymin"])
            right_bottom = (facez[i]["coordinates"]["xmax"], facez[i]["coordinates"]["ymax"])
            draw.rectangle([left_top, right_bottom], outline="red", width=2)
            totalfaces+=1

        image_bytes_io = BytesIO()
        image_binary.save(image_bytes_io, format=image_binary.format)  # Preserve the original format
        image_bytes_io.seek(0)
        image_base64z = base64.b64encode(image_bytes_io.read()).decode('utf-8')
        #image_base64z = base64.b64encode(image_binary).decode('utf-8')
        if len(facez)>0:
            return jsonify({'image': image_base64z,"faces_count":totalfaces}), 200
        else:
            return jsonify({'image': "No face detected"}), 200

    except Exception as api_error:
        # Handle errors related to the Imagga API request
        return jsonify({'error': 'Error in Imagga API request: ' + str(api_error)}), 500








