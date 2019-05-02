from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import Lesson
from .serializers import LessonSerializer

# Create your views here.
class ListLessonView(generics.ListAPIView):
    """
    Provides a get method handler.
    """
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
