import uuid

from django.core.exceptions import ValidationError
from django.db import models


def validate_message_content(message):
    if message is None or len(message) == 0 or message == " ":
        raise ValidationError("Message content is invalid")


class Message(models.Model):
    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )

    user = models.ForeignKey(
        'User',
        blank=False,
        null=False,
        related_name='messages',
        on_delete=models.CASCADE
    )

    message_content = models.TextField(
        blank=False,
        null=False,
        validators=[validate_message_content]
    )

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def get_n_messages(n):
        if isinstance(n, str) and not n.isnumeric():
            n = 20
        return Message.objects.order_by('-created_at').all()[:n]
