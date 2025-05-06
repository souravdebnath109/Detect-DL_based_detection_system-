from django.urls import path
from .views import DownloadReportView

urlpatterns = [
    path('download-report/<int:prediction_id>/', DownloadReportView.as_view(), name='download_report'),
]