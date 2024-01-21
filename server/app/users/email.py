
import smtplib
from email.message import EmailMessage
import os

# send email on register
def send_register_email(email):
    msg = EmailMessage()
    msg['Subject'] = 'Welcome to Anichart!'
    msg['From'] = os.environ.get('EMAIL_SENDER')
    msg['To'] = email

    msg.set_content('This is a test email')
    s = smtplib.SMTP('smtp-mail.outlook.com', 587)
    s.starttls()
    s.login(os.getenv("EMAIL_SENDER"), os.getenv("EMAIL_PASSWORD"))
    s.send_message(msg)
    s.quit()

# send email for password reset
def send_reset_email(email):
    msg = EmailMessage()
    msg['Subject'] = 'Anichart: Password Reset'
    msg['From'] = os.environ.get('EMAIL_SENDER')
    msg['To'] = email

    msg.set_content('This is a test email')
    
    s = smtplib.SMTP('smtp-mail.outlook.com', 587)
    s.starttls()
    s.login(os.getenv("EMAIL_SENDER"), os.getenv("EMAIL_PASSWORD"))
    s.send_message(msg)
    s.quit()