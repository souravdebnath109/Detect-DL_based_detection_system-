# reports/models.py
from django.db import models
from django.conf import settings

class PDFDownloadLog(models.Model):
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    download_time = models.DateTimeField(auto_now_add=True)
