from rest_framework import serializers
from .models import StudentEntry

class StudentEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentEntry
        fields = '__all__'