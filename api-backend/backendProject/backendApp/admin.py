from django.contrib import admin

# Register your models here.
from .models import Lesson, Enrolled

admin.site.register(Lesson)
admin.site.register(Enrolled)