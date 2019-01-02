from django.db import models

from .utils import photo_directory_path

class Photo(models.Model):
	title = models.CharField(max_length=256, blank=True, null=True)
	file = models.ImageField(upload_to=photo_directory_path)
	timestamp = models.DateTimeField(auto_now=True)
	updated = models.DateTimeField(auto_now_add=True)
