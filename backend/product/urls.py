from django.urls import path
from product.views import create_product_view, update_product_view, delete_product_view, list_product_view

urlpatterns = [
    path('create', create_product_view, name='create'),
    path('update', update_product_view, name='update'),
    path('delete', delete_product_view, name='delete'),
    path('list', list_product_view, name='all')
]


