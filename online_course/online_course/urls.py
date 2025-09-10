from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import course_views

app_name = 'online_course'
print(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))
urlpatterns = [
    path(route='', view=course_views.CourseListView.as_view(), name='index'),
] + static(settings.STATIC_URL, document_root=settings.MEDIA_ROOT)