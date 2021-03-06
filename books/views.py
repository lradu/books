from datetime import date

from django.db.models import Avg, Count
from django.shortcuts import render
from django.utils import timezone
from django.views.generic import View

from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

class Home(View):
  template_name = 'books/index.html'

  def get(self, request):
    return render(request, self.template_name, {})

class Books(ListAPIView):
  serializer_class = BookSerializer

  def get_queryset(self):
    queryset = Book.objects.all()
    maxResults = self.request.query_params.get('maxResults', None)

    if maxResults is not None:
      queryset = queryset[:int(maxResults)]
    
    return queryset

class RecommendedBook(APIView):
  def get(self, request, format=None):
    current_week = date.today().isocalendar()[1] 
    rating = BookRating.objects.filter(timestamp__week = current_week).select_related().annotate(average=Avg('rating')).order_by('-average').first()
    if rating is not None:
      book = rating.book
      serializer = BookSerializer(book)

      return Response(serializer.data)
    else:
      return Response({}, 404)

class Authors(ListAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer

class Upcoming(ListAPIView):
  time = timezone.now()

  queryset = Book.objects.filter(publish_date__gt=time)
  serializer_class = BookSerializer

class Giveaways(ListAPIView):
  time = timezone.now()

  queryset = Giveaway.objects.filter(end_date__gt=time)
  serializer_class = GiveawaySerializer