from django.urls import path
from .views import TaskCreate, TaskDelete, TaskDetail, TaskList, TaskUpdate, apiOverview

urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('task-list/', TaskList, name='task-list'),
    path('task-create/', TaskCreate, name='task-create'),
    path('task-detail/<str:pk>/', TaskDetail, name='task-detail'),
    path('task-update/<str:pk>/', TaskUpdate, name='task-update'),
    path('task-delete/<str:pk>/', TaskDelete, name='task-delete'),
]
