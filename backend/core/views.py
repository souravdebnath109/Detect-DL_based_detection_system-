import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from tensorflow.keras.models import load_model
from django.core.files.storage import default_storage
import cv2
import os
from django.conf import settings
from .serializers import ImageUploadSerializer
from history.models import PredictionHistory  # ✅ Import the history model
from rest_framework.permissions import IsAuthenticated  # ✅ Import permission

# Load model once
model_path = os.path.join(settings.BASE_DIR, 'EfficientNetB0_Model_1_with_pretrained_weights.h5')
model = load_model(model_path)

labels = ['meningioma', 'glioma', 'pituitary', 'notumor']
IMAGE_SIZE = 100

def preprocess_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
    img = img.astype('float32')
    img = np.expand_dims(img, axis=0)
    return img

class PredictTumor(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]  # ✅ User must be logged in

    def post(self, request, format=None):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            file_obj = serializer.validated_data['image']

            # ✅ Save the uploaded image temporarily
            saved_path = default_storage.save('predicted_images/' + file_obj.name, file_obj)
            full_path = os.path.join(settings.MEDIA_ROOT, saved_path)

            image = preprocess_image(full_path)
            prediction = model.predict(image)
            predicted_class = labels[np.argmax(prediction)]
            confidence_score = float(np.max(prediction)) * 100  # Convert max probability to percentage

            # ✅ Save prediction history and get the ID
            history_entry = PredictionHistory.objects.create(
                user=request.user,
                image=saved_path,
                result=predicted_class,
                confidence_score=confidence_score
            )

            return Response({
                'prediction': predicted_class,
                'id': history_entry.id,
                'confidence': confidence_score
            })
        return Response(serializer.errors, status=400)

