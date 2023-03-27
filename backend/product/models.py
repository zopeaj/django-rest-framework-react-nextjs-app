from django.db import models

# Create your models here.
class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(default='')
    category = models.TextField(default='')
    product_image = models.ImageField(upload_dir='image', default=None)

    def __str__(self):
        return f"Product {self.category}-{self.product_image.url}"
