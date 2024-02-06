import datetime

import requests
from django.http import JsonResponse
from rest_framework import generics

from .models import Subject, Lesson, TemplateLesson, Teacher
from .serializers import SubjectSerializer, LessonSerializer, TemplateLessonSerializer, TemplateLessonJoinSerializer, \
    TeacherSerializer


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
            queryset = TemplateLesson.objects.order_by("start_dt").filter(start_dt__gte=start_date,
                                                                          end_dt__lte=end_date).all()
        else:
            queryset = TemplateLesson.objects.order_by("start_dt").all()

        return queryset


class SingleTemplateLessonView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TemplateLesson.objects.all()
    serializer_class = TemplateLessonSerializer


class TeacherView(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


def proxy_request(request):
    try:
        # Получаем параметры запроса от клиента
        # target_url = request.GET.get('url', '')
        target_url = "https://ruz.fa.ru/api/schedule/group/110809/"
        start_date = request.GET.get('start', '')
        end_date = request.GET.get('finish', '')
        lng = request.GET.get('lng', '1')

        full_url = f"{target_url}?start={start_date}&finish={end_date}&lng={lng}"
        response = requests.get(full_url)
        data = {'data': response.json()}
        return JsonResponse(data)

    except Exception as e:
        return JsonResponse({'error': str(e)})
