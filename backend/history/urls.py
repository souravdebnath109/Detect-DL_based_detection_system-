from django.urls import path
from .views import UserPredictionHistoryView

urlpatterns = [
    path('user/history/', UserPredictionHistoryView.as_view(), name='user-history'),
]
