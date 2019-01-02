from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from .models import Photo
from .forms import PhotoForm

class BasicFileUploadView(View):
	def get(self, request):
		photos = Photo.objects.all()
		context = {'photos': photos}
		return render(request, 'photos/basic_upload.html', context)

	def post(self, request):
		form = PhotoForm(self.request.POST, self.request.FILES)
		if form.is_valid():
			photo = form.save()
			data = {'is_valid': True, 'name': photo.file.name, 'url': photo.file.url}
		else:
			data = {'is_valid': False}
		return JsonResponse(data)
