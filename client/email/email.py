
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

from django.utils import html

load_dotenv()

# send email on register
def send_register_email(username, email):
    msg = EmailMessage()
    msg['Subject'] = 'Welcome to Anichart!'
    msg['From'] = os.environ.get('EMAIL_SENDER')
    msg['To'] = email

    htmlFile = os.path.join(os.path.dirname(__file__), 'register_user.html')

    html = open(htmlFile, 'r').read().format(username = username)
    msg.set_content(html, subtype='html')

    s = smtplib.SMTP('smtp-mail.outlook.com', 587)
    s.starttls()
    s.login(os.getenv("EMAIL_SENDER"), os.getenv("EMAIL_PASSWORD"))
    s.send_message(msg)
    s.quit()

# send email for password reset
def send_reset_email(username, email):
    msg = EmailMessage()
    msg['Subject'] = 'Anichart: Password Reset'
    msg['From'] = os.environ.get('EMAIL_SENDER')
    msg['To'] = email

    password_reset_url = 'http://localhost:3000/reset?username={username}'.format(username = username)


    html = open('reset_password.html', 'r').read().format(username = username, action_url = password_reset_url)
    msg.set_content(html, subtype='html')
    
    s = smtplib.SMTP('smtp-mail.outlook.com', 587)
    s.starttls()
    s.login(os.getenv("EMAIL_SENDER"), os.getenv("EMAIL_PASSWORD"))
    s.send_message(msg)
    s.quit()
