from functools import reduce
from django import forms
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.http.response import HttpResponse as HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.urls import reverse
from django.views import generic

from .forms import LoginForm, RegistrationForm
from .models import Choice, Course, Enrollment, Submission


def check_if_enrolled(user, course):
    is_enrolled = False
    if user.id is not None:
        num_results = Enrollment.objects.filter(user=user, course=course).count()
        if num_results > 0:
            is_enrolled = True
    return is_enrolled


def get_choices(choices, is_correct):
    return list(filter(lambda ch: ch["is_correct"] == is_correct, choices))


# User registration
class UserRegistrationView(generic.View):
    initial = {}
    form_class = RegistrationForm
    template_name = "online_course/registration.html"

    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            return redirect("online_course:index")
        return render(request, self.template_name)

    def post(self, request):
        form = self.form_class(request.POST)
        if not form.is_valid():
            messages.error(request, message="Invalid form data.")
            return redirect("online_course:registration")

        username = request.POST.get("username")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        password = request.POST.get("password")

        try:
            user = User.objects.create_user(
                username=username,
                first_name=first_name,
                last_name=last_name,
                password=password,
            )
            login(request, user)
            return redirect("online_course:index")
        except:
            messages.error(request, message="User already exists")
            return redirect("online_course:registration")


# User login
class UserLoginView(generic.View):
    initial = {}
    form_class = LoginForm
    template_name = "online_course/login.html"

    def get(self, request):
        logout(request)
        if "logout" in request.path:
            return redirect("online_course:index")
        return render(request, self.template_name)

    def post(self, request):
        form = self.form_class(request.POST)
        if not form.is_valid():
            messages.error(request, message="Invalid form data.")
            return redirect("online_course:registration")

        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            return redirect("online_course:index")
        else:
            messages.error(request, message="Invalid username or/and password.")
            return redirect("online_course:login")


# CourseListView
class CourseListView(generic.ListView):
    model = Course
    template_name = "online_course/courses.html"
    context_object_name = "course_list"

    def get_queryset(self):
        user = self.request.user
        courses = self.model.objects.order_by("-total_enrollment")[:10]  # type: ignore
        for course in courses:
            if user.is_authenticated:
                course.is_enrolled = check_if_enrolled(user, course)  # type: ignore
        return courses


# Course detail view
class CourseDetailsView(generic.DetailView):
    model = Course
    template_name = "online_course/course_details.html"

    @method_decorator(login_required)
    def get(self, request, pk):
        user = self.request.user
        course, *_ = self.model.objects.filter(id=pk).select_related()
        is_enrolled = check_if_enrolled(user, course)

        if not is_enrolled:
            return redirect("online_course:index")
        return render(request, self.template_name, {"course": course, "questions": course.question_set.all()})  # type: ignore


# Enrollment view
class EnrollmentView(generic.View):
    form_class = forms.Form

    @method_decorator(login_required)
    def post(self, request, course_id):
        course = get_object_or_404(Course, pk=course_id)
        user = request.user

        is_enrolled = check_if_enrolled(user, course)
        if not is_enrolled and user.is_authenticated:
            Enrollment.objects.create(user=user, course=course, mode="honor")
            course.total_enrollment += 1
            course.save()

        return HttpResponseRedirect(
            reverse(viewname="online_course:course_details", args=(course.pk,))
        )


# Submit exam
@login_required
def submit(request, course_id):
    user = request.user
    form_data = dict(request.POST)

    enrollment = Enrollment.objects.get(course_id=course_id, user=user)

    submission = Submission.objects.create(enrollment=enrollment)
    choices_ids = []
    for choice in form_data.items():
        if len(choice[1]) and choice[1][0] == "on":
            choices_ids.append(choice[0])

    choices = Choice.objects.filter(pk__in=choices_ids)
    submission.choices.set(choices)
    return redirect("online_course:exam_result", course_id=course_id)


# Exam result
@login_required
def get_exam_result(request, course_id):
    user = request.user
    enrollment, *_ = Enrollment.objects.filter(
        user=user, course_id=course_id
    ).select_related()
    submission = enrollment.submission_set.order_by("-created_at")[0]  # type: ignore
    choices = submission.choices.all()

    course, *__ = Course.objects.filter(pk=course_id).select_related()
    questions = list(set(map(lambda ch: ch.question, choices)))

    if len(course.question_set.all()) > len(questions):  # type: ignore
        messages.error(request, message="Please answer all questions")
        return redirect("online_course:course_details", pk=course_id)

    choice_grades = 0
    results = {}

    for question in questions:
        question_choices = question.choice_set.all()
        truthy_choices = get_choices(question_choices.values(), True)
        falsy_choices = get_choices(question_choices.values(), False)

        submitted_choices = list(
            filter(lambda ch: ch.question_id == question.id, choices)
        )

        for choice in submitted_choices:
            if choice.is_correct:
                if not question.id in results:
                    results[question.id] = {
                        "question_id": question.id,
                        "question_text": question.question_text,
                        "truthy_choices": [choice],
                        "falsy_choices": falsy_choices,
                    }
                else:
                    results[question.id]["truthy_choices"].append(choice)

                choice_grades += question.grade / len(truthy_choices)
            else:
                falsy_answer = list(
                    filter(lambda f_ch: f_ch["id"] == choice.id, falsy_choices)
                )
                if len(falsy_answer):
                    falsy_answer[0]["checked"] = True
                if not question.id in results:
                    results[question.id] = {
                        "question_id": question.id,
                        "question_text": question.question_text,
                        "truthy_choices": [],
                        "falsy_choices": falsy_choices,
                    }
                choice_grades -= question.grade / len(falsy_choices)

        if "truthy_choices" in results[question.id] and len(truthy_choices) > len(
            results[question.id]["truthy_choices"]
        ):
            results[question.id]["unchecked_choices"] = list(
                filter(
                    lambda choice: choice["id"]
                    not in map(lambda r: r.id, results[question.id]["truthy_choices"]),
                    truthy_choices,
                )
            )

    max_grade = reduce(
        lambda _, curr: 0 + curr, list(map(lambda q: q.grade, questions))
    )
    grade_percentage = (
        0
        if choice_grades <= 0
        else round((100 * choice_grades) / (max_grade * len(questions)))
    )

    return render(
        request,
        "online_course/exam_result.html",
        {
            "course": {"id": enrollment.course.pk, "name": enrollment.course.name},
            "results": results.values(),
            "grade": grade_percentage,
        },
    )
