from django.urls import path
from .views import task

urlpatterns = [
    path('', task, name='task')
]
