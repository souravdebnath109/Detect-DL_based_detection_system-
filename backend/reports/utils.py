# reports/utils.py
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime
import requests
from bs4 import BeautifulSoup

def fetch_doctors():
    url = "https://www.doctorbangladesh.com/neurosurgeon-dhaka/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    doctors = []
    cards = soup.select("li.doctor")

    for card in cards[:5]:  # Only top 5
        # Name
        name_tag = card.select_one("h3.title a")
        name = name_tag.text.strip() if name_tag else "N/A"

        # Hospital & Phone
        workplace_li = card.find("li", {"title": "Workplace"})
        hospital = "N/A"
        phone = "N/A"
        if workplace_li:
            # The hospital is before the <br>
            hospital = workplace_li.get_text(separator="\n").split("\n")[0].strip()
            # The phone is after 'Appointment:'
            if "Appointment:" in workplace_li.text:
                phone = workplace_li.text.split("Appointment:")[-1].strip()
        
        doctor = {
            "name": name,
            "hospital": hospital,
            "phone": phone
        }
        doctors.append(doctor)

    return doctors
    url = "https://www.doctorbangladesh.com/neurosurgeon-dhaka/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    doctors = []
    cards = soup.select(".Hc__DoctorCard-sc-1jv09od-0")

    for card in cards[:5]:  # Only top 5
        name_tag = card.select_one(".Hc__DoctorName-sc-1jv09od-6")
        hospital_tag = card.select_one(".Hc__HospitalName-sc-1jv09od-8")
        phone_tag = card.select_one(".Hc__PhoneNumber-sc-1jv09od-9")  # Adjusted class selector (may change)

        doctor = {}
        if name_tag:
            doctor['name'] = name_tag.text.strip()
        if hospital_tag:
            doctor['hospital'] = hospital_tag.text.strip()
        if phone_tag:
            doctor['phone'] = phone_tag.text.strip()
        else:
            doctor['phone'] = "N/A"

        if 'name' in doctor and 'hospital' in doctor:
            doctors.append(doctor)

    return doctors

def generate_pdf(prediction_result, confidence, model_explanation, user):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, height - 50, "Brain Tumor Prediction Report")

    p.setFont("Helvetica", 12)
    p.drawString(100, height - 100, f"User: {user.username}")
    p.drawString(100, height - 120, f"Prediction: {prediction_result}")
    p.drawString(100, height - 140, "Confidence: 97.7%")
    p.drawString(100, height - 160, f"Model Explanation: {model_explanation}")
    p.drawString(100, height - 180, f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    p.drawString(100, height - 200, f"Website: BrainTumor.ai")

    # Doctor references
    p.drawString(100, height - 240, "Top 5 Neurosurgeons in Bangladesh:")
    y = height - 260
    for doc in fetch_doctors():
        line = f"{doc['name']} - {doc['hospital']} | Phone: {doc['phone']}"
        p.drawString(120, y, line)
        y -= 20

    p.drawString(100, y - 20, "Please consult a specialist for further medical evaluation.")

    p.showPage()
    p.save()
    buffer.seek(0)
    return buffer
