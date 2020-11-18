from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
