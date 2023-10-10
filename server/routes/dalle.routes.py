import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Replace 'YOUR_MONSTER_API_KEY' with your actual Monster API key
MONSTER_API_KEY = 'SADIYA_1109'  # Replace with your Monster API key

@app.route('/generate-image', methods=['POST'])
def generate_image():
    try:
        text = request.json['text']  # Receive text from the client

        # Make a request to the Monster API to generate an image
        response = requests.post(
            'https://api.monsterapi.ai/v1/generate/txt2img',
            headers={
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer {MONSTER_API_KEY}'
            },
            json={'text': text}
        )

        if response.status_code == 200:
            result = response.json()
            # The generated image URL will be in result['data']['image_url']

            return jsonify({'image_url': result['data']['image_url']})

        return jsonify({'error': 'Image generation failed'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
