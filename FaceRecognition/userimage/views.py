from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from .models import User, UserImage
from json import dumps, loads
from django.views.decorators.csrf import csrf_exempt
from utils.face_rec_faces import face_recog
import base64
from django.core.files.base import ContentFile
@csrf_exempt
def user_image(request):
    if request.method == 'POST': 
        if(request.body):
            # print(request.POST["user"])
            # print(request.FILES["image"])
            # body_unicode = request.body.decode('utf-8')
            # body = loads(body_unicode)
            # uid = body["username"]
            # req_type = body["req_type"]
            # req_type = body["images"]

            uid = request.POST.get("username")
            req_type = request.POST.get("req_type")
            if(req_type == "GET"): 
                user = User.objects.get(pk = uid)
                return HttpResponse(user.images)
            elif(req_type == "ADD"): 
                user = User.objects.get(pk = uid)
                img = request.POST.get("image")
                fileformat, imgstr = img.split(';base64,') 
                ext = fileformat.split('/')[-1] 
                data = ContentFile(base64.b64decode(imgstr), name=str(user.id) +"." + ext)
                ui = UserImage.objects.create(user = user, images = data)
                return HttpResponse(dumps({"result": "ok", "status": 200}))
            elif(req_type == "CHECK"): 
                img = request.POST.get("image")
                fileformat, imgstr = img.split(';base64,') 
                ext = fileformat.split('/')[-1] 
                data = ContentFile(base64.b64decode(imgstr), name= "image." + ext)
                user_id_recog = face_recog(data)
                if(user_id_recog != None): 
                    return HttpResponse(dumps({"user_id": user_id_recog}))
                return HttpResponse(dumps({"error": "Error on create user", "status": 403}))
            return HttpResponse("RECV REQ BODY")
        return HttpResponse("Don't have body in request")
    else:
        return HttpResponse("POST MEHOTD SUPPORTED ONLY")

@csrf_exempt
def user_create(request): 
    if request.method == 'POST': 
        if(request.body): 
            body_unicode = request.body.decode('utf-8')
            body = loads(body_unicode)
            username = body["username"]
            password = body["password"]
            email = username + "@trms.com.vn"
            us = User.objects.create(username = username, email=email)
            us.set_password(password)
            return HttpResponse(dumps({"result": "ok", "status": 200}))
    return HttpResponse(dumps({"error": "Error on create user", "status": 403}))
