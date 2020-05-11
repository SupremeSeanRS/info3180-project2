/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/api/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

const Upload = Vue.component('upload-form', {
    template: `
    
    <div>
    <form id="uploadForm" action="/api/upload" method="post" @submit.prevent="uploadPhoto">
        <br>
        <label for="description">Description</label>
        <br>
        <textarea rows="4" cols="50" name="description" placeholder="Enter details here..."></textarea>
        
        <br>
        
        <label for="photo">Photo Upload</label>
        <br>
        <input type="file" id="myfile" name="photo"/>
        
        <br><br>
        
        <input type="submit" value="Submit">
    </form>
  </div>   
    `,
    methods: {
        uploadPhoto: function() {
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm); 

            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
               headers: {
                'X-CSRFToken': token
                },
                credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success/error message
                console.log(jsonResponse);
                })
                .catch(function (error) { 
                console.error(error);
                });
        }
    }
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        { path: '/api/upload', component: Upload },

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});