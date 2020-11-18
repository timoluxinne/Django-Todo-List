from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'list view': '/task-list/',
        'Create view': '/task-new/',
        'Detail view': '/task-detail/<str:pk>/',
        'Update view': '/task-update/<str:pk>/',
        'Delete view': '/task-delete/<str:pk>/',
    }

    return Response(api_urls)

@api_view(['GET'])
def TaskList(request):
    posts = Task.objects.all()
    serializer = TaskSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def TaskDetail(request, pk):
    post = Task.objects.get(id=pk)
    serializer = TaskSerializer(post)
    return Response(serializer.data)

@api_view(['POST'])
def TaskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

