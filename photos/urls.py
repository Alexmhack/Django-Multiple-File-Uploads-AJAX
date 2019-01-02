from django.urls import path

from .views import BasicFileUploadView

app_name = 'photos'

urlpatterns = [
	path('basic-upload/', BasicFileUploadView.as_view(), name='basic-upload')
]
