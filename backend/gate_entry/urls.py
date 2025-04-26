from django.urls import path
from . import views

urlpatterns = [
        path('api/student-entry/', views.student_entry_view, name='student_entry'),
    ]