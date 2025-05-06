
# Dtect+(🧠 Brain Tumor Detection System)

A deep learning-based web application that predicts brain tumors from MRI images. The system supports user authentication, image uploads, tumor predictions, historical tracking, and prescription generation.


## 🔍 Features
 ✅ Brain tumor prediction with 97.2% accuracy

🖼️ Upload MRI images to detect 4 tumor types:

Glioma

Meningioma

Pituitary

No Tumor

👤 User authentication (Login, Signup, Logout, Password Reset)

🗂️ View previous uploaded images with prediction history (date & time)

📄 Downloadable prescription reports including:

Patient name

Tumor type

Prediction confidence

Top 5 neurosurgeons (fetched from: https://www.doctorbangladesh.com/neurosurgeon-dhaka/)

❓ FAQ section for user assistance


## 🖥️ Tech Stack

Frontend: React.js

Backend: Django (REST Framework)

Deep Learning Model: Keras/TensorFlow (.h5 model)

Database: SQLite / PostgreSQL (configurable)



## 🚀 Getting Started


Prerequisites

Python 3.8+

Node.js 16+

pip, virtualenv

## Backend Setup (Django)


```cd backend```

```python -m venv venv```

```venv\Scripts\activate  # On Windows```

```pip install -r requirements.txt ```

```python manage.py migrate```

```python manage.py runserver ```


## Frontend Setup (React)

```cd frontend```

```npm install ```

```npm start```


## 📸 Screenshots & Demo

![Screenshot 2025-05-06 220501](https://github.com/user-attachments/assets/89ab5ee7-df11-435b-8730-9c30b7dfdcf9)
![Screenshot 2025-05-06 220553](https://github.com/user-attachments/assets/e9875b34-03b5-401a-a2ba-5986078c5f02)
![Screenshot 2025-05-06 220605](https://github.com/user-attachments/assets/854944b4-7130-4e1e-b8f2-ffb162038c73)
![Screenshot 2025-05-06 220620](https://github.com/user-attachments/assets/99890982-baae-4200-9aea-5356b00ffd8b)
![Screenshot 2025-05-06 220631](https://github.com/user-attachments/assets/a0d4f24d-bb72-4501-90df-ef8051d848af)
![Screenshot 2025-05-06 220708](https://github.com/user-attachments/assets/ef461212-25d5-407a-9789-73d3f03fed22)
![Screenshot 2025-05-06 220734](https://github.com/user-attachments/assets/6aee648a-bda0-4cc2-a240-35527addcaf6)

## 📸 Video
https://github.com/user-attachments/assets/6492e412-80e7-4ac8-9403-2d8a35b43fed


## 🧪 Model Performance


Accuracy: 97.2%

Trained on brain MRI dataset with 4 labeled tumor classes



## 📦 Project Structure

![image](https://github.com/user-attachments/assets/e5a2319a-233b-4e0c-a934-9e38e235d701)
## For any queries or suggestions, feel free to reach out or raise an issue! 😊

https://github.com/souravdebnath109
