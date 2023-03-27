from django.urls import path
from account.views import register_account_view, update_account_view, delete_account_view, login, logout

urlpatterns = [
    path('/v1/auth/create', register_account_view, name='create'),
    path('/v1/auth/update', update_account_view, name='update'),
    path('/v1/auth/delete', delete_account_view, name='delete'),
    path('/v1/auth/login', login, name='login'),
    path('/v1/auth/logout', logout, name='logout'),
]

