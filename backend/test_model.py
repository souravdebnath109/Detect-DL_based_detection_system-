from tensorflow import keras

# Load the model using the correct path
model = keras.models.load_model('backend/EfficientNetB0_Model_1_with_pretrained_weights.h5')

# Print model summary
model.summary()