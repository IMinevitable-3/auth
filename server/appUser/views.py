from appUser.models import User
from appUser.serializers import RegistrationSerializer , LoginSerializer , UserSerializer 
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status , permissions , viewsets
from appUser.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class AdminAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAdminUser] 



class RegistrationAPIView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self,request , format=None):
        serializer  = RegistrationSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True ) :

            try :
                user = serializer.save() 
                token = get_tokens_for_user(user) 
                return Response({'message':'sucess' , 'token':token} , status=status.HTTP_201_CREATED)
            except :
                return Response({"error" : "choose another username"})  
        
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST) 
    

class LoginAPIView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True ):
            # print(serializer.validated_data["username"]) 
            # print(serializer.validated_data["password"]) 
            try :
                user = User.objects.get(username=serializer.validated_data["username"]) 
            except User.DoesNotExist:
                return Response({"error":"username doesnt exist"} , status=status.HTTP_204_NO_CONTENT)
            if check_password( serializer.validated_data["password"],user.password )  :
                refresh = RefreshToken.for_user(user)
                return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
            else :
                return Response({"error":"Invalid password"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    