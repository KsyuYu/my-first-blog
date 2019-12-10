from django.shortcuts import render
from django.shortcuts import render
from .models import Comment
# Create your views here.
def post_list(request):
    return render(request, 'comments/post_list.html', {})