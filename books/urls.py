from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', Home.as_view(), name='index'),
    url(r'^api/authors/$', Authors.as_view(), name='authors'),
    url(r'^api/books/$', Books.as_view(), name='books'),
    url(r'^api/recommended/$', RecommendedBook.as_view(), name='recommended')
]
