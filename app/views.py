"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app, db
from flask import render_template, request, redirect, url_for, jsonify
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename
from forms import *
from models import *
import os, datetime
import jwt
from functools import wraps


###
# Routing for your application.
###



@app.route('/')
def home():
    """Render website's home page."""
    return render_template('index.html')
    
    
    
@app.route('/api/users/register', methods=["POST"])
def register():
    form = registrationForm()
    
    if request.method=='POST' and form.validate_on_submit():
        
        try:
            username = form.username.data
            password = form.password.data
            location=form.location.data
            bio=form.biography.data
            lname=form.lastname.data
            fname=form.firstname.data
            email=form.email.data
            photo = form.photo.data
            date = str(datetime.date.today())
            filename = username+secure_filename(photo.filename)
            user = Users(username=username, password=password, first_name=fname, last_name=lname, email=email, location=location, biography=bio, profile_photo=filename, joined=date)
            photo.save(os.path.join("./app",app.config['PROFILE_IMG_UPLOAD_FOLDER'], filename))
            db.session.add(user)
            db.session.commit()
            return jsonify(message = "User was successfully registered")
            
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(errors=["Internal Error"])
    
    return jsonify(errors=form_errors(form))
    
    
    
@app.route('/api/auth/login',methods=["POST"])
def login():
    
    form = loginForm()
    
    if request.method == "POST" and form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = Users.query.filter_by(username=username).first()
        
        if user != None and check_password_hash(user.password, password):
            payload = {'user': user.username}
            jwt_token = jwt.encode(payload,app.config['SECRET_KEY'],algorithm = "HS256")
            response = {'message': 'User successfully logged in','token':jwt_token, "user_id": user.id}
            return jsonify(response)
        return jsonify(errors="Username or password is incorrect. Please try again!")
    
    return jsonify(errors=form_errors(form))
    
    
    
@app.route('/api/auth/logout', methods = ['GET'])
@token_authenticate
def logout():
    return jsonify(message= "User has been successfully logged out.")



@app.route('/api/posts', methods = ['GET'])
@token_authenticate
def viewPosts():
    getAllPosts = Posts.query.all()
    posts = []
    
    for post in getAllPosts:
        user = Users.query.filter_by(id=post.user_id).first()
        likeCount = len(Likes.query.filter_by(post_id=post.id).all())
        postObj = {"id": post.id, "user_id": post.user_id, "username": user.username, "user_profile_photo": os.path.join(app.config['PROFILE_IMG_UPLOAD_FOLDER'],user.profile_photo),"photo": os.path.join(app.config['POST_IMG_UPLOAD_FOLDER'],post.photo), "caption": post.caption, "created_on": strf_time(post.created_on, "%d %B %Y"), "likes": likeCount}
        posts.append(postObj)
    return jsonify(posts=posts)
    
    
    
@app.route('/api/users/<user_id>/posts', methods =['GET','POST'])
@token_authenticate
def posts(user_id):
    
    if request.method == 'GET':
        posts = Posts.query.filter_by(user_id = user_id).all()
        user = Users.query.filter_by(id=user_id).first()
        user_followers = len(Follows.query.filter_by(user_id=user.id).all())
        response = {"status": "ok", "post_data":{"firstname":user.first_name, "lastname": user.last_name, "location": user.location, "joined_on": "Member since "+strf_time(user.joined_on, "%B %Y"), "bio": user.biography, "postCount": len(posts), "followers": user_followers, "profile_image": os.path.join(app.config['PROFILE_IMG_UPLOAD_FOLDER'],user.profile_photo), "posts":[]}}
        
        for post in posts:
            postObj = {"id":post.id, "user_id": post.user_id, "photo": os.path.join(app.config['POST_IMG_UPLOAD_FOLDER'], post.photo), "caption": post.caption, "created_on": post.created_on}
            response["post_data"]["posts"].append(postObj)
        
        return jsonify(response)
        
        
    if request.method == 'POST':
        
        form = postForm()
        
        if form.validate_on_submit():
            
            userid = form.user_id.data
            photo = form.photo.data
            caption = form.caption.data
            user = Users.query.filter_by(id=userid).first()
            filename = user.username+secure_filename(photo.filename)
            created = str(datetime.date.today())
            
            post = Posts(user_id=userid, photo=filename, caption=caption ,created=created)
            photo.save(os.path.join("./app", app.config['POST_IMG_UPLOAD_FOLDER'],filename))
            db.session.add(post)
            db.session.commit()
            return jsonify(status=201, message="Post Created")
            
        print (form.errors.items())
        return jsonify(status=200, errors=form_errors(form))
        
        
        
@app.route('/api/users/<user_id>/follow', methods = ['POST'])
@token_authenticate
def follow(user_id):
    
    request_payload = request.get_json()
    
    result = Follows.query.filter_by(user_id = request_payload['user_id'], follower_id = request_payload['follower_id']).first()
    
    if result!= None:
        return jsonify(status = 200, message="Follow was unsuccessful. Please try again")
    
    follow = Follows(user_id = request_payload['user_id'], follower_id = request_payload['follower_id'])
    db.session.add(follow)
    db.session.commit()
    
    return jsonify(status = 201, message="You are now following!")


# Like Route
@app.route('/api/posts/<post_id>/like', methods = ['POST'])
@token_authenticate
def like(post_id):
    
    request_payload = request.get_json()
    user_id = request_payload["user_id"]
    post_id = request_payload["post_id"]
    
    post = Posts.query.filter_by(id=post_id).first()
    Postlikes = Likes.query.filter_by(post_id=post_id).all()
    
    if post is None:
        return jsonify(staus="", message="This post does not exist. Please refresh the page.")
        
    if Postlikes is not None:
        for like in Postlikes:
            if like.user_id == user_id:
                return jsonify(status=200, message="You have already liked this.")
        
    NewLike = Likes(post_id = post_id, user_id = user_id)
    
    db.session.add(NewLike)
    db.session.commit()
    
    total_likes = len(Likes.query.filter_by(post_id=post_id).all())
    return jsonify({"status":201,'message': 'post liked','likes':total_likes})


def strf_time(date, dateFormat):
    return datetime.date(int(date.split('-')[0]),int(date.split('-')[1]),int(date.split('-')[2])).strftime(dateFormat)
    
    

# errors from the form if validation fails
def form_errors(form):
    
    errorArr = []
    
    for field, errors in form.errors.items():
        for error in errors:
            errorArr.append(error)
            
    return errorArr
    
    
    
@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response
    
    
    
@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404
    
    
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
