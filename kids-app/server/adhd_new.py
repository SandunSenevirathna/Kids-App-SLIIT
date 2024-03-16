#Have 12 Factors to be input
# 'ODD','Age','Depression','Number of Bio. Parents','Number of Siblings',
# 'Sex','Poverty Status','Family History - Substance Abuse','GAD','CD','SAD','Social Phobia'

##Questions Order (For 0 and 1 answers provide dropdown)
# 1) Is the students ODD stage is High or Low ? (1 or 0)
# 2) Age of the Student?
# 3) Has the child had depression before (Treated / Not treated) ? (0 or 1)
# 4) Number of Bio. Parents? (0-2)
# 5) Number of Siblings?
# 6) Student's Gender (Female =>0/Male =>1)
# 7) Poverty status is high or low ? (1 or 0)
# 8) Is there any substance abuse in the Family (Yes or No)? (1 or 0)
# 9) Does the child show behavioural problems to animals (Yes or No)? (1 or 0)
# 10) Does the child show behavioural problems to unknown people (Yes or No)? (1 or 0)
# 11) Does the child have symptoms of depression that comes and goes in a seasonal pattern (yes or no)? (1 or 0)
# 12) Do you noticed if the child easily get distracted or have difficulty focusing on tasks (yes or no)? (1 or 0)
#Above These Questions answers will pass to the Model

# These questions are not pass to the model. just ask the questions (Display Them)
# 13) Does the child show behavioural problems to known people (Yes or No)? (1 or 0)
# 14) Does the child have behaviors to uncooperative critically (yes or No)? (1 0r 0)
# 15) Does the child have behaviors to hostile toward peers, parents, teachers & other authority figures critically (yes or No)? (1 0r 0)
# 16) How is the child performing academically?
#        Excellent 4
#        Good      3
#        Not bad   2
#        Bad       1
#        Weak      0

import pickle

with open('Adhd_Model2.pkl', 'rb') as model_file:
    lrModel = pickle.load(model_file)

## Example for Predicting the ADHD Symptoms Showing or Not
import numpy as np

# Have 13 Factors to be input

def predict_adhd_symptoms(X):
    # Reshape the input array
    X_New = np.array(X).reshape(1, -1)

    # Load the logistic regression model

    # Predict the ADHD symptoms
    y_New = lrModel.predict(X_New)
    y_New_con = lrModel.predict_proba(X_New)

    # Print the prediction confidence
    for i in range(len(X_New)):
        class_label = y_New_con[i]
        confidence = max(y_New_con[i])
        print(f"Prediction for X_New: Class {class_label}, Confidence: {confidence:.2f}")
    # Print the prediction result
    if y_New == 0:
        print("Less Chance to Have ADHD Symptoms")
    else:
        print("More Chance to have ADHD Symptoms")

    return y_New


def main():
    # Define the input array
    X = [1,4,1,2,0,1,1,1,1,1,1,0]

    # Predict ADHD symptoms
    y_new = predict_adhd_symptoms(X)
    print("y_New- ", y_new)


if __name__ == "__main__":
    main()

