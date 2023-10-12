from appUser.models import User 
from rest_framework import serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(
        max_length=255,
    )
    username = serializers.CharField(max_length=30 )
    password = serializers.CharField(write_only = True)
    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        user = User.objects.create_user(validated_data['username'],validated_data["email"],validated_data['password'] )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True) 
