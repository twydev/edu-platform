from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import Lesson
from .serializers import LessonSerializer

from rest_framework import permissions

# Create your views here.
class ListLessonView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    """
    Provides a get method handler.
    """
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
