from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='index'),
    url(r'^api/authors/$', AuthorsAPIView.as_view(), name='authors'),
    url(r'^api/books/$', BooksAPIView.as_view(), name='books'),
    url(r'^api/recommended/$', RecommendedBookAPIView.as_view(), name='recommended')
]
