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

app.config['SECRET_KEY'] = "123ABC" 
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:project2@localhost/database"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # added just to suppress a warning


PROFILE_IMG_UPLOAD_FOLDER = os.path.join("static/uploads", "profile_pic")
POST_IMG_UPLOAD_FOLDER = os.path.join("static/uploads", "posts_pic")
UPLOAD_FOLDER ='./app/static/uploads'


app.config.from_object(__name__)
from app import views
