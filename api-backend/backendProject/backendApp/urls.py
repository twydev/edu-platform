from django.urls import path
from .views import ListLessonView

urlpatterns = [
    path('lesson/', ListLessonView.as_view(), name="lesson-all"),
]