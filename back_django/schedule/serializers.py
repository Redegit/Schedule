from rest_framework import serializers
from .models import Subject, Homework, TemplateLesson, Lesson, Teacher


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class TemplateLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateLesson
        fields = '__all__'


class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'

class TemplateLessonJoinSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    teacher_ref = serializers.CharField()
    subject_ref = serializers.CharField()
    start_dt = serializers.DateTimeField()
    end_dt = serializers.DateTimeField()
    classroom = serializers.CharField()
    type = serializers.CharField()
    lesson_number = serializers.IntegerField()


class Meta:
        fields = '__all__'
