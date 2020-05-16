/* Add your Application JavaScript */

let User_id = '';
let other = '';
let messge = '';

Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <a class="navbar-brand" href="#"><img src="/static/images/logo.png" alt="home page picture" style="width:20px;height:20px;"/> Photogram</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            
            <ul class="navbar-nav">
            
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                
                <li class="nav-item active">
                    <router-link to="/explore" class="nav-link">Explore</router-link>
                </li>
                
                <li id="myprofile" class="nav-item active hide_info" @click="check">
                    <router-link to="/users/:user_id" class="nav-link">My Profile</router-link>
                </li>
                
                <li id="logout" class="nav-item active hide_info">
                    <router-link class="nav-link" to="/logout">Logout</router-link>
                </li>
            </ul>
        </div>
    </nav>
    `,
    methods: {
        check:function(){
            self = this;
            if(other == ""){
                self.$router.push("/users/"+ User_id);
            }
            else{
                other = "";
                self.$router.push("/explore");
                setTimeout(function(){ self.$router.push("/users/"+ User_id)},400);
            }
        }
    }
}); 


Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = Vue.component('home', {
        template: `
        
        <div @mouseover="Reseth5">
            
            <br><br>
            <h5 v-if="text=='User has been successfully logged out.'" class="alert alert-success">{{text}}</h5>
            <div v-if = "uc != ''" id="home">
                <h1>Welcome to Photogram </h1>
                <p>The place to share your moments with the world</p>
                <br>
            </div>
            
            <div v-else class="home_page">
                <div id="homepic">
                    <img src="/static/images/home.jpg" alt="home page picture" id="home_img"/>
                </div>
                
                <div class="home_welcome">
                    <div class="photogramlogo_home">
                        <img src="/static/images/photogram.png" id="photogramlogo_home_pic"/>
                    </div>

                    <div class="welcome_text">
                    <br>
                        <p>Share photos of your favourite moments with friends, family and the world.</p>
                        
                        <p>Share your photos by heading over to the explore tab</p>
                    </div>

                <div>
                    <router-link to="/register" class="btn btn-success registerBtn">Register</router-link>
                    <router-link to="/login" class="btn btn-primary loginBtn">Login</router-link>
                </div>
            </div>
        </div>
    </div>
    `,
    
    data: function(){
        return{
            uc: User_id,
            text: messge
        };   
        },
        
     methods:{
          Reseth5:function ()
            {
                this.text="";
            }
       }
    });


const Register=Vue.component('register',{
     template:`
     <div>
        <div>
            <ul v-for="(mgs,con,index) in messge">
                <div v-if="con === 'errors'"> 
                    <li v-for="mgs in messge.errors" class="error">
                        {{mgs}}
                    </li>
                </div>
            </ul>
        </div>
        
        <h1 class="registrationWelcome">Registration</h1>
        
        <form class="regForm" id="register" @submit.prevent="RegisterForm" method="POST" enctype="multipart/form-data" @click="Reset">
            <div class="form-space">
                <div class="row">
                    <div class="col-md-11">
                          <div class="form-group">
                              <label class="label_bold">Username</label>
                              <input type="text" class="form-control" name="username"/>
                          </div>
                      </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Password</label>
                            <input type="password" class="form-control" name="password"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Confirm Password</label>
                            <input type="password" class="form-control" name="conpassword"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">First name</label>
                            <input type="text" class="form-control" name="firstname"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Last name</label>
                            <input type="text" class="form-control" name="lastname"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Gender</label>
                            <br>
                            <select name="gender">
                                <option value="">Please Select Your Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="N/A">N/A</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Email</label>
                            <input type="text" class="form-control" placeholder="E.g. johnbrown@example.com" name="email"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Location</label>
                            <input type="text" class="form-control" placeholder="Eg. Montego Bay, Jamaica" name="location"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                        <div class="form-group">
                            <label class="label_bold">Biography</label>
                            <textarea name="bio" class="form-control"/></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                    <div class="form-group">
                      <label class="label_bold">Photo</label>
                      <input type="file" name="photo"/>
                    </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-11">
                        <button type="submit" class="btn btn-success reg">Register</button>
                    </div>
                </div>
            </div>
            </form>
     </div> `,
     data: function(){
            return{
                messge: []
            }
        },
     methods:{
        RegisterForm: function(){
            let self = this;
            let registerForm = document.getElementById('register');
            let form_data = new FormData(registerForm);
    
            fetch("/api/users/register",{
                method:'POST',
                body: form_data,
                headers:{
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
              })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  if(jsonResponse.response!=null)
                      {
                        messge="User has been successfully registered.";
                        self.$router.push("/login");
                      }
                   else{
                       self.messge = jsonResponse.errors['0'];
                       self.$router.push("/login");
                      }
              })
              .catch(function(errors){
              });
        },
        Reset:function ()
        {
            this.messge = "";
        }
    }
    
});


const Login=Vue.component('login',{
     template:`
     <div class="loginPage">
         <div>
            <ul  v-for="(mgs,con, index) in messge">
            <div v-if="con === 'errors'" >
                <li v-for="mgs in messge.errors" class="error">
                    {{mgs}}
                </li>
            </div>
            </ul>
         </div>
     <br>
     <h5 v-if="text=='User has been successfully registered.'" class="alert alert-success">{{text}}</h5>
     <h1 class="loginWelcome">Login</h1>
     
     <form class="logForm" id="login" @submit.prevent="LoginForm" method="POST" @click="Reset">
         <div id="usrname">
             <label for="username" name="username"><strong>Username</strong></label><br>
             <input type='text' class="form-control" name='username'/>
         </div>
         <br>
         <div id="passwrd">
             <label for="password" name="Password"><strong>Password</strong></label><br>
             <input type='password' class="form-control" name='password'/>
         </div>
         <br>
         <button type="submit" class="btn btn-success log">Login</button>
     </form>
     </div>
     `,
     data: function(){
         return{
              messge:[],
              text:[]
         }
     },
     methods:{
        LoginForm: function(){
            let self = this;
            let loginForm= document.getElementById('login');
            let form_data = new FormData(loginForm);
    
            fetch("/api/auth/login",{
                method:'POST',
                body: form_data,
                headers:{
                    'X-CSRFToken':token
                },
                credentials: 'same-origin'
            })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  if(jsonResponse.response!=null)
                  {
                    User_id = jsonResponse.response["0"].user;
                    let jwt_token=jsonResponse.response["0"].token;
                    localStorage.setItem('token',jwt_token);
                    localStorage.setItem('userid', User_id);
                    self.$router.push("/explore");
                    messge="You have been successfully logged in.";
                    let logout= document.getElementById('logout'); 
                    logout.classList.remove('hide_info');
                    let myprofile = document.getElementById('myprofile'); 
                    myprofile.classList.remove('hide_info');
                  }
                  else{
                      self.messge=jsonResponse.errors['0'];
                  }
              })
              .catch(function(errors){
              });
        },
    Reset:function (){
         this.text= "";
         this.messge= "";
     }
    },
    created: function(){
         this.text= messge;
    }
    
});
    
    
const Logout= Vue.component('logout-form',{
    template:`<div> </div>
    `,
    created: function() {
        let self = this;
        fetch("/api/auth/logout", { 
             method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                 'X-CSRFToken': token
            },
            credentials: 'same-origin' 
          })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse){
                if(jsonResponse.response["0"].message=="User has been successfully logged out.")
                 {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userid');
                    messge="User has been successfully logged out.";
                    let logout= document.getElementById('logout'); 
                    logout.classList.add('hide_info');
                    let myprofile = document.getElementById('myprofile'); 
                    myprofile.classList.add('hide_info');
                    User_id="";
                    self.$router.push('/');
                 }
            })
            .catch(function (error) {
        });
    }
});
  
 
const Explore=Vue.component('explore',{
     template: `
    <div>
        <br><br>
        <h5 v-if="text=='You have been successfully logged in.'" class="alert alert-success">{{text}}</h5>
        <h5 v-if="text=='Successfully created a new post'" class="alert alert-success">{{text}}</h5>
        <div v-if="uc==''" class="alert alert-warning">
            <p>You need to sign in to use this feature.</p>
        </div>
        <div v-else @mouseover="Reset">
            <div>
                <ul class="explore-posts">
                    <li v-for="user in users" class="post_item" v-if="uc!=user.user_id">
                        <div>
                            <div class="user_explore">
                                <span @click="post(user.user_id)">
                                    <h6 class="user-profile-explore">
                                        <img v-bind:src="user.userpro" alt="User Profile picture" id="user-img-explore"/> 
                                        {{user.username}}
                                    </h6>
                                </span>
                                <img v-bind:src="user.postphoto" alt="User Posted Image" id="user-post"/>
                                <br><br>
                                <span class="user-caption-explore">
                                    {{user.caption}}
                                </span>
                            </div>
                            <div>
                                <span @click="Like(user.id)"> 
                                    <img src="/static/images/like.png" alt="Like icon" id="like-icon"/> 
                                    <span v-bind:id="user.id">{{user.likes}}</span>
                                    Likes 
                                </span>
                                <span class="creation_time">{{user.created_on}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="postBtn">
                <router-link class="btn btn-primary post" to="/post/new">New Post</router-link>
            </div>
          </div>
    </div>`,
     created: function(){
        let self =this;
        fetch('/api/posts',{
                method:'GET',
                'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
             .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  //display a success message
                  self.users = jsonResponse.response['0'].post; 

              })
              .catch(function(error){

              });
    },
    data: function(){
        return{
            users:[],
            uc: User_id,
            text:messge
        };   
        },
    methods:{
        post:function(userp){
                let self=this;
                other=""+userp;
                self.$router.push("/users/"+other);
        },
        Like:function(postid){
            let self=this;
            let post=""+postid;
            let form_data = new FormData();
            let se=self.uc;
            form_data.append("user_id",se);
            form_data.append("post_id",post);
           
            fetch('/api/posts/'+post+'/like',{
                    method:'POST',
                    body: form_data,
                     'headers': {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                            'X-CSRFToken': token
                        },
                    credentials: 'same-origin'
                })
                 .then(function(response){
                      return response.json();
                  })
                  .then(function(jsonResponse){
                      let loginForm= document.getElementById(postid).innerHTML=jsonResponse.response['0'].likes;
                  })
                  .catch(function(error){
                      
                  });
            },
        Reset: function(){
            this.text="";
        }
    }
});


const Users=Vue.component('users',{
     template:`
        <div>
            <div v-if="uc==''" class="alert alert-warning">
                <p>You need to sign in to use this feature.</p>
            </div>
            
            <div v-else class="userPage"> 
                <div class="top-container">
                    <div class="userPic">
                        <img v-bind:src="user.profile_photo" alt="user profile picture" id="userImg">
                    </div>
                  
                    <div class="userName">
                        <div class="fname-lname">
                            <h5>{{user.firstname}}&nbsp{{user.lastname}}</h5>
                        </div>
                        
                        <div>
                         {{user.location}}
                        </div>
                    
                        <div class="joined-date">
                            Member since {{user.joined_on}}
                        </div>
                        
                        <div>{{user.biography}}</div>
                    </div>
                    
                    <div class="userInfo">
                        <div>
                            <span class="postCount">
                                <h6>{{user.numpost}}</h6>
                                <br>
                                Posts
                            </span>
                            <span class="followerCount">
                                <h6 id="follow">{{user.numfollower}}</h6>
                                <br>
                                Followers
                            </span>
                        </div>
                        
                        <div class="userBtns">
                            <br> 
                            <span v-if="uc==user.id"><button class="btn btn-primary fol hide_info">Follow</button></span>
                            <span v-else-if=" uc in user.follower"><button class="btn btn-success foll>Following</button></span>
                            <span v-else><button class="btn btn-primary fol" @click="Follow" id="fo">Follow</button></span>
                        </div>
                    </div>
                </div>
                
                <div class="userPosts">
                    <ul class="userPost-List">
                        <li v-for="post in user.posts" class="post_item">
                            <div>
                                <img v-bind:src="post.photo" alt="Posted Image" id="userPost-Img"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
      return {
          user:[],
          uc: User_id,
          Other:other,
          post:[],
          follow:[]
      };
    },
    created: function(){
                if (other==''){
                        let self =this;
                        let userid = ""+self.uc;
                        fetch('/api/users/'+userid+'/posts',{
                                method:'GET',
                                'headers': {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                    'X-CSRFToken': token
                                },
                                credentials: 'same-origin'
                            })
                             .then(function(response){
                                  return response.json();
                              })
                              .then(function(jsonResponse){
                                  self.user= jsonResponse.response["0"]; 
                              })
                              .catch(function(error){
                              });
                        }
                else{
                     let self =this;
                     let userid = ""+self.other;
                        fetch('/api/users/'+userid+'/posts',{
                                method:'GET',
                                 'headers': {
                                           'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                           'X-CSRFToken': token
                                    },
                                credentials: 'same-origin'
                            })
                             .then(function(response){
                                  return response.json();
                              })
                              .then(function(jsonResponse){
                                  self.user= jsonResponse.response["0"]; 
                              })
                              .catch(function(error){

                              });
                    }
    },
    methods:{
        Follow:function(){
            let self = this;
            let userid = ""+self.other;
            let form_data = new FormData();
            let slc = self.uc;
            form_data.append("user_id",userid);
            form_data.append("follower_id", slc);
                    
            fetch("/api/users/"+userid+"/follow", { 
            method: 'POST',
            body: form_data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                let loginForm= document.getElementById('follow').innerHTML=jsonResponse.response['0'].follow;
                let log= document.getElementById('fo').innerText="Following";
            })
            .catch(function (error) {
                
            });
        }
    }
});


