from datetime import timezone

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    last_read = models.DateTimeField(
        auto_now_add=True,
        blank=False,
        null=False
    )

    online = models.BooleanField(null=False, blank=False, default=False)

    def __str__(self):
        return self.username

    def read(self):
        self.last_read_date = timezone.now()
        self.save()