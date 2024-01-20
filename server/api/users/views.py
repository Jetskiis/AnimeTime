from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from users.models import User
from users.serializers import UserSerializer

@api_view(['GET'])
def get(request):
    # users = User.objects.all()
    # serializer = UserSerializer(users, many=False)
    # return Response(serializer.data)
    return Response('Hello World')

@api_view(['POST'])
def post(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)




