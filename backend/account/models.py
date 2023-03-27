from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from product.models import Product

# Create your models here.
class Account(models):
    id = models.IntegerField(primary_key=True, nullable=False, default=uuid4().hex)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    product = models.OneToManyField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"Account {self.user.username}"

