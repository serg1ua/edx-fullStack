from django.http import HttpResponse
from django.template import loader
from django.views import generic

from ..models.course import Course

def check_if_enrolled(user, course):
    is_enrolled = False
    if user.id is not None:
        num_results = 1
        if num_results > 0:
            is_enrolled = True
    return is_enrolled

class CourseListView(generic.ListView):
    template_name = 'courses.html'
    context_object_name = 'course_list'

    def get_queryset(self):
        user = self.request.user
        courses = Course.objects.order_by('-total_enrollment')[:10]
        for course in courses:
            if user.is_authenticated:
                course.is_enrolled = check_if_enrolled(user, course)
        print("🚀 ~ courses:", len(courses))
        return courses