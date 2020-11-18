from django.urls import path
from .views import TaskList, apiOverview

urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('task-list/', TaskList, name='task-list'),
]
