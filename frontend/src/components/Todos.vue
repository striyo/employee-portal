<template>
  <div class="Todos">
    <div class="title">
      <h2>Todos</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group">
          <div class="selection" v-if="peopleArr.length != 0">
            <p style="margin-bottom: 5px; color:darkgreen;">Click to remove a selection</p>
            <label v-for="person in peopleArr" :key="`person_${person.user_id}`" @click="removeSelection(person)">{{person.name}}</label>
          </div>
          <div class="no-selection" v-else>
            <label>No employees selected</label>
          </div>
          <div style="position:relative; width:100%">
            <input
              type="text"
              v-model="people"
              placeholder="Person A, Person B, ..."
            />
            <div class="auto-complete">
              <p v-for="user in users " :key="`auto_${user.user_id}`" @click="selectUser(user)">{{user.name}} -- {{user.email}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <input type="text" v-model="description" placeholder="Description" />
        </div>
      </div>
      <button>Create</button>
    </form>
    <div class="todo-switch" style="display:flex; justify-content:center;
    align-items:center; margin-top: 20px; margin-bottom: 20px;">
      <label style="cursor: pointer" :class="{'greyed': type == 1}" @click="type=0">Incomplete</label> | <label
     style="cursor:pointer" :class="{'greyed': type == 0}" @click="type=1">Complete</label>
    </div>
    <button v-if="type == 1" class="delete-btn"  style="display: block; margin: auto;margin-top: 20px; margin-bottom: 20px;" @click="deleteTodos()">Delete All</button>
    <form>
      <div class="form-checkbox" v-for="todo in todos"
      :key="`todo_${todo.todos_receiver_id}`">
        <template> {{todo.complete = Boolean(todo.complete)}} </template>
        <input type="checkbox" @change="updateTodo(todo)"
        v-model="todo.complete"> <label>{{todo.item}}</label>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Todos',
  data() {
    return {
      people: null,
      description: null,
      users: [],
      peopleArr: [],
      todos: [],
      click: false,
      type: 0,
    };
  },
  created() {
    this.getTodos(0);
  },
  watch: {
    people(val) {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }

      if (this.click) {
        this.click = false;
        return;
      }

      let self = this;
      if (val.length !== 0) {
        this.timeout = setTimeout(() => {
          let body = {
            search: self.people,
          };

          axios.post('/api/users/search', body).then((res) => {
            self.users = res.data.users;
          }).catch((err) => {
            console.log(err.response.data);
          });
        }, 500);
      } else {
        this.users = [];
      }
    },
    type(val) {
      this.getTodos(val);
    },
  },
  methods: {
    selectUser(user) {
      this.peopleArr.push(user);
      this.people = '';
      this.users = [];
      this.click = true;
      this.type = 0;
    },
    removeSelection(user) {
      this.peopleArr = this.peopleArr.filter((person) => person.user_id !== user.user_id);
    },
    submit() {
      let body = {
        peopleArr: this.peopleArr,
        description: this.description,
      };
      axios.post('/api/todos/', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.getTodos(this.type);
        this.description = '';
        this.peopleArr = [];
        console.log(res.data.message);
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data.message);
      });
    },
    getTodos(type) {
      axios.get(`/api/todos/${type}`).then((res) => {
        this.todos = res.data.todos;
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
    updateTodo(todo) {
      let body = {
        todos_receiver_id: todo.todos_receiver_id,
        completed: todo.complete,
      };

      axios.put('/api/todos/', body).then((res) => {
        this.getTodos(this.type);
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data);
      });
    },
    deleteTodos() {
      axios.delete('/api/todos/').then((res) => {
        this.getTodos(this.type);
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Todos {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
}
.selection{
  margin-bottom: 10px;
  label{
    background-color:#f7f7f7;
    padding: 5px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    margin-right: 5px;
    display:inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
.no-selection{
  margin-bottom: 10px;
  label{
    background-color:#f7f7f7;
    padding: 5px;
  }

}

.greyed{
  color: #ccc;
  &:hover{
    color:#999;
  }
}

.auto-complete {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: absolute;
  top: 30px;
  z-index: 2;
  background-color: white;
  p {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
  }
}

.delete-btn {
  padding: 10px 10px;
  font-size: 15px;
  border: none;
  background-color: #bd241f;
  color: white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }
  margin-right: 20px;
}
</style>
