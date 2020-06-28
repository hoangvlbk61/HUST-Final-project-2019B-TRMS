import face_recognition
import os
import cv2
import json

KNOWN_FACES_DIR = 'media/'
TOLERANCE = 0.6
FRAME_THICKNESS = 3
FONT_THICKNESS = 2
# default: 'hog', other one can be 'cnn' - CUDA accelerated (if available) deep-learning pretrained model
MODEL = 'cnn'


# Returns (R, G, B) from name
def name_to_color(name):
    # Take 3 first letters, tolower()
    # lowercased character ord() value rage is 97 to 122, substract 97, multiply by 8
    color = [(ord(c.lower())-97)*8 for c in name[:3]]
    return color


def face_recog(need_recog_image): 
    print('Loading known faces...')
    known_faces = []
    known_names = []

    for name in os.listdir(KNOWN_FACES_DIR):
        for filename in os.listdir(f'{KNOWN_FACES_DIR}/{name}'):
            image = face_recognition.load_image_file(
                f'{KNOWN_FACES_DIR}/{name}/{filename}')
            print("======================: ", filename)
            ecd = face_recognition.face_encodings(image)
            if(len(ecd) != 0): 
                encoding = face_recognition.face_encodings(image)[0]
                # Append encodings and name
                known_faces.append(encoding)
                known_names.append(name)

    print('Processing unknown faces...')
    locations = face_recognition.face_locations(image, model=MODEL)
    encodings = face_recognition.face_encodings(image, locations)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    print(f', found {len(encodings)} face(s)')
    for face_encoding, face_location in zip(encodings, locations):

        results = face_recognition.compare_faces(
            known_faces, face_encoding, TOLERANCE)
        match = None
        if True in results:  # If at least one is true, get a name of first of found labels
            match = known_names[results.index(True)]
            return match
    return None
