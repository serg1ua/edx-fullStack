from .base import *


SECRET_KEY = os.environ.get("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1"]

MEDIA_ROOT = os.path.join(BASE_DIR, "online_course/static/online_course/media")

DATABASES = {
    "default": {"ENGINE": "django.db.backends.sqlite3", "NAME": BASE_DIR / "db.sqlite3"}
}

ST_SITE_URL = "http://127.0.0.1:8000/"