const Post=Vue.component('post',{
     template:`
     <div>
        <div v-if="uc==''" class="alert alert-warning">
           <p>You need to sign in to use this feature.</p>
        </div>
        
        <div v-else class="post_page">
        
            <h1 class="postWelcome">New Post</h1>
            
            <form class="postForm" id="post"  @submit.prevent="PostForm" method="POST" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-lg-11">
                        <div class="form-group">
                          <label class="label_bold">Photo</label>
                          <input type="file" name="photo"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                        <div class="form-group">
                            <label class="label_bold"> Caption </label>
                            <textarea name="caption" class="form-control" placeholder="Write a Caption..."/></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <button class="btn btn-success sub" type="submit">Submit</button>
                    </div>
                </div>
            </form>
         </div> 
     </div>`,
     data: function() {
       return {
           uc: User_id,
           error: []
       };
    },
      methods:{
        PostForm: function(){
            let self = this;
            let postForm= document.getElementById('post');
            let form_data = new FormData(postForm);
    
            let userid = ""+ self.uc;
            fetch('/api/users/'+userid+'/posts',{
                method:'POST',
                body: form_data,
                'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
                 },
                credentials: 'same-origin'
              })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  if(jsonResponse.response["0"].message=="Successfully created a new post")
                  {
                    messge="Successfully created a new post";
                    self.$router.push("/explore");
                  }
              })
              .catch(function(error){
              });
        }
    }
});


Vue.use(VueRouter);

const router = new VueRouter({
         routes: [
         { path: '/', component: Home },
         { path: '/register', component: Register},
         { path: '/explore', component: Explore},
         { path: '/login' , component: Login}, 
         { path: '/logout', component: Logout},
         { path: '/users/:user_id', component: Users},
         { path: '/post/new', component: Post}
         ]
    });


//Root Instance
let app = new Vue({
    el: '#app',
    router
});
