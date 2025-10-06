"""Flask server for Emotion Detection App"""

import json
from flask import Flask, render_template, request, make_response
from dotenv import load_dotenv

from services import emotion_detector

load_dotenv()

app = Flask(__name__)


@app.route("/")
def render_index_page():
    """Render index page"""
    return render_template("index.html")


@app.route("/sentimentAnalyzer", methods=["GET"])
def sentiment_analyzer():
    """Sentiment Analyzer Endpoint"""
    params_dict = request.args.to_dict()
    if "textToAnalyze" not in params_dict or not params_dict["textToAnalyze"]:
        response_message = {
            "message": "Invalid text! Please try again!",
        }
        return make_response(json.dumps(response_message), 400)

    text_to_analyse = params_dict["textToAnalyze"]
    emotion_data = emotion_detector(text_to_analyse)

    if (
        emotion_data["status_code"] != 200
        or emotion_data["data"]["dominant_emotion"] is None
    ):
        return make_response(
            {"message": "Invalid text! Please try again!"},
            emotion_data["status_code"],
        )

    dominant_emotion = emotion_data["data"]["dominant_emotion"]
    del emotion_data["data"]["dominant_emotion"]

    return {
        "message": f"""For given statement, the system response is \
        {", ".join([f"'{key}': {value}" for key, value in list(emotion_data["data"].items())])}. \
        The dominant emotion is <strong>{dominant_emotion}</strong>."""
    }


if __name__ == "__main__":
    app.run(debug=True)
