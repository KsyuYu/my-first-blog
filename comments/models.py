from django.conf import settings
from django.db import models
from django.utils import timezone


class Comment(models.Model):
    name = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.save()

    def __str__(self):
        return self.name