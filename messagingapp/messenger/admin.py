from django.contrib import admin

# Register your models here.
from messenger.models.message import Message
from messenger.models.user import User

admin.site.register(User)
admin.site.register(Message)
