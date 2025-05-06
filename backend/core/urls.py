from django.urls import path
from .views import PredictTumor

urlpatterns = [
    path('predict/', PredictTumor.as_view(), name='predict_tumor'),
]
