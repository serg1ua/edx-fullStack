from django.urls import path, re_path
from . import views

app_name = "online_course"
urlpatterns = [
    path(route="", view=views.CourseListView.as_view(), name="index"),
    re_path(r"^(?!admin/).*login/.*$", views.UserLoginView.as_view(), name="login"),
    path("logout/", views.UserLoginView.as_view(), name="logout"),
    path("registration/", views.UserRegistrationView.as_view(), name="registration"),
    path(
        "course_details/<int:pk>/",
        views.CourseDetailsView.as_view(),
        name="course_details",
    ),
    path("enroll/<int:course_id>/", views.EnrollmentView.as_view(), name="enroll"),
    path("course/<int:course_id>/submit", view=views.submit, name="submit"),
    path(
        "course/<int:course_id>/exam_result",
        view=views.get_exam_result,
        name="exam_result",
    ),
]
