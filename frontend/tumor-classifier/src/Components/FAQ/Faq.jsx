import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    category: 'Meningioma',
    questions: [
      {
        q: 'What is a meningioma tumor?',
        a: 'A meningioma is a type of brain tumor that arises from the meninges, the protective layers surrounding the brain and spinal cord.'
      },
      {
        q: 'Is meningioma cancerous?',
        a: 'Most meningiomas are benign, meaning they are not cancerous. However, they can still cause symptoms depending on size and location.'
      }
    ]
  },
  {
    category: 'Pituitary',
    questions: [
      {
        q: 'What is a pituitary tumor?',
        a: 'A pituitary tumor is a growth in the pituitary gland, which can affect hormone production in the body.'
      },
      {
        q: 'Are pituitary tumors life-threatening?',
        a: 'Most pituitary tumors are noncancerous, but they may cause health issues due to hormone imbalance or pressure on surrounding tissues.'
      }
    ]
  },
  {
    category: 'Glioma',
    questions: [
      {
        q: 'What is a glioma?',
        a: 'Glioma is a type of tumor that starts in the glial cells of the brain or spine. It is often more aggressive than other brain tumors.'
      },
      {
        q: 'What are common symptoms of glioma?',
        a: 'Symptoms include headaches, seizures, memory loss, and difficulty with speech or movement, depending on location.'
      }
    ]
  },
  {
    category: 'No Tumor',
    questions: [
      {
        q: 'What does “No Tumor Detected” mean?',
        a: 'It means the uploaded brain MRI scan does not show signs of a tumor, based on the model’s prediction.'
      },
      {
        q: 'Is a second opinion recommended even if no tumor is found?',
        a: 'Yes, while AI predictions are helpful, a professional medical diagnosis is always recommended for confirmation.'
      }
    ]
  }
];

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);

  const currentFaqs = faqData.find(faq => faq.category === activeCategory)?.questions || [];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-tabs">
        {faqData.map(faq => (
          <button
            key={faq.category}
            className={`faq-tab ${faq.category === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(faq.category)}
          >
            {faq.category}
          </button>
        ))}
      </div>
      <div className="faq-list">
        {currentFaqs.map((item, index) => (
          <div key={index} className="faq-item">
            <h4 className="faq-question">{item.q}</h4>
            <p className="faq-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
