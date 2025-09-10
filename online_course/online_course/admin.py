from django.contrib import admin
from .models.course import Course

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'pub_date')
    list_filter = ['pub_date']
    search_fields = ['name', 'description']

admin.site.register(Course, CourseAdmin)
