/* Add your Application JavaScript */

let User_id='';
let other='';
let msg='';

Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#"><img src="/static/images/logo.png" alt="home page picture" style="width:20px;height:20px;"/> Photogram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <ul class="navbar-nav">
        
             <li class="nav-item active">
                     <router-link to="/" class="nav-link">Home</router-link>
            </li>
            
            <li class="nav-item active">
                     <router-link to="/explore" class="nav-link" >Explore</router-link>
             </li>
             <li class="nav-item active" @click="check">
                     <router-link to="/users/:user_id" class="nav-link">My Profile</router-link>
             </li>
             <li id="logout" class="nav-item active hid">
              <router-link class="nav-link" to="/logout">Logout</router-link>
             </li>
        </ul>
      </div>
    </nav>
    `,
    methods:{
        check:function(){
            self=this;
            if(other==''){
                self.$router.push("/users/"+User_id);
            }
            else{
                other='';
                self.$router.push("/explore");
                setTimeout(function(){ self.$router.push("/users/"+User_id)},500);
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
        <div @mouseover="Reset">
              <h6 v-if="text=='User successfully logged out'" class="success">{{text}}</h6>
              
              <div v-if="uc!=''" id="home">
               <h1> Welcome to Photogram </h1>
                <p> Where moments can be share instance.<br>So Please enjoy</p><br>
              </div>
                 
             <div v-else class="Frame">
              <div class="homePic">
              <img src="/static/images/home.jpg" alt="home page picture" style="width:400px;height:400px;"/>
              </div>
               <div class="Welcome">
               <div class="padtext">
                 <img src="/static/images/photogram.png" alt="home page picture" style="width:18vw;height:6vh;"/>
                </div>
                <div class="pad">
                 <p> Share photos of your favourite moments with friends, family and the world.</p> 
                </div>
                <div>
                 <router-link to="/register" class="btn btn-primary greenbut">Register</router-link>&nbsp
                 <router-link to="/login" class="btn btn-primary butsize">Login</router-link>
                </div>
               </div>
               </div>
        </div>
         `,
    data: function(){
        return{
            uc:User_id,
            text:msg
        };   
        },
     methods:{
          Reset:function ()
            {
                this.text="";
            }
       }
    });

const Register=Vue.component('register',{
     template:`
     <div>
     <div>
        <ul  v-for="(mgs,con, index) in msg">
                <div v-if="con === 'errors'" >
                    <li v-for="mgs in msg.errors" class="error">
                      {{mgs}}
                    </li>
                </div>
        </ul>
     </div>
     <h1 class="b">&nbsp Registration </h1>
        <form class="form" id="register" @submit.prevent="RegisterForm" method="POST" enctype="multipart/form-data" @click="Reset">
            <div class="form-space">
                <div class="row">
                      <div class="col-md-11">
                          <div class="form-group">
                              <label class="label_bold"> Username </label>
                              <input type="text" class="form-control" name="username"/>
                          </div>
                      </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Password </label>
                            <input type="password" class="form-control" name="password"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> ConfirmPassword </label>
                            <input type="password" class="form-control" name="confirmpassword"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Firstname </label>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="firstname"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Lastname </label>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="lastname"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Gender</label>
                        </div>
                        <div class="form-group">
                            <select name="gender">
                            <option value="">Select Gender Please</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Email </label>
                            <input type="text" class="form-control" placeholder="eg. exampl@example.com" name="email"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Location </label>
                            <input type="text" class="form-control" placeholder="eg. Kingston, Jamaica" name="location"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                        <div class="form-group">
                            <label class="label_bold"> Biography </label>
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
                        <button type="submit" class="btn btn-primary greenbut butsize1">Register</button>
                    </div>
                </div>
            </div>
            </form>
     </div> `,
     data: function(){
            return{
                msg:[]
            }
        },
     methods:{
        RegisterForm: function(){
            let self = this;
            let registerForm= document.getElementById('register');
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
                  //display a success message
                  if(jsonResponse.response!=null)
                      {
                        msg="User successfully registered. So login now and enjoy";
                        self.$router.push("/login");
                      }
                   else{
                       self.msg=jsonResponse.errors['0'];
                      }
                  //console.log(jsonResponse);
                  
              })
              .catch(function(errors){
              });
        },
    Reset:function ()
    {
        this.msg="";
    }
    }
    
});

