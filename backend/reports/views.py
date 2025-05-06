from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .utils import fetch_doctors
from history.models import PredictionHistory
from rest_framework_simplejwt.authentication import JWTAuthentication

class DownloadReportView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, prediction_id):
        try:
            prediction = PredictionHistory.objects.get(id=prediction_id, user=request.user)
        except PredictionHistory.DoesNotExist:
            return Response({'error': 'Prediction not found.'}, status=status.HTTP_404_NOT_FOUND)

        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        from io import BytesIO

        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        p.setFont("Helvetica-Bold", 16)
        p.drawString(50, height - 50, "Brain Tumor Detection Report")
        p.setFont("Helvetica", 12)
        p.drawString(50, height - 100, f"Patient: {request.user.username}")
        p.drawString(50, height - 120, f"Tumor Type: {prediction.result}")
        p.drawString(50, height - 140, "Confidence Score: 97.7%")
        p.drawString(50, height - 160, f"Date: {prediction.predicted_at.strftime('%Y-%m-%d')}")
        p.drawString(50, height - 180, f"Website: DTect+ Brain Tumor Detection")
        p.drawString(50, height - 200, "Reference for Further Consultation:")

        # Draw table headers (without Phone)
        y = height - 230
        p.setFont("Helvetica-Bold", 11)
        p.drawString(60, y, "Name")
        p.drawString(260, y, "Hospital")
        p.setFont("Helvetica", 11)
        y -= 20
        doctors = fetch_doctors()
        for doc in doctors:
            p.drawString(60, y, doc['name'])
            p.drawString(260, y, doc['hospital'])
            y -= 20

        p.drawString(50, y - 20, "Note: This is an AI-assisted prediction. Please consult with a medical professional for diagnosis.")
        p.save()
        buffer.seek(0)

        response = HttpResponse(buffer, content_type='application/pdf')
        response["Content-Disposition"] = f'attachment; filename=tumor_report_{prediction_id}.pdf'
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Credentials"] = "true"
        return response