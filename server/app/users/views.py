from users.email import send_register_email, send_reset_email

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status, permissions, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from users.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import BasicAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@ensure_csrf_cookie
def get_user(request):
    print(request.user.is_authenticated)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
def register_user(request):
    match_username = User.objects.all().filter(
        username=request.data['username'])
    match_email = User.objects.all().filter(email=request.data['email'])

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid() and not match_username and not match_email:
        user = User.objects.create(username=serializer.data['username'], password=make_password(
            serializer.data['password']), email=serializer.data['email'])
        user.save()
        send_register_email(
            serializer.data['username'], serializer.data['email'])
        return Response(status=status.HTTP_201_CREATED, data=UserSerializer(user).data)
    else:
        if match_username:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='Username already exists')
        elif match_email:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='Email already exists')
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Invalid email")


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
def login_user(request):
    username = User.objects.all().filter(username=request.data['username'])

    if not username:
        return Response(status=status.HTTP_400_BAD_REQUEST, data='Username not found')

    user = authenticate(
        username=request.data['username'], password=request.data['password'])

    if user is not None:
        login(request, user)
        return Response(status=status.HTTP_200_OK, data=UserSerializer(user).data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data='Incorrect password')


# not fully implemented yet
@api_view(['POST'])
@authentication_classes([BasicAuthentication])
def reset_password(request):
    username = User.objects.all().filter(username=request.data['username'])
    email = User.objects.all().filter(
        username=request.data['username'], email=request.data['email'])

    if not username:
        return Response(status=status.HTTP_400_BAD_REQUEST, data='Username not found')

    if email:
        # send_reset_email(request.data['email'])
        return Response(status=status.HTTP_200_OK, data='success')
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data='Email not found')
