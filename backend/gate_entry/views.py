from rest_framework import generics
from .models import StudentEntry
from .serializers import StudentEntrySerializer

class StudentEntryCreateView(generics.CreateAPIView):
    queryset = StudentEntry.objects.all()
    serializer_class = StudentEntrySerializer