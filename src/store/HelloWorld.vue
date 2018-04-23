<template>
  <div class="hello">
    <h1  v-if="seen">{{ msg }}</h1>
    <input type="text" v-model="msg">
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
    <p>current time: "{{ now }}"</p>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
    </ul>
      <ol>
       <!-- <li v-for="todo in todos">
          {{ todo.text }}
        </li>-->
        <todo-item v-for="todo in todos" v-bind:todo="todo" v-bind:key="todo.id">
        </todo-item>
      </ol>
    <el-button type="primary"  v-on:click="reverseMessage">逆转消息</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>欢迎使用 Element</p>
    </el-dialog>
   <!-- <button v-on:click="reverseMessage">逆转消息</button>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome!',
      seen: true,
      visible: false,
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ]
    }
  },
  methods: {
    reverseMessage: function () {
      /* this指向vm实例 */
      this.visible = true
      this.msg = this.msg.split('').reverse().join('') /* 变成用箭头函数 */
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.msg.split('').reverse().join('')
    },
    /* 下面的now计算属性将不再更新，因为 Date.now() 不是响应式依赖 */
    now: function () {
      return Date.now()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
