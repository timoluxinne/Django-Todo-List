from django.urls import path
from .views import TaskCreate, TaskDetail, TaskList, apiOverview

urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('task-list/', TaskList, name='task-list'),
    path('task-create/', TaskCreate, name='task-create'),
    path('task-detail/<str:pk>/', TaskDetail, name='task-detail'),
]
