from django.shortcuts import render

from rest_framework import generics
from .models import Subject, Lesson, TemplateLesson
from .serializers import SubjectSerializer, LessonSerializer, TemplateLessonSerializer


class SubjectsView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class SingleSubjectView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class LessonsView(generics.ListCreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class SingleLessonView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class TemplateLessonsView(generics.ListCreateAPIView):
    queryset = TemplateLesson.objects.all()
    serializer_class = TemplateLessonSerializer


class SingleTemplateLessonView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TemplateLesson.objects.all()
    serializer_class = TemplateLessonSerializer
