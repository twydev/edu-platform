from django.db import models

# Create your models here.
class Lesson(models.Model):
    lesson_code = models.CharField(max_length=100, default='00000')
    lesson_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.lesson_code + ' - ' + self.lesson_name

class Enrolled(models.Model):
    ENROLL_STATUS = (
        ('AC','ACTIVE'),
        ('CP','COMPLETED'),
        ('WD','WITHDRAWN'),
        ('CC','CANCELLED'),
        ('PD','PENDING'),
    )
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    user = models.CharField(max_length=200)
    status = models.CharField(max_length=2, choices=ENROLL_STATUS)

    def __str__(self):
        return self.user + " : " + self.status