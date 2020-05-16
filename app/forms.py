from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, PasswordField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Email
from flask_wtf.file import FileField, FileRequired, FileAllowed

class registrationForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    conpassword = PasswordField('Confirm Password', validators=[DataRequired()])
    firstname = StringField('Firstname', validators=[DataRequired()])
    lastname = StringField('Lastname', validators=[DataRequired()])
    gender = SelectField('Gender', choices=[('Male','Male'), ('Female', 'Female'), ('Other', 'Other'), ('N/A', 'N/A')])
    email = StringField('Email', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    bio = TextAreaField('Biography', validators=[DataRequired()])
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg','Images only!'])])

class loginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class postForm(FlaskForm):
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg','Images only!'])])
    caption = TextAreaField('Caption', validators=[DataRequired()])  
    
    
