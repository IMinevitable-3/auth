from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class MyUserManager(BaseUserManager):
    def create_user(self, username ,  email, password=None ):
        """
        Creates and saves a User with the given email, username
        and password.
        """
        if not username:
            raise ValueError("Users must have an username")

        user = self.model(
            email=self.normalize_email(email),
            username = username ,
            password = password
        )

        user.set_password(password) 
        user.save(using=self._db)
        return user

    def create_superuser(self, email,username, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email=email,
            username = username , 
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

"""
username | email | password | 
"""
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email",
        max_length=255,
    )
    username = models.CharField(max_length=30 , unique=True)

    is_staff = models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "username" 
    REQUIRED_FIELDS = ["email" ] 

    def __str__(self):
        return self.username
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    