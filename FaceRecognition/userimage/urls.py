from django.urls import path
from .views import user_image, user_create

app_name = 'FaceRecognition'
urlpatterns = [
    path('user-recognition',user_image, name='user-recognition'), 
    path('user-create',user_create, name='user-creation'), 
]