<template>
  <div>
    <i class="fas fa-bars" id="bar-menu" @click="toggleMenu"></i>
    <div class="nav" id="nav">
      <div class="nav-profile">
        <img src="https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png" alt="">
        <div class="text">
          <h3>{{$store.state.user.name}}</h3>
          <button id="logout-btn" @click="logout">Logout</button>
        </div>
      </div>

      <div class="nav-items">
        <router-link to='/dashboard' ><i class="fas fa-home"></i> Dashboard</router-link>
        <router-link to='/personal' ><i class="fas fa-user"></i> Personal</router-link>
        <router-link to='/hours' ><i class="fas fa-clock"></i> Hours</router-link>
        <router-link to='/events' ><i class="fas fa-calendar"></i> Events</router-link>
        <router-link to='/resources' ><i class="fas fa-book-open"></i> Resources</router-link>
        <router-link to='/Users' ><i class="fas fa-users"></i> Users</router-link>
        <router-link to='/Timesheets' ><i class="fas fa-user-clock"></i> Timesheets</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false,
    };
  },
  created() {
    window.addEventListener('resize', this.onWindowResize);
  },
  destroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    toggleMenu() {
      let nav = document.getElementById('nav');
      let bar = document.getElementById('bar-menu');

      if (this.showMenu) {
        nav.style.opacity = 0;
        nav.style.transform = 'translateX(-100%)';
        bar.style.color = '#333';
      } else {
        nav.style.opacity = 1;
        nav.style.transform = 'translateX(0)';
        bar.style.color = '#fff';
      }
      this.showMenu = !this.showMenu;
    },
    logout() {
      axios.post('/api/users/logout').then(() => {
        this.$store.dispatch('deleteUser');
        this.$router.push('/');
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    onWindowResize() {
      let nav = document.getElementById('nav');
      let bar = document.getElementById('bar-menu');

      if (window.innerWidth > 1024) {
        nav.style.opacity = 1;
        nav.style.transform = 'translateX(0)';
        bar.style.color = '#fff';
        this.showMenu = true;
      } else {
        nav.style.opacity = 0;
        nav.style.transform = 'translateX(-100%)';
        bar.style.color = '#333';
        this.showMenu = false;
      }
    },
  },
  watch: {
    $route() {
      let nav = document.getElementById('nav');
      let bar = document.getElementById('bar-menu');

      if (window.innerWidth < 1024 && this.showMenu) {
        nav.style.opacity = 0;
        nav.style.transform = 'translateX(-100%)';
        bar.style.color = '#333';
        this.showMenu = !this.showMenu;
      } else {
        nav.style.opacity = 1;
        nav.style.transform = 'translateX(0)';
        bar.style.color = '#fff';
        this.showMenu = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
#bar-menu{
  font-size: 1.5em;
  margin-left: 20px;
  position: fixed;
  top: 20px;
  z-index: 3;
  cursor: pointer;
}

#logout-btn{
  background-color: #1fbd70;
  border:none;
  font-size: 16px;
  color:white;
  &:hover{
    color:#ccc;
  }
}

.nav{
  width:100%;
  height:100vh;
  padding: 5vh 0;
  background-color: #1fbd70;
  color:white;
  display: grid;
  position: fixed;
  transition: all 0.3s ease;
  grid-template-rows: 130px 1fr;
  opacity:0;
  transform: translateX(-100%);
  z-index: 2;
  .nav-profile{
    width:100%;
    display:flex;
    padding-left: 20px;
    justify-content: flex-start;
    align-items: center;
    height:100%;
    img{
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }

    .text{
      h3{
        font-size: 1.5em;
        line-height:1;
      }
      p{
        margin-top: 10px;
      }
    }
  }

  .nav-items{
    width:100%;
    a{
      display:block;
      width:100%;
      height: 15%;
      color:white;
      padding-left:20px;
      font-size: 1.75em;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      transition: all 0.1s ease;
      &:hover{
        background-color:#fcfcfc;
        color: #1fbd70;
      }
      i{
        margin-right: 10px;
      }
    }
  }
}

@media(min-width: 1024px){
  .nav{
    opacity: 1;
    transform: translateX(0);
    max-width: 350px;
  }

  #bar-menu{
    display:none;
  }
}
</style>
