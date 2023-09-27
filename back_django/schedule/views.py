import datetime

from django.shortcuts import render

from rest_framework import generics
from .models import Subject, Lesson, TemplateLesson
from .serializers import SubjectSerializer, LessonSerializer, TemplateLessonSerializer, TemplateLessonJoinSerializer


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


class TemplateLessonJoin(generics.ListCreateAPIView):
    serializer_class = TemplateLessonJoinSerializer

    def get_queryset(self):
        start_date = datetime.datetime.fromisoformat(self.request.query_params.get('start_date', None))
        end_date = datetime.datetime.fromisoformat(self.request.query_params.get('end_date', None))

        if start_date is not None and end_date is not None:
            queryset = TemplateLesson.objects.order_by("start_dt").filter(start_dt__gte=start_date, end_dt__lte=end_date).all()
        else:
            queryset = TemplateLesson.objects.order_by("start_dt").all()

        return queryset


class SingleTemplateLessonView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TemplateLesson.objects.all()
    serializer_class = TemplateLessonSerializer
