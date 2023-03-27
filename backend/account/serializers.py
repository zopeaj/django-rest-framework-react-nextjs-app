from rest_framework import serializers
from account.models import Account

class AccountSerializer(serializers):
    class Meta:
        model = Account
        fields = ['']
