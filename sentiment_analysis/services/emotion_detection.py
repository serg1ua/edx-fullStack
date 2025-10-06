"""Emotion Detection Service"""

from .api import request_emotion_detector


def emotion_detector(text_to_analyse: str) -> dict:
    """Detect emotion from given text"""
    response = request_emotion_detector(text_to_analyse)

    if response["status_code"] != 200:
        return {
            "status_code": response["status_code"],
            "data": {
                "joy": None,
                "anger": None,
                "disgust": None,
                "fear": None,
                "sadness": None,
                "dominant_emotion": None,
            },
        }

    emotion_data = response["data"]["emotionPredictions"][0]["emotion"]
    emotion_data["dominant_emotion"] = next(
        (
            key
            for key, val in emotion_data.items()
            if val == max(list(emotion_data.values()))
        ),
        None,
    )
    return {
        "status_code": response["status_code"],
        "data": emotion_data,
    }
