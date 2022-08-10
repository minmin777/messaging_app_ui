from datetime import timezone

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    last_online = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True
    )

    online = models.BooleanField(null=False, blank=False, default=False)

    def __str__(self):
        return self.username

    def update_online(self):
        self.online = True
        self.last_online = timezone.now()
        self.save()