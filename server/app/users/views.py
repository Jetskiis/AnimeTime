from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import User
from users.serializers import UserSerializer
from users.auth import authenticate


@api_view(['GET'])
def get_users(request):
    # users = User.objects.all()
    # serializer = UserSerializer(users, many=False)
    # return Response(serializer.data)
    return Response('Hello World')

@api_view(['POST'])
def register_user(request):
    match_username = User.objects.all().filter(username = request.data['username'])
    match_email = User.objects.all().filter(email = request.data['email'])

    serializer = UserSerializer(data = request.data)
    if serializer.is_valid() and not match_username and not match_email:
        user = User.objects.create(username = serializer.data['username'], password = make_password(serializer.data['password']), email = serializer.data['email'])
        user.save()
        return Response(status = status.HTTP_201_CREATED)
    else:
        if match_username:
            return Response(status = status.HTTP_400_BAD_REQUEST, data = 'Username already exists' )
        elif match_email:
            return Response(status = status.HTTP_400_BAD_REQUEST, data = 'Email already exists' )
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST, data = "Invalid email")
    

@api_view(['POST'])
def login_user(request):

    username = User.objects.all().filter(username = request.data['username'])
    
    if not username:
        return Response(status = status.HTTP_400_BAD_REQUEST, data = 'Username not found')
    
    user = authenticate(username = request.data['username'], password = request.data['password'])
        
    if user is not None:
        login(request, user)
        return Response(status = status.HTTP_200_OK, data = 'success')
    else:
        return Response(status = status.HTTP_400_BAD_REQUEST, data = 'Incorrect password')
    
@api_view(['POST'])
def reset_password(request):
    serializer = UserSerializer(data = request.data)
    