const Login=Vue.component('login',{
     template:`
     <div class="Frame">
     <div>
        <ul  v-for="(mgs,con, index) in msg">
                <div v-if="con === 'errors'" >
                    <li v-for="mgs in msg.errors" class="error">
                      {{mgs}}
                    </li>
                </div>
        </ul>
     </div>
     
     <h6 id="msg" v-if="text=='User successfully registered. So login now and enjoy'" class ="success">{{text}}</h6>
     <h1 class="b">Login</h1>
     <form class="form" id="login" @submit.prevent="LoginForm" method="POST" @click="Reset">
         <div>
         <label for="username" name="username">Username</label><br>
         <input type='text' name='username'/>
         </div>
         <div>
         <label for="password" name="Password">Password</label><br>
         <input type='password' name='password'/>
         </div>
         <br>
         <input type="checkbox" name="remember_me" value="remember_me" class="c"/>Remember me <br>
         <button type="submit" class="btn btn-primary greenbut butsize1">Login</button>
     </form>
     </div>
     `,
     data: function(){
         return{
              msg:[],
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
                  //display a success message
                  //console.log(jsonResponse);
                  if(jsonResponse.response!=null)
                  {
                    User_id=jsonResponse.response["0"].user;
                    let jwt_token=jsonResponse.response["0"].token;
                    localStorage.setItem('token',jwt_token);
                    localStorage.setItem('userid',User_id);
                    self.$router.push("/explore");
                    msg="Login was successfully";
                    let logout= document.getElementById('logout'); 
                    logout.classList.remove('hid');
                  }
                  else{
                      self.msg=jsonResponse.errors['0'];
                  }
              })
              .catch(function(errors){
              });
        },
    Reset:function (){
         this.text="";
         this.msg="";
     }
    },
    created: function(){
         this.text=msg;
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
            // display a success message
            //console.log(jsonResponse);
                if(jsonResponse.response["0"].message=="User successfully logged out")
                 {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userid');
                    msg="User successfully logged out";
                    let logout= document.getElementById('logout'); 
                    logout.classList.add('hid');
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
        <h6 class ="success">{{text}}</h6>
        <div v-if="uc==''" class="error">
            <p>Please login or sign-up to benefit from this Feature </p>
        </div>
        <div v-else @mouseover="Reset">
            <div>
                    <h2 ></h2>
                     <ul class="posts__list">
                        <li v-for="user in users"class="post_item" v-if="uc!=user.user_id">
                            <div>
                             <div class="space3">
                             <span @click="post(user.user_id)"><h6 class="fixme" ><img v-bind:src="user.userpro" alt="User Profile picture" style="width:20px;height:20px;"/> {{user.username}}</h6></span>
                             <img v-bind:src="user.postphoto" alt="Post image" style="width:800px;height:400px;"/>
                             <br><br>
                               <span class="fixme"> {{user.caption}}</span>
                             </div>
                             <div>
                               <span @click="Like(user.id)"> <img src="/static/images/like.png" alt="like icon" style="width:20px;height:20px;"/> <span v-bind:id="user.id">{{user.likes}}</span> Likes </span><span class="space2"> {{user.created_on}}</span>
                            </div>
                            </div>
                        </li>
                </ul>
             </div>
            <div class="postbut ">
                <router-link class="btn btn-primary butsize1" to="/post/new">New Post</router-link>
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
            uc:User_id,
            text:msg
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
                      //display a success message
                      //console.log(jsonResponse);
                      let loginForm= document.getElementById(postid).innerHTML=jsonResponse.response['0'].likes;
                  })
                  .catch(function(error){
                      //console.log(error);
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
            <div v-if="uc==''" class="error">
                <p>Please login or sign-up to benefit from this Feature </p>
            </div>
            
            <div v-else class="Frame2"> 
              <div class="en1">
                  <div class="s">
                     <img v-bind:src="user.profile_photo" alt="profile picture" style="width:200px;height:200px;padding-bottom:10px;padding-right:20px;">
                   </div>
                  <div class="se">
                    <div class="space">
                       <h5>{{user.firstname}}&nbsp{{user.lastname}}</h5>
                    </div>
                    <div>
                     {{user.location}}
                    </div>
                    <div class="space">
                    Member since {{user.joined_on}}
                    </div>
                    <div>
                    {{user.biography}}
                    </div>
                   </div>
                  <div class="see">
                     <div class="">
                      <span class="postscount"><h6>{{user.numpost}}</h6><br>Posts</span>
                      <span class="followscount"><h6 id="follow">{{user.numfollower}}</h6><br>Followers</span>
                     </div>
                     <div class="space1">
                      <br> 
                      <span v-if="uc==user.id"><button class="btn btn-primary but butsize1 hid">Follow</button></span>
                      <span v-else-if=" uc in user.follower"><button class="btn btn-primary but butsize1" id="changeColor">Following</button></span>
                      <span v-else><button class="btn btn-primary but butsize1" @click="Follow" id="fo">Follow</button></span>
                     </div>
                    </div>
               </div>
               <div class="userpic">
                <ul class="profilepost__list">
                    <li v-for="post in user.posts"class="post_item2" >
                     <div class="post_imgs">
                     <img v-bind:src="post.photo" alt="Post image" style="width: 320px; height: 200px; padding-left: 2px; padding-right: 2px;"/>
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
          uc:User_id,
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
                                  //display a success message
                                  self.user= jsonResponse.response["0"]; 
                                  //console.log(jsonResponse);
                              })
                              .catch(function(error){
                                 // console.log(error);
                              });
                        }
                else{
                     let self =this;
                     let userid = ""+self.Other;
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
                                  //display a success message
                                  self.user= jsonResponse.response["0"]; 
                                  //console.log(jsonResponse);
                              })
                              .catch(function(error){
                                 //console.log(error);
                              });
                    }
    },
    methods:{
        Follow:function(){
            let self = this;
            let userid = ""+self.Other;
            let form_data = new FormData();
            let se=self.uc;
            form_data.append("user_id",userid);
            form_data.append("follower_id",se);
                    
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
            document.getElementById('changeColor').style.backgroundColor="limegreen";
            })
            .catch(function (error) {
            });
        }
    }
});

const Post=Vue.component('post',{
     template:`
     <div>
        <div v-if="uc==''" class="error">
           <p>Please login or sign-up to benefit from this Feature </p>
        </div>
       <div v-else class="Frame">
       <h1 class="b">New Post </h1>
        <form class="form" id="post"  @submit.prevent="PostForm" method="POST" enctype="multipart/form-data">
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
                        <button class="btn btn-primary greenbut butsize1" type="submit">Submit</button>
                    </div>
                </div>
            </form>
         </div> 
     </div>`,
     data: function() {
       return {
           uc:User_id,
           error: []
       };
    },
      methods:{
        PostForm: function(){
            let self = this;
            let postForm= document.getElementById('post');
            let form_data = new FormData(postForm);
    
            let userid = ""+self.uc;
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
                  //display a success message
                  //console.log(jsonResponse);
                  if(jsonResponse.response["0"].message=="Successfully created a new post")
                  {
                    msg="Successfully created a new post";
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
