"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os, datetime, jwt, base64
from app import app, db, login_manager, token_key
from flask import render_template, request, redirect, url_for, jsonify, flash, g, session, _request_ctx_stack 
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from app.forms import loginForm, registrationForm, postForm
from app.models import UserPosts, UserProfile, UserLikes, UserFollows
from functools import wraps


###
# Routing for your application.
###



def requires_auth(f): 
    @wraps(f) 
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        if not auth:
            return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

        parts = auth.split()

        if parts[0].lower() != 'bearer':
            return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
        elif len(parts) == 1:
            return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
        elif len(parts) > 2:
            return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

        token = parts[1]
        try:
             payload = jwt.decode(token, token_key)
             get_user = UserProfile.query.filter_by(id=payload['user_id']).first()

        except jwt.ExpiredSignature:
            return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
        except jwt.DecodeError:
            return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

        g.current_user = user = get_user
        return f(*args, **kwargs)

    return decorated 



@app.route('/')
def home():
    """Render website's home page."""
    return render_template('index.html')
    
    
    
@app.route('/api/users/register', methods=['POST'])
def register():
    """accepts user information and save it to the database"""
    form = registrationForm()
    now = datetime.datetime.now()
    if request.method == 'POST' and form.validate_on_submit():
        username= form.username.data
        password = form.password.data
        confirmpassword = form.confirmpassword.data
        fname = form.firstname.data
        lname = form.lastname.data
        gender = form.gender.data
        email = form.email.data
        location = form.location.data
        bio=form.bio.data
        photo=form.photo.data
        filename = secure_filename(photo.filename)

        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        photo='/static/uploads/'+ filename
        date=now.strftime("%B %d, %Y")
        
        user = UserProfile.query.filter_by(username=username).first()
        if user is None :
            #todo add user to database
            if password == confirmpassword:
                user=UserProfile(username, password, fname, lname, gender, location, email, bio, photo, date)
                db.session.add(user)
                db.session.commit()
                flash('Registration was successfull', 'success')
                return jsonify(response=[{"message":"User successfully registered"}])
            else:
                flash("Password and Confirmpassword don't match", 'danger')
                return jsonify(response=[{"message":"Passwords does not match"}])
                
        elif user is not None:
            flash("already a member", 'danger')
            return jsonify(errors=[{"error":"You are already a member"}])
    return jsonify(errors=[{"errors":form_errors(form)}])
    
    
    
@app.route('/api/auth/login',methods=['POST'])
def login():
    
    form = loginForm()
    
    if request.method == 'POST' and form.validate_on_submit():

        username = form.username.data
        password = form.password.data
        
        user = UserProfile.query.filter_by(username=username).first()
        
        if user is not None and check_password_hash(user.password, password):
            remember_me = False
            
            if 'remember_me' in request.form:
                remember_me = True
        
            # If the user is not blank, meaning if a user was actually found,
            # then login the user and create the user session.
            # user should be an instance of your `User` class
            #login_user(user, remember=remember_me)
            
            payload = {'user_id': user.id}
            token = jwt.encode(payload,token_key)
            session['userid']=user.id
            return jsonify(response=[{"token":token,"message":"login was successfully","user":user.id}])
            
        else:
            flash('Username or Password is incorrect.', 'danger')
            return jsonify(errors=[{"errors":"Username or Password is incorrect."}])

    return jsonify(errors=[{"errors":form_errors(form)}])
    
    

@app.route('/api/auth/logout',methods=['GET']) 
@requires_auth
def logout():
    """logout users"""
    g.currrent_user=None
    if session['userid']:
        session.pop('userid')  
        logout={"message":"User successfully logged out"}
        return jsonify(response=[logout])
    return jsonify(errors=[{"errors":"not logout"}])


