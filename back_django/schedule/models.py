from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, null=True)
    control_type = models.CharField(max_length=20)
    semester = models.IntegerField()

    class Meta:
        db_table = 'Subject'

    def __str__(self):
        return self.name


class Teacher(models.Model):
    surname = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    note = models.CharField(null=True)

    class Meta:
        db_table = 'Teacher'

    def __str__(self):
        return f"{self.surname} {self.first_name[0] if self.first_name else '?'}. {self.middle_name[0] if self.middle_name else '?'}."


class Lesson(models.Model):
    name = models.CharField(max_length=100, default="Предмет")
    subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE)
    teacher_id = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    start_dt = models.DateTimeField()
    end_dt = models.DateTimeField()
    classroom = models.CharField(max_length=50, null=True)
    type = models.CharField(max_length=50)
    lesson_number = models.IntegerField(null=True)

    class Meta:
        db_table = 'Lesson'


class TemplateLesson(models.Model):
    name = models.CharField(max_length=100, default="Предмет")
    subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE)
    teacher_id = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    start_dt = models.DateTimeField()
    end_dt = models.DateTimeField()
    classroom = models.CharField(max_length=50, null=True)
    type = models.CharField(max_length=50)
    lesson_number = models.IntegerField(null=True)

    class Meta:
        db_table = 'TemplateLesson'


class Homework(models.Model):
    lesson_id = models.ForeignKey(Subject, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default="Не выдано")
    priority = models.IntegerField(choices=(
        ("LOW", "Низкий"),
        ("MEDIUM", "Средний"),
        ("HIGH", "Высокий")
    ))
    description = models.CharField()

    class Meta:
        db_table = 'Homework'
