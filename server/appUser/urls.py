from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path ,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,TokenVerifyView
)
from rest_framework.routers import DefaultRouter
from . import views 
router = DefaultRouter()
router.register(r'admin', views.AdminAPI, basename='admin')
 
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/user/register/' , views.RegistrationAPIView.as_view()) ,
    path('api/user/login/' , views.LoginAPIView.as_view()) ,

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]