@app.route('/api/users/<user_id>/posts',methods=["POST","GET"]) 
@requires_auth
#@login_required
def post(user_id):
    """used for adding posts to the users feed"""
    form = postForm()
    id=int(user_id)
    now = datetime.datetime.now()
    
    if request.method == 'POST':
        if form.validate_on_submit():
            photo=form.photo.data
            caption= form.caption.data
            filename = secure_filename(photo.filename)
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            photo='/static/uploads/'+ filename
            date=now.strftime("%B %d, %Y")                                                                                                                                                                     
            user=UserPosts(user_id,photo,caption,date)
            db.session.add(user)
            db.session.commit()
            return jsonify(response=[{"message":"Successfully created a new post"}])
        else:
            return jsonify(errors=[{"errors":form_errors(form)}])
    if request.method == 'GET':
        u=[]
        f=[0,0]
        userdetail =UserProfile.query.filter_by(id=id).first()
        Users =UserPosts.query.filter_by(user_id=id).all()
        length=len(Users)
        followers=UserFollows.query.filter_by(user_id=id).all()
        follow=len(followers)
        for follower in followers:
            f.append(follower.user_id)
        for user in Users:
            u.append({'id':user.id,'user_id':user.user_id,'photo':user.photo,'caption':user.caption,
            'created_on':user.created_on,'likes':0})
        return jsonify(response=[{"id":user_id ,"username":userdetail.username,"firstname":userdetail.first_name,
        "lastname":userdetail.last_name,"email":userdetail.email,"location": userdetail.location,"biography":userdetail.biography,
        "profile_photo":userdetail.profile_photo,"joined_on":userdetail.joined_on,"posts":u,"numpost":length,"numfollower":follow,"follower":f}])
    else:
         return jsonify(error=[{"errors":"unable to create link"}])
        
    

@app.route('/api/users/<user_id>/follow',methods=['POST'])
#@login_required
@requires_auth
def follow(user_id): 
    """create a follow relationship between the current user and the target user."""
    if request.method == 'POST':
        target_user=int(request.form['user_id'])
        current_user=int(request.form['follower_id'])
        follows=UserFollows.query.filter_by(user_id=target_user).all()
        check=''
        for follow in follows:
            if current_user==follow.follower_id:
                check=1
                
        if check!=1:
            follow = UserFollows(target_user,current_user)
            db.session.add(follow)
            db.session.commit()
            user = UserProfile.query.filter_by(id=target_user).first()
            msg="You are now following that user."+ user.username
            numfollow=len(UserFollows.query.filter_by(user_id=target_user).all())
            return jsonify (response=[{"message":msg,"follow":numfollow}]) 
        else:
            numfollow=len(UserFollows.query.filter_by(user_id=target_user).all())
            return jsonify (response=[{"message":"You are already following that user.","follow":numfollow}]) 
    else:
        return jsonify (errors=[{'error': 'unable to create link'}])
    

@app.route('/api/posts',methods=['GET']) 
#@login_required
@requires_auth
def get_AllPost():
    """return all post for all users."""
    if request.method == 'GET':
        u=[]
        Users= UserPosts.query.order_by(UserPosts.user_id).all()
        for user in Users:
            userdetail =UserProfile.query.filter_by(id=user.user_id).first()
            userlike = len(UserLikes.query.filter_by(post_id=user.id).all())
            u.append({'id':user.id,'user_id':user.user_id,'postphoto':user.photo,'caption':user.caption,
            'created_on':user.created_on,'likes':userlike,"username":userdetail.username,"userpro":userdetail.profile_photo})
        return jsonify (response=[{'post': u}])
    return jsonify (errors=[{'error': 'unable to create link'}])

@app.route('/api/posts/<post_id>/like',methods=['POST'])
#@login_required
@requires_auth
def like(post_id):
    """ set a like on the current post by the logged in user"""
    if request.method == 'POST':
        user_id=int(request.form['user_id'])
        post=int(request.form['post_id'])
        like = UserLikes(user_id,post)
        db.session.add(like)
        db.session.commit()
        total_likes = len(UserLikes.query.filter_by(post_id=post).all())
        return jsonify (response=[{'message': 'You liked a user post','likes':total_likes}])
    return jsonify (error=[{'error': 'unable to create link'}])

@login_manager.user_loader
def load_user(id):
    return UserProfile.query.get(int(id))

# Flash errors from the form if validation fails
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages
  

###
# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


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