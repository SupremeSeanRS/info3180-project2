from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
csrf = CSRFProtect(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

app.config['SECRET_KEY'] = "secure key" 
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://ospppqppphtysf:13aebfba2b841c15dcf9d60f50262e629d09f5c8d503fb4faf1142ce289b13d8@ec2-54-235-193-34.compute-1.amazonaws.com:5432/d99r9bmdq71p21"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # added just to suppress a warning


PROFILE_IMG_UPLOAD_FOLDER = os.path.join("static/uploads", "profile_pic")
POST_IMG_UPLOAD_FOLDER = os.path.join("static/uploads", "posts_pic")
UPLOAD_FOLDER ='./app/static/uploads'


app.config.from_object(__name__)
from app import views
