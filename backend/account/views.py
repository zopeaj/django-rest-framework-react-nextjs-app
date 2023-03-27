from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from account.models import Account
from account.serializers import AccountSerializer
from account.security.jwtConfig.JwtConfig

# Create your views here.

jwtConfig  = JwtConfig()

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    account = Account.objects.get(username=username, password=password)
    if account is not None:
        token_data = jwtConfig.generateToken(account.getUsername(), None)
        return Response({"token_data": token_data}, status=status.HTTP_200_OK)
    return Response({"error": "incorrect username or password"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def logout(request):
    return Response({}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def register_account_view(request):
    username = request.data.get("username")
    account = Account.objects.get(username=username)

    if account is not None:
        return Response({"detail": "User with username already exists"}, status=status.HTTP_200_OK)

    serializers =  AccountSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_account_view(request):
    account_id = request.query_param.get("id")
    account = Account.objects.get(id=account_id)
    if account is not None:
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_account_view(request):
    account_id = request.query_param.get("id")
    account = Account.objects.get(id=account_id)
    if account is not None:
        account.delete()
        return Response({"detail": "Account deleted successfylly"}, status=status.HTTP_204_NO_CONTENT)
    return Response({"error": "account not found"})





