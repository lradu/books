from rest_framework.serializers import ModelSerializer, SerializerMethodField, StringRelatedField

from .models import *

class AuthorSerializer(ModelSerializer):
  books = SerializerMethodField()
  genres = SerializerMethodField()
  photo = SerializerMethodField()
  
  class Meta:
    model = Author
    fields = [
      'id',
      'first_name',
      'last_name',
      'photo',
      'born_date',
      'website',
      'description',
      'books',
      'genres'
    ]
  def get_photo(self, author):
    return author.photo.url
  
  def get_books(self, author):
    count = Book.objects.filter(authors = author).count()

    return count
  def get_genres(self, author):
    genres = set()

    for book in Book.objects.filter(authors = author).select_related():
      for genre in book.genres.all():
        genres.add(genre.title)

    return genres

class BookSerializer(ModelSerializer):
  authors = AuthorSerializer(many=True)
  genres = StringRelatedField(many=True)
  ratings = SerializerMethodField()
  cover = SerializerMethodField()

  class Meta:
    model = Book
    fields = [
      'id',
      'title',
      'cover',
      'description',
      'rating',
      'ratings',
      'genres',
      'authors'
    ]
  
  def get_cover(self, book):
    return book.cover.url

  def get_ratings(self, book):
    rating = BookRating.objects.filter(book = book).count()

    return rating

class GiveawaySerializer(ModelSerializer):
  book = BookSerializer()

  class Meta:
    model = Giveaway
    fields = [
      'book',
      'copies',
      'end_date'
    ]