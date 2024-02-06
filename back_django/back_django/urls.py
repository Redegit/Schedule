"""
URL configuration for back_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from schedule.views import SubjectsView, TemplateLessonsView, TemplateLessonJoin, TeacherView, proxy_request

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/subjects/', SubjectsView.as_view(), name='subject-list'),
    path('api/template-lessons/', TemplateLessonJoin.as_view(), name='template-lessons-list'),
    path('api/teachers/', TeacherView.as_view(), name='teacher-list'),
    path('api/ruz/', proxy_request, name='ruz-api')
]
