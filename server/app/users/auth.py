#Custom authentication model for users

from users.models import User

def authenticate(username = None, password = None):
    try:
        user = User.objects.get(username = username)
        if user.check_password(password):
            return user
    except User.DoesNotExist:
        return None


def get_user(user_id):
    try:
        return User.objects.get(pk = user_id)
    except User.DoesNotExist:
        return None
