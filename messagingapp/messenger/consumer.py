from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from messenger.models.message import Message
from messenger.models.user import User


class ChatConsumer(WebsocketConsumer):

    def initialize_chat(self, text_data):
        username = text_data["username"]

        user, _ = User.objects.get_or_create(username=username)

        if not user:
            self.send_message({"error": f'Unable to get or create User to initialize chat with username: {username}'})
        else:
            self.send_message({"success": f"Initalized chat for user {username}"})

    def get_last_messages(self, data):
        n_messages = data.get("number_of_messages", 20)
        messages = Message.get_n_messages(n=n_messages)

        self.send_chat_message(json.dumps({"event": "last_messages", "messages": self.to_json(messages)}))

    def create_message(self, data):
        username = data["user"]
        content = data["content"]
        user, _ = User.objects.get_or_create(username=username)
        print("create message ", user)
        message = Message.objects.create(user=user, message_content=content)
        print("create message object ", message.message_content)

        response = {
            "event": "message_created",
            "data": {
                "id": str(message.id),
                "user": message.user.username,
                "content": message.message_content,
                "created_at": str(message.created_at)

            }
        }

        print("create message ", response)

        self.send_chat_message(json.dumps(response))

    def to_json(self, messages):
        all_messages = []
        for message in messages:
            all_messages.append({
                "id": str(message.id),
                "user": message.user.username,
                "content": message.message_content,
                "created_at": str(message.created_at)

            })
        return all_messages

    def connect(self):
        self.room_name = 'room'
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        sent_to = {
            'init_chat': self.initialize_chat,
            'get_messages': self.get_last_messages,
            'create_message': self.create_message
        }

        sent_to[text_data_json["command"]](text_data_json)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))