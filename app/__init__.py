from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

UPLOAD_FOLDER = './app/static/uploads'
TOKEN_SECRET = 'secrettoken'

app = Flask(__name__)
csrf =CSRFProtect(app)

app.config['SECRET_KEY'] = "ASD123"  
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:project2@localhost/project2"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= True  # added just to suppress a warning

app.config['UPLOAD_FOLDER']= "./app/static/uploads/" # using a config value

db = SQLAlchemy(app)

# Flask-Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  
login_manager.login_message_category = "info"  


app.config.from_object(__name__)
filefolder = app.config['UPLOAD_FOLDER']
token_key = app.config['TOKEN_SECRET']
from app import views