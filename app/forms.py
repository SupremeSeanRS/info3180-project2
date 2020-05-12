from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, PasswordField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Email
from flask_wtf.file import FileField, FileRequired, FileAllowed

class registrationForm(FlaskForm):
    username=StringField('username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirmpassword = PasswordField('ConfirmPassword', validators=[DataRequired()])
    firstname=StringField('Firstname', validators=[DataRequired()])
    lastname=StringField('Lastname', validators=[DataRequired()])
    gender=SelectField('Gender', choices=[('Male','Male'), ('Female', 'Female')])
    email=StringField('Email', validators=[DataRequired(),Email()])
    location=StringField('Location', validators=[DataRequired()])
    bio=TextAreaField('Biography', validators=[DataRequired()])
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg','Images only!'])])

class loginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember me')

class postForm(FlaskForm):
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg','Images only!'])])
    caption=TextAreaField('Caption', validators=[DataRequired()])  
    
    