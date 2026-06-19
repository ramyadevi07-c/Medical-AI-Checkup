# import sys
# import json
# import numpy as np
# import tensorflow as tf

# # --- Symptom vocabulary ---
# symptom_vocab = {
#     'fever': 0,
#     'cough': 1,
#     'fatigue': 2,
#     'headache': 3,
#     'sore_throat': 4,
#     'runny_nose': 5,
#     'chest_pain': 6,
#     'shortness_of_breath': 7,
#     'nausea': 8,
#     'vomiting': 9,
#     'diarrhea': 10,
#     'body_ache': 11,
#     'loss_taste': 12,
#     'loss_smell': 13,
#     'abdominal_pain': 14,
#     'dizziness': 15,
#     'joint_pain': 16,
#     'rash': 17
# }

# # --- List of conditions ---
# conditions = [
#     'Common Cold',
#     'Flu',
#     'COVID-19',
#     'Migraine',
#     'Food Poisoning',
#     'Dengue',
#     'Typhoid',
#     'Pneumonia',
#     'Gastroenteritis',
#     'Allergy'
# ]

# # --- Dummy AI model (rule-based logic) ---
# class DummyModel:
#     def predict(self, X):
#         (
#             fever, cough, fatigue, headache, sore_throat, runny_nose, chest_pain,
#             shortness_of_breath, nausea, vomiting, diarrhea, body_ache,
#             loss_taste, loss_smell, abdominal_pain, dizziness, joint_pain, rash
#         ) = X[0]

#         scores = np.zeros(len(conditions))

#         # --- Common Cold ---
#         if cough and runny_nose and not fever:
#             scores[0] = 0.8

#         # --- Flu ---
#         if fever and body_ache and fatigue:
#             scores[1] = 0.85

#         # --- COVID-19 ---
#         if fever and cough and (loss_taste or loss_smell):
#             scores[2] = 0.9

#         # --- Migraine ---
#         if headache and not fever:
#             scores[3] = 0.8

#         # --- Food Poisoning ---
#         if vomiting and diarrhea:
#             scores[4] = 0.9

#         # --- Dengue ---
#         if fever and body_ache and rash:
#             scores[5] = 0.85

#         # --- Typhoid ---
#         if fever and abdominal_pain and fatigue:
#             scores[6] = 0.8

#         # --- Pneumonia ---
#         if fever and chest_pain and shortness_of_breath:
#             scores[7] = 0.9

#         # --- Gastroenteritis ---
#         if nausea and abdominal_pain and diarrhea:
#             scores[8] = 0.85

#         # --- Allergy ---
#         if rash and runny_nose and sore_throat:
#             scores[9] = 0.8

#         # Fallback: no matches
#         if not np.any(scores):
#             scores = np.random.rand(len(conditions)) * 0.3

#         return scores.reshape(1, -1)

# # --- Initialize model ---
# model = DummyModel()

# def preprocess(text):
#     tokens = text.lower().replace(',', ' ').split()
#     vector = np.zeros(len(symptom_vocab))
#     for token in tokens:
#         if token in symptom_vocab:
#             vector[symptom_vocab[token]] = 1
#     return vector.reshape(1, -1)

# def analyzeSymptoms(user_data):
#     vector = preprocess(user_data['symptoms'])
#     prediction = model.predict(vector)
#     scores = prediction[0]
#     results = sorted(zip(conditions, scores), key=lambda x: x[1], reverse=True)
#     return [{'condition': c, 'probability': float(p)} for c, p in results[:3]]

# if __name__ == "__main__":
#     user_data = json.loads(sys.argv[1])
#     result = analyzeSymptoms(user_data)
#     print(json.dumps(result))
import sys
import json
import numpy as np

symptom_vocab = {
    'fever': 0, 'cough': 1, 'fatigue': 2, 'headache': 3, 'sore_throat': 4,
    'runny_nose': 5, 'chest_pain': 6, 'shortness_of_breath': 7, 'nausea': 8,
    'vomiting': 9, 'diarrhea': 10, 'body_ache': 11, 'loss_taste': 12,
    'loss_smell': 13, 'abdominal_pain': 14, 'dizziness': 15, 'joint_pain': 16, 'rash': 17
}

metadata = {
    'Common Cold': {"urgency": "Low", "advice": "Rest, stay hydrated, and monitor temperature."},
    'Flu': {"urgency": "Medium", "advice": "Rest and consider over-the-counter antiviral support."},
    'COVID-19': {"urgency": "Medium", "advice": "Isolate, monitor oxygen levels, and take a rapid test."},
    'Migraine': {"urgency": "Low", "advice": "Rest in a dark, quiet room; maintain hydration."},
    'Food Poisoning': {"urgency": "Medium", "advice": "Rehydrate with electrolytes. Avoid solid foods initially."},
    'Dengue': {"urgency": "High", "advice": "Seek immediate medical attention. Monitor platelet counts."},
    'Typhoid': {"urgency": "High", "advice": "Requires antibiotics. Consult a healthcare provider immediately."},
    'Pneumonia': {"urgency": "High", "advice": "High risk. Urgent physician evaluation required."},
    'Gastroenteritis': {"urgency": "Medium", "advice": "Stay hydrated with clear fluids; seek care if symptoms worsen."},
    'Allergy': {"urgency": "Low", "advice": "Avoid triggers and consider an antihistamine."}
}

conditions = list(metadata.keys())

class DiagnosticsEngine:
    def predict(self, X):
        features = [int(val) for val in X.flatten()]
        scores = np.zeros(len(conditions))

        # Rules
        if features and features and not features: scores = 0.85
        if features and features and features: scores = 0.88
        if features and features and (features or features): scores = 0.92
        if features and not features: scores = 0.80
        if features and features: scores = 0.90
        if features and features and features: scores = 0.89
        if features and features and features: scores = 0.85
        if features and features and features: scores = 0.95
        if features and features and features: scores = 0.87
        if features and features and features: scores = 0.78

        # Safe fallback logic
        if sum(scores) == 0:
            scores = np.random.rand(len(conditions)) * 0.25

        # Explicitly array mapping to stop the float iteration error
        return [float(s) for s in scores]

engine = DiagnosticsEngine()

def preprocess(text):
    cleaned = text.lower().replace(',', ' ').replace('.', ' ').replace('_', ' ')
    tokens = cleaned.split()
    vector = np.zeros(len(symptom_vocab))
    for token in tokens:
        if token in symptom_vocab:
            vector[symptom_vocab[token]] = 1
    return vector.reshape(1, -1)

def run_pipeline(raw_input):
    vector = preprocess(raw_input.get('symptoms', ''))
    scores = engine.predict(vector)
    
    combined = sorted(zip(conditions, scores), key=lambda x: x, reverse=True)
    
    top_matches = []
    for condition, score in combined[:3]:
        top_matches.append({
            'condition': condition,
            'probability': float(round(score, 4)),
            'urgency': metadata[condition]['urgency'],
            'advice': metadata[condition]['advice']
        })
    return top_matches

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        output = run_pipeline(input_data)
        print(json.dumps(output))
    except Exception as e:
        print(json.dumps({"error": str(e)}))