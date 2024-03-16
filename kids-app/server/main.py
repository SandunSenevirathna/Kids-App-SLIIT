import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module
from adhd_new import predict_adhd_symptoms
from anxiety import predict_anxiety_status 
import numpy as np


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Firebase Admin SDK
cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore client
db = firestore.client()


@app.route('/register', methods=['POST'])
def register():
    try: #nicNumber, name, email, password 
        data = request.get_json()
        nicNumber = data.get('nicNumber')
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Check if the email already exists (you should implement this check)

        # Assuming a unique email is required for registration
        teacher_ref = db.collection('teacher_table')
        teacher_ref.add({
            'nicNumber' : nicNumber,
            'name' : name,
            'email': email,
            'password' : password,
            # Add more user data here
        })

        return jsonify({'success': True, 'message': 'Registration successful'})
    except Exception as e:
        print("An error occurred during registration:", str(e))  # Add this line for debugging
        return jsonify({'success': False, 'message': f'Registration failed: {str(e)}'})

    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    nicNumber = data.get('nicNumber')
    password = data.get('password')

    print(data)
    # Authenticate user with Firebase
    try:
        teacher_ref = db.collection('teacher_table')
        query = teacher_ref.where('nicNumber', '==', nicNumber).where('password', '==', password)

        result = query.stream()
        # If a matching record is found, send the user data to the frontend
        for doc in result:
            teacher_ref = doc.to_dict()
            # print(user_data)
            return jsonify({'success': True, 'message': teacher_ref})

        # If no matching record is found, send a failure response
        return jsonify({'success': False, 'message': 'Invalid email or password'})
    except auth.UserNotFoundError:
        return jsonify({'message': 'User not found', 'success': False}, 400)


# Student Register part
@app.route('/studentRegister', methods=['POST'])
def studentRegister():
    try: #teacherNIC, studentID, studentName, dob, homeTP
        data = request.get_json()
        teacherNIC = data.get('teacherNIC')
        studentID = data.get('studentID')
        studentName = data.get('studentName')
        dob = data.get('dob')
        homeTP = data.get('homeTP')

        # Check if the email already exists (you should implement this check)

        # Assuming a unique email is required for registration
        studentRegister_ref = db.collection('student_register_table')
        studentRegister_ref.add({
            'teacherNIC' : teacherNIC,
            'studentID' : studentID,
            'studentName' : studentName,
            'dob': dob,
            'homeTP' : homeTP,
            # Add more user data here
        })

        return jsonify({'success': True, 'message': 'Student Registration successful'})
    except Exception as e:
        print("An error occurred during student registration:", str(e))  # Add this line for debugging
        return jsonify({'success': False, 'message': f' Student Registration failed: {str(e)}'})

    
@app.route('/fetchChildrenData', methods=['POST'])
def fetch_children_data():
    try:
        # Get teacher's nicNumber from the request data
        data = request.get_json()
        teacher_nic = data.get('teacherNIC')

        # Fetch children data from Firestore based on teacher's nicNumber
        children_ref = db.collection('student_register_table')
        query = children_ref.where('teacherNIC', '==', teacher_nic).get()

        children_data = [doc.to_dict() for doc in query]

        return jsonify({'success': True, 'message': children_data})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    


# New endpoint for deleting a student
@app.route('/deleteStudent', methods=['POST'])
def delete_student():
    try:
        data = request.get_json()
        teacher_nic = data.get('teacherNIC')
        student_id = data.get('studentID')

        # Delete the student
        student_ref = db.collection('student_register_table')
        query = student_ref.where('teacherNIC', '==', teacher_nic).where('studentID', '==', student_id).get()

        for student_doc in query:
            student_doc.reference.delete()

        return jsonify({'success': True, 'message': 'Student deleted successfully'})
    except Exception as e:
        print


from flask import request, jsonify
from firebase_admin import firestore
from google.cloud.exceptions import NotFound

# Assuming db is your Firestore client instance
db = firestore.client()

@app.route('/gamesPlayedDataAdd', methods=['POST'])
def gamesPlayedDataAdd():
    try:
        data = request.get_json()
        gameName = data.get('gameName')
        teacherNIC = data.get('teacherNIC')
        studentID = data.get('studentID')
        currentDate = data.get('currentDate')
        startTime = data.get('startTime')
        endTime = data.get('endTime')
        avgTime = data.get('avgTime')
        correctRoundsPlayed = data.get('correctRoundsPlayed')
        incorrectRoundsPlayed = data.get('incorrectRoundsPlayed')

        # Check if the document already exists with the provided values
        query_ref = db.collection('games_played_info_table').where('gameName', '==', gameName) \
                                                           .where('teacherNIC', '==', teacherNIC) \
                                                           .where('studentID', '==', studentID) \
                                                           .where('currentDate', '==', currentDate) \
                                                           .where('startTime', '==', startTime)
        
        docs = query_ref.stream()

        if any(doc.exists for doc in docs):
            return jsonify({'success': False, 'message': 'Duplicate entry found. Data not inserted.'})

        # If no duplicate found, insert the data
        games_played_info_table_ref = db.collection('games_played_info_table')
        games_played_info_table_ref.add({
            'gameName': gameName,
            'teacherNIC' :teacherNIC,
            'studentID' : studentID,
            'currentDate' :currentDate,
            'startTime' :startTime,
            'endTime' :endTime,
            'avgTime' :avgTime,
            'correctRoundsPlayed' :correctRoundsPlayed,
            'incorrectRoundsPlayed' :incorrectRoundsPlayed,
            # Add more user data here
        })

        return jsonify({'success': True, 'message': gameName + ' Games Played Info Add successful'})
    except Exception as e:
        print("An error occurred during student registration:", str(e))  # Add this line for debugging
        return jsonify({'success': False, 'message': f' Games Played Info Add successful failed: {str(e)}'})

    


