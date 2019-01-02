# Django-Multiple-File-Uploads-AJAX
Uploading multiple files to django model using ajax and jQuery plugin

## Usage
1. Run the django server 
	```python manage.py runserver``` from the root folder of repo

2. Open [http://127.0.0.1:8000/photos/basic-upload/](http://127.0.0.1:8000/photos/basic-upload/)

3. Hit the upload photo button and select as many **images** you need to upload and hit open button

4. The uploaded images will be listed in the table below with their apropriate links, click
	the link and you get the image displayed.

5. The images are uploaded to **media/{current year}/{current month}/{current date}/**

## Installation
In any existing Django project configure the settings for the media files by adding

**settings.py**
```
MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

Then create a folder named **media** in the root directory of the project.

And to test the uploads in the development environment, add this to the bottom of the root 
urlconf:

**urls.py**
```
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
...
urlpatterns = [
	...
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## jQuery Usage
Now the rest are static assets, mostly JavaScript assets. Here’s what we are going to use:

1. Bootstrap 3.3.7
2. jQuery 3.1.1 - Base dependency of the plug-in.
3. [jQuery File Upload 9.14.1](https://github.com/blueimp/jQuery-File-Upload/releases/tag/v9.14.1)

I will be using the internet cdn you can serve the files from static folder for [jquery](https://github.com/jquery/jquery/releases/tag/3.1.1) and [bootstrap](https://github.com/twbs/bootstrap/releases/tag/v3.3.7) by downloading them from their github repos.

We will use the cdn for jquery and bootstrap in the base file and add a django template 
block for the jquery file upload plugin code.

## Photos
Now let's create a model for uploading our files to by creating a django app by running,

```
python manage.py startapp photos
```

Then create a simple model for uploading images with a title and also storing the date and 
time when the photo object is created and edited.

**photos/models.py**
```
from django.db import models

from .utils import photo_directory_path

class Photo(models.Model):
	title = models.CharField(max_length=256)
	file = models.ImageField(upload_to=photo_directory_path)
	timestamp = models.DateTimeField(auto_now=True)
	updated = models.DateTimeField(auto_now_add=True)
```

**NOTE:** We are using the ```ImageField``` in our model so we need to install the [pillow](https://pillow.readthedocs.io/en/5.3.x/installation.html) module also.

Also we are using a seperate file for storing the utils function like the ```photo_directory_path``` which will upload the photo to **MEDIA_ROOT/photos/2018/01/2** and 
ofcourse the date depends on the current date in your computer.

**photos/utils.py**
```
def photo_directory_path(instance, filename):
	"""file will be saved to MEDIA_ROOT/photos/2018/01/2"""
	return 'photos/%Y/%m/%d/'
```

The form for uploading files is also very simple,

**photos/forms.py**
```
from django import forms

from .models import Photo

class PhotoForm(forms.ModelForm):
	class Meta:
		model = Photo
		fields = '__all__'
```

## Basic File Upload
We need a url route for uploading our files so create new file named **urls.py** inside **photos** folder

**photos/urls.py**
```
from django.urls import path

from .views import BasicFileUploadView

app_name = 'photos'

urlpatterns = [
	path('basic-upload/', BasicFileUploadView.as_view(), name='basic-upload')
]
```

Now the view,

**photos/views.py**
```
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
```

The ```django.views.View``` allows us to create a class based view in which we can define 
the get and post methods and their functionalities.

In ```GET``` request to our url we simple pass all the photos in the context and render the 
**photos/basic_upload.html** file. You can look at its code in **templates/photos/basic_upload.html** 

Also the frontend javascript is in **static/jquery/js/basic_upload.js** file which opens 
the windows explorer and initiate the file uploading process.

Run the server and click the **upload photos** button and select as many images you want to 
upload and press **open** and the file data will show up in the table.

There is also code for drag and drop files upload and a progress bar that shows file 
uploading progress.

For any doubts or queries, start a issue in the repo. Will contact soon.
