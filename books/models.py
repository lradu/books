from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models import Avg
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone

class Author(models.Model):
  first_name = models.CharField(max_length = 200)
  last_name = models.CharField(max_length = 200)
  photo = models.ImageField(upload_to = 'assets/images/authors/', null = True, blank = True)
  born_date = models.DateField(null = True, blank = True)
  website = models.URLField(blank = True)
  description = models.TextField(blank = True)

  def __str__(self):
    return self.first_name

class Genre(models.Model):
  title = models.CharField(max_length = 200)

  def __str__(self):
    return self.title

class Book(models.Model):
  authors = models.ManyToManyField(Author)
  cover = models.ImageField(upload_to = 'assets/images/covers/', null = True, blank = True)
  description = models.TextField()
  genres = models.ManyToManyField(Genre)
  publish_date = models.DateTimeField(default = timezone.now)
  rating = models.DecimalField(default = 0, max_digits = 3, decimal_places = 2)
  title = models.CharField(max_length = 200)
  timestamp = models.DateTimeField(auto_now = False, auto_now_add = True)

  class Meta:
    ordering = ['-rating']

  def __str__(self):
    return self.title

class Favorite(models.Model):
  title = models.TextField(max_length = 200, default = "My Favorite Books")
  user = models.ForeignKey(User, on_delete = models.CASCADE)
  books = models.ManyToManyField(Book)
  timestamp = models.DateTimeField(auto_now = False, auto_now_add = True)

  def __str__(self):
    return self.title


def validate_rating(value):
  if value < 1 or value > 5:
    raise ValidationError('Rating must be between 1 and 5.')

class BookRating(models.Model):
  rating = models.SmallIntegerField(default = 1, validators=[validate_rating])
  book =  models.ForeignKey(Book, on_delete = models.CASCADE)
  user = models.ForeignKey(User, on_delete = models.CASCADE)
  timestamp = models.DateTimeField(auto_now = False, auto_now_add = True)

  def __str__(self):
    return str(self.book)



@receiver([post_save, post_delete], sender=BookRating)
def update_book_rating(sender, instance, **kwargs):
  book = Book.objects.get(pk = instance.book.id)
  rating = BookRating.objects.filter(book = instance.book).aggregate(Avg('rating'))
  try:
    with transaction.atomic():
      book.rating = rating['rating__avg']
      book.save()
  except:
    pass 