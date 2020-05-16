from . import db
from werkzeug.security import generate_password_hash

class UserProfile(db.Model):

    __tablename__ = 'user_profiles'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(255))
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    gender = db.Column(db.String(80))
    email = db.Column(db.String(80))
    location = db.Column(db.String(80))
    biography = db.Column(db.String(255))
    profile_photo = db.Column(db.String(255))
    joined = db.Column(db.String(80))

    def __init__(self, username, password, first_name, last_name, gender, location, email, bio, photo, date):
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.location = location
        self.email = email
        self.biography = bio
        self.profile_photo = photo
        self.joined = date

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' %  self.username


class UserPosts(db.Model):
    
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    photo = db.Column(db.String(255))
    caption = db.Column(db.String(80))
    created = db.Column(db.String(80))
    

    def __init__(self,user_id, photo, caption, created):
        self.user_id = user_id
        self.photo = photo
        self.caption = caption
        self.created = created

class UserLikes(db.Model):

    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
    

    def __init__(self,user_id,post_id):
        self.user_id = user_id
        self.post_id = post_id

class UserFollows(db.Model):

    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)
    
    def __init__(self,user_id, follower_id):
        self.user_id = user_id
        self.follower_id = follower_id
