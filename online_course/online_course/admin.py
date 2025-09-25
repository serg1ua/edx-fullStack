from django.contrib import admin
from .models import Course, Choice, Instructor, Lesson, Learner, Question, Submission


class QuestionInline(admin.StackedInline):
    model = Question
    extra = 5


class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 5


class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 5


class CourseAdmin(admin.ModelAdmin):
    inlines = [LessonInline, QuestionInline]
    list_display = ["name", "pub_date"]
    list_filter = ["pub_date", "total_enrollment"]
    search_fields = ["name", "description"]


class LessonAdmin(admin.ModelAdmin):
    list_display = ["title"]


class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ["lesson", "question_text", "grade"]
    list_filter = ["lesson", "grade"]
    search_fields = ["lesson", "grade"]


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ["question", "choice_text", "is_correct"]
    list_filter = ["question", "is_correct"]
    search_fields = ["question", "is_correct"]


admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Instructor)
admin.site.register(Learner)
admin.site.register(Submission)
