from django.contrib import admin
from .models import StudentEntry

@admin.register(StudentEntry)
class StudentEntryAdmin(admin.ModelAdmin):
    list_display = ('name', 'student_id')