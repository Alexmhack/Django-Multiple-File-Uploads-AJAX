from datetime import datetime

now = datetime.now()

def photo_directory_path(instance, filename):
	"""file will be saved to MEDIA_ROOT/photos/2018/01/2"""
	return f'photos/{now.year}/{now.month}/{now.date().day}/{filename}'
