from django.db import models
from django.conf import settings
from django.utils.timezone import now


# Learner model
class Learner(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    STUDENT = "student"
    DEVELOPER = "developer"
    DATA_SCIENTIST = "data_scientist"
    DATABASE_ADMIN = "dba"
    OCCUPATION_CHOICES = [
        (STUDENT, "Student"),
        (DEVELOPER, "Developer"),
        (DATA_SCIENTIST, "Data Scientist"),
        (DATABASE_ADMIN, "Database Admin"),
    ]
    occupation = models.CharField(
        null=False, max_length=20, choices=OCCUPATION_CHOICES, default=STUDENT
    )
    social_link = models.URLField(max_length=200)

    def __str__(self):
        return self.user.username + "," + self.occupation


# Instructor model
class Instructor(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    full_time = models.BooleanField(default=True)
    total_learners = models.IntegerField()

    def __str__(self):
        return self.user.username


# Course model
class Course(models.Model):
    name = models.CharField(null=False, max_length=30, default="new course")
    image = models.ImageField(upload_to="")
    description = models.CharField(max_length=1000)
    pub_date = models.DateField(null=True)
    instructors = models.ManyToManyField(Instructor)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, through="Enrollment")
    total_enrollment = models.IntegerField(default=0)
    is_enrolled = False

    def __str__(self):
        return "Name: " + self.name + "," + "Description: " + self.description


# Enrollment model
class Enrollment(models.Model):
    AUDIT = "audit"
    HONOR = "honor"
    BETA = "BETA"
    COURSE_MODES = [(AUDIT, "Audit"), (HONOR, "Honor"), (BETA, "BETA")]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_enrolled = models.DateField(default=now)
    mode = models.CharField(max_length=5, choices=COURSE_MODES, default=AUDIT)
    rating = models.FloatField(default=5.0)

    def __str__(self):
        return (
            "Enrollment: "
            + str(self.pk)
            + ","
            + "Course: "
            + str(self.course.description)
        )


# Lesson model
class Lesson(models.Model):
    title = models.CharField(max_length=200, default="title")
    order = models.IntegerField(default=0)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    content = models.TextField()


# Question model
class Question(models.Model):
    lesson = models.ForeignKey(Course, on_delete=models.CASCADE)
    question_text = models.TextField(null=False)
    grade = models.IntegerField(default=0)


# Choice model
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.TextField(null=False)
    is_correct = models.BooleanField(default=False)


# Submission model
class Submission(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    choices = models.ManyToManyField(Choice)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return "Submission: " + str(self.pk)
