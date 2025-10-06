"""API Service for Emotion Detection"""

import requests

URL = (
    "https://sn-watson-emotion.labs.skills.network/v1/"
    "watson.runtime.nlp.v1/NlpService/EmotionPredict"
)

headers = {
    "grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"
}  # headers


def request_emotion_detector(text_to_analyse: str) -> dict:
    """Request Emotion Detector API"""
    try:
        response = requests.post(
            URL,
            headers=headers,
            json={"raw_document": {"text": text_to_analyse}},
            timeout=10,
        )
        return {"status_code": response.status_code, "data": response.json()}
    except requests.exceptions.RequestException as e:
        return {"status_code": e.errno if bool(e.errno) else 500, "data": {}}
