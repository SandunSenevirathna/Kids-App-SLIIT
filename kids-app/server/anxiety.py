
## So this will Verify that Our Imported hy file provides the desired output for the Anxiety for Prediction Purpose**

#Parameters that will Pass
# 'sweating',
# 'social.media.addiction',
# 'increased.energy',
# 'avoids.people.or.activities',
# 'trouble.concentrating',
# 'breathing.rapidly',
# 'close.friend',
# 'having.trouble.with.work',
# 'weight.gain',
# 'ag+1:629e',
# 'feeling.nervous',
# 'blamming.yourself'

### In here this prediction providing class label
# > When Label [0] is given => It Means Not Showing Symptoms in Anxiety
# > When Label [1] is given => It Means Showing Symptoms in Anxiety

####### ------------------Questions List---------------------- (Provide DropDown with 0 or 1)
# 1) Sweating Level High or Low ? (1 or 0)
# 2) Social Media Addiction High or Low ? (1 or 0)
# 3) Increased Energy during play time high or Low ? (1 or 0)
# 4) Avoids People or Activities High or Low ? (1 or 0)
# 5) Trouble concentrating in activities high or low ? (1 or 0)
# 6) Breathing Rapidly when engage in a small Activity (1 or 0)?
# 7) Having close friends (yes=>1 ,no=>0)
# 8) Having trouble.with.work (yes=>1 ,no=>0)?
# 9) Weight gainining every month (yes=>1 ,no=>0)?
# 10) Provide Your Age in years ?
# 11) Feeling Nervous Durning the an activity (yes=>1 ,no=>0)?
# 12) Blamming Yourselves oftenly? (yes=>1 ,no=>0)

import numpy as np
import joblib



def predict_anxiety_status(X):
    # Load the pre-trained model
    loaded_model = joblib.load('baby_model.hy')
    print("========================================")
    print(X)
    # Reshape the input array
    X_New = np.array(X)
    X_New = np.reshape(X_New, (1, -1))

    # Predict the anxiety status
    y_New = loaded_model.predict(X_New)

    # Print the predicted status
    if y_New == 1:
        print("The student has anxiety above 50% average.")
    else:
        print("The student has anxiety below 50% average.")

    return y_New


def main():
    # Define the input array
    X = [1, 1, 0, 1, 0, 1, 0, 1, 0, 34, 0, 0]

    # Predict anxiety status
    y_new = predict_anxiety_status(X)
    print("y_New- ", y_new)


if __name__ == "__main__":
    main()

# #Not Having Anxiety
# X_New = np.array([0, 0, 1, 0, 0, 0, 0, 1, 1, 25, 1, 0])  #
# X_New = np.reshape(X_New, (1, -1))
# y_New = loaded_model.predict(X_New)
# print("y_New- ",y_New)