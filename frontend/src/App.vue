<template>
  <div>
    <Navbar v-if="$store.state.user != null" />
    <Notifications />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Notifications from './components/Notifications.vue';

export default {
  components: {
    Navbar,
    Notifications,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
html{
  scroll-behavior: smooth;
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body{
  font-family: 'Open Sans', sans-serif;
  background-color: #f7f7f7;
}

a{
  text-decoration: none;
}

img{
  max-width:100%;
  height:auto;
  object-fit: cover;
}

button{
  cursor:pointer;
}

.submit-btn{
  padding: 10px 20px;
  font-size: 20px;
  border:none;
  background-color:#1FBD70;
  color:white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover{
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  }
}

form{
  width:100%;
  .form-row{
    display: flex;
    .form-group{
      margin-right: 10px;
    }
  }
  .form-group{
    width:100%;
    display:flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    position:relative;
    h3{
      margin-bottom: 10px;
    }
    margin-bottom: 20px;
    input{
      width:100%;
      height: 30px;
      font-size: 16px;
      border:none;
      border-bottom: 1px solid #aaa;
      font-family: 'Open Sans', sans-serif;
    }
    textarea{
      width:100%;
      min-height: 200px;
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
    }

    select{
      border: 1px solid #ccc;
      width:100%;
      height: 30px;
      font-size: 16px;
    }
  }

  .form-checkbox{
    width:100%;
    h3{
      margin-bottom: 10px;
    }
    margin-bottom: 20px;
    grid-template-columns: 100px 1fr;
    input{
      height: 20px;
      width:20px;
    }

    label{
      font-size: 18px;
    }
  }

  .required{
    color:red;
  }

  button{
    padding: 10px 20px;
    font-size: 20px;
    border:none;
    display:block;
    margin: auto;
    background-color:#1FBD70;
    color:white;
    transition: all 0.1s ease;
    cursor: pointer;
    font-weight: 700;
    &:hover{
      transform: scale(1.1, 1.1);
      box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    }
  }

}

.page{
  padding: 8vh 20px;
}

.loading{
  width:100%;
  height:100%;
  position: absolute;
  z-index:4;
  top: 0;
  left: 0;
  background-color: rgba(200,200,200,0.5);
  display:flex;
  justify-content: center;
  align-items: center;
  .circle{
    width:50px;
    height:50px;
    border-radius:50%;
    animation: loading 0.5s ease-in-out infinite alternate;
    background-color:#1FBD70;
  }
}

@keyframes loading {
  0% {
    transform: scale(0.8, 0.8);
    background-color: #dfe62c;
  }

  100% {
    transform: scale(1.3,1.3);
    background-color:#1FBD70;
  }
}

.title{
  width:100%;
  margin-bottom: 20px;
  h2{
    font-weight: 700;
  }
  .line{
    margin-top: 5px;
    height: 4px;
    width: 50px;
    background-color:#1FBD70;
  }
}

@media(min-width:1024px){
  .page{
    padding-left: 370px;
  }
}

</style>
