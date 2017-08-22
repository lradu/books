from random import randint

from django.db.models import Count
from django.shortcuts import render
from django.views.generic import View

from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import AuthorSerializer, BookSerializer
from .models import Author, Book

class HomeView(View):
  template_name = 'books/index.html'

  def get(self, request):
    return render(request, self.template_name, {})

class BooksAPIView(ListAPIView):
  queryset = Book.objects.all()[:10]
  serializer_class = BookSerializer

class RecommendedBookAPIView(RetrieveAPIView):
  queryset = Book.objects.all()[0]
  serializer_class = BookSerializer

class AuthorsAPIView(ListAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer