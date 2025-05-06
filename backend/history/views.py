from rest_framework import generics, permissions
from .models import PredictionHistory
from .serializers import PredictionHistorySerializer

class UserPredictionHistoryView(generics.ListCreateAPIView):
    serializer_class = PredictionHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PredictionHistory.objects.filter(user=self.request.user).order_by('-predicted_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
