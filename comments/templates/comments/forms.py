from django import forms

from .models import Comment

class PostForm(forms.ModelForm):

    class Meta:
        model = Comment
        fields = ('author', 'text',)