from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from product.models import Product
from product.serializers import ProductSerializer
# Create your views here.

@api_view(['POST'])
def create_product_view(request):
    data = request.data
    serialzers = ProductSerializer(data=data)
    if serializers.is_valid():
        serialzers.save()
        return Response(serialzers.data, status=status.HTTP_201_CREATED)
    return Response(serialzers.errors, status=status.HTTP_400_BAD_CONTENT)

@api_view(['PUT'])
def update_product_view(request):
    product_id = request.query_params.get("id")
    product = Product.objects.get(id=product_id)
    if product is not None:
        serialzers = ProductSerializer(product, data=request.data)
        if serializers.is_valid():
            serialzers.save()
            return Response(serialzers.data, status=status.HTTP_200_OK)
        return Response(serialzers.errors, status=status.HTTP_400_BAD_CONTENT)
    return Response({"detail": f"Product with {product_id} not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_product_view(request):
    product_id = request.query_params.get("id")
    product = Product.objects.get(id=product_id)
    if product is not None:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def list_product_view(request):
    products = Product.objects.all()
    return Response({"data": products}, status=status.HTTP_200_OK)


