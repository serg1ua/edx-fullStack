"""Mock responses for testing emotion detection service"""

joy_mock = {
    "emotionPredictions": [
        {
            "emotion": {
                "anger": 0.06755598,
                "disgust": 0.04010958,
                "fear": 0.10141187,
                "joy": 0.29300702,
                "sadness": 0.19609329,
            }
        }
    ]
}

anger_mock = {
    "emotionPredictions": [
        {
            "emotion": {
                "anger": 0.36755598,
                "disgust": 0.04010958,
                "fear": 0.10141187,
                "joy": 0.29300702,
                "sadness": 0.19609329,
            }
        }
    ]
}

disgust_mock = {
    "emotionPredictions": [
        {
            "emotion": {
                "anger": 0.06755598,
                "disgust": 0.34010958,
                "fear": 0.10141187,
                "joy": 0.29300702,
                "sadness": 0.19609329,
            }
        }
    ]
}
fear_mock = {
    "emotionPredictions": [
        {
            "emotion": {
                "anger": 0.06755598,
                "disgust": 0.04010958,
                "fear": 0.50141187,
                "joy": 0.19300702,
                "sadness": 0.19609329,
            }
        }
    ]
}

sadness_mock = {
    "emotionPredictions": [
        {
            "emotion": {
                "anger": 0.06755598,
                "disgust": 0.04010958,
                "fear": 0.10141187,
                "joy": 0.09300702,
                "sadness": 0.59609329,
            }
        }
    ]
}
