from django.contrib import admin

from .models import *

admin.site.register(Author)
admin.site.register(Book)
admin.site.register(BookRating)
admin.site.register(Favorite)
admin.site.register(Genre)
