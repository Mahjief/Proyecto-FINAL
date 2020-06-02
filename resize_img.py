import urllib.request
import cv2
import numpy as np
import os

import pickle


#Load the variable back from the pickle file.

def resize():

    for dirname, _, filenames in os.walk('./pictures/BUs/salay - copia/'):
        for filename in filenames:
            img=cv2.imread(os.path.join(dirname, filename))
            if filename.endswith(".jpg"):
                resized_img = cv2.resize(img, (320,240))
                cv2.imwrite('../trajes/salay/' + filename, resized_img)
        
                #print(filename)

resize()