@app.route('/fetchPlayedGameData', methods=['POST']) 
def fetch_played_game_data():
    try:
        data = request.get_json()
        teacher_nic = data.get('teacherNIC')
        student_id = data.get('studentID')
        game_name = data.get('gameName')

        # Fetch played game data from Firestore based on teacher's NIC and student ID
        games_played_info_table_ref = db.collection('games_played_info_table')
        query = games_played_info_table_ref.where('teacherNIC', '==', teacher_nic)\
            .where('studentID', '==', student_id).where('gameName', '==', game_name).get()

        games_played_data = [doc.to_dict() for doc in query]

        return jsonify({'success': True, 'message': games_played_data})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    

@app.route('/CheckStatusgamesPlayedDataAdd', methods=['POST'])
def CheckStatusgamesPlayedDataAdd():
    try:
        checkStatus_games_played_info_table = db.collection('checkStatus_games_played_info_table')
        
        data = request.get_json()
        gameName = data.get('gameName')
        teacherNIC = data.get('teacherNIC')
        studentID = data.get('studentID')
        statusType = data.get('statusType')

        # Check if the combination of teacherNIC and studentID already exists
        check_query = checkStatus_games_played_info_table \
            .where('gameName', '==', gameName) \
            .where('teacherNIC', '==', teacherNIC) \
            .where('studentID', '==', studentID) \
            .limit(1).get()

        if check_query:  
            # If document exists, delete it
            for doc in check_query:
                doc.reference.delete()

        # Add a new document with updated data
        checkStatus_games_played_info_table.add({
            'gameName': gameName,
            'teacherNIC': teacherNIC,
            'studentID': studentID,
            'statusType': statusType
        })

        return jsonify({'success': True, 'message': f'{gameName} game info updated successfully'})

    except Exception as e:
        print("An error occurred during game info update/insertion:", str(e))
        return jsonify({'success': False, 'message': f'Game info update/insertion failed: {str(e)}'})

    

@app.route('/CheckStatusgamesPlayedData', methods=['GET'])
def get_check_status_data():
    try:
       
        teacher_nic = request.args.get('teacherNIC')
        student_id = request.args.get('studentID')

       # print(teacher_nic, student_id)
        
        # Query Firestore database for all data related to student_id and teacher_nic
        status_query = db.collection('checkStatus_games_played_info_table') \
            .where('teacherNIC', '==', teacher_nic) \
            .where('studentID', '==', student_id).get()

        status_data_list = []
        for doc in status_query:
            status_data = {
                'gameName': doc.get('gameName'),
                'statusType': doc.get('statusType'),
                # Add more fields as needed
            }
            status_data_list.append(status_data)

       # print("Status Data List:", status_data_list)
        return jsonify({'success': True, 'statusDataList': status_data_list})
    
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'})

    

@app.route('/predict_adhd', methods=['POST'])
def predict_adhd():
    try:
        data = request.get_json()  # Assuming JSON data is sent in the request
        answers = data.get('answers')  # Retrieve the answers array from the request
        
        # Call the function from adhd.py and pass the answers
        #print("===========================================")
        #print("backend passed the array  to adhd.py model")
        prediction = predict_adhd_symptoms(answers)

        # Determine the prediction result message
        prediction_message = "Less Chance to Have ADHD Symptoms" if prediction == 0 else "More Chance to have ADHD Symptoms"
        print("prediction_message is ", prediction_message)
        # Include the prediction result and message in the JSON response
       # Convert prediction to a standard Python type (e.g., int) before including it in the JSON response
        prediction = int(prediction)

        # Include the prediction result and message in the JSON response
        response_data = {'success': True, 'prediction': prediction, 'prediction_message': prediction_message}


        # Return the prediction as JSON response
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/predict_anxiety', methods=['POST'])
def predict_anxiety():
    try:
        data = request.get_json()  # Assuming JSON data is sent in the request
        answers = data.get('answers')  # Retrieve the answers array from the request
        
        # Call the function from adhd.py and pass the answers
        #print("===========================================")
        print("backend passed the array  to anxiety.py model ", answers)
        prediction = predict_anxiety_status(answers)

        # Determine the prediction result message
        prediction_message = "The student has anxiety below 50% average." if prediction == 0 else "The student has anxiety above 50% average."
        print("prediction_message is ", prediction_message)
        # Include the prediction result and message in the JSON response
       # Convert prediction to a standard Python type (e.g., int) before including it in the JSON response
        prediction = int(prediction)

        # Include the prediction result and message in the JSON response
        response_data = {'success': True, 'prediction': prediction, 'prediction_message': prediction_message}


        # Return the prediction as JSON response
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


##########################
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)



