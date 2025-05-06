# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class PredictionHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='predicted_images/')
    result = models.CharField(max_length=100)
    confidence_score = models.FloatField(null=True, blank=True)  # Add this line

    predicted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.result} on {self.predicted_at.strftime('%Y-%m-%d %H:%M')}"
