"""Test Emotion Detection Service"""

import unittest
from unittest.mock import patch, MagicMock

from services.emotion_detection import emotion_detector
from .test_response_mock import (
    joy_mock,
    anger_mock,
    disgust_mock,
    fear_mock,
    sadness_mock,
)


class TestEmotionDetection(unittest.TestCase):
    """Emotion Detection Tests Class"""

    @patch("services.api.requests.post")
    def test_emotion_detector(self, mock_post):
        """Test emotion_detector function"""
        text = "I am glad this happened"
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = joy_mock
        mock_post.return_value = mock_response

        result = emotion_detector(text)
        self.assertEqual(result["status_code"], 200)
        self.assertIn("dominant_emotion", result["data"])
        self.assertEqual(result["data"]["dominant_emotion"], "joy")

        text = "I am really mad about this"
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = anger_mock
        mock_post.return_value = mock_response

        result = emotion_detector(text)
        self.assertEqual(result["status_code"], 200)
        self.assertIn("dominant_emotion", result["data"])
        self.assertEqual(result["data"]["dominant_emotion"], "anger")

        text = "I feel disgusted just hearing about this"
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = disgust_mock
        mock_post.return_value = mock_response

        result = emotion_detector(text)
        self.assertEqual(result["status_code"], 200)
        self.assertIn("dominant_emotion", result["data"])
        self.assertEqual(result["data"]["dominant_emotion"], "disgust")

        text = "I am so sad about this"
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = sadness_mock
        mock_post.return_value = mock_response

        result = emotion_detector(text)
        self.assertEqual(result["status_code"], 200)
        self.assertIn("dominant_emotion", result["data"])
        self.assertEqual(result["data"]["dominant_emotion"], "sadness")

        text = "I am really afraid that this will happen"
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = fear_mock
        mock_post.return_value = mock_response

        result = emotion_detector(text)
        self.assertEqual(result["status_code"], 200)
        self.assertIn("dominant_emotion", result["data"])
        self.assertEqual(result["data"]["dominant_emotion"], "fear")
