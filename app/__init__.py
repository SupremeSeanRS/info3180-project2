from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

UPLOAD_FOLDER = './app/static/uploads'
TOKEN_SECRET = 'secrettoken'

app = Flask(__name__)
csrf =CSRFProtect(app)

app.config['SECRET_KEY'] = "ASD123"  
#app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:project2@localhost/project2"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://kuyycxvvoedlmw:815a0a66989f6a82666e513fe23987f16534a8e1d5c7fc80060545e98cbcb644@ec2-34-195-169-25.compute-1.amazonaws.com:5432/d2v198qq6lunjn"
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