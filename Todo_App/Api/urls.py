from django.urls import path
from .views import TaskDetail, TaskList, apiOverview

urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('task-list/', TaskList, name='task-list'),
    path('task-detail/<str:pk>/', TaskDetail, name='task-detail'),
]
