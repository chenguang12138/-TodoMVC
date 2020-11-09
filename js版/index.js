// 添加任务到ul中
var ul = document.querySelector('#todo ul')

// 添加任务的输入框
var newTodo = document.querySelector('#new-todo')

// 底部用来显示状态的元素
var card = document.querySelector('.card')

// 用来显示任务数的元素
var span = document.querySelector('.card span')

// 全部的任务
var all = document.querySelector('#all')

// 正在进行的任务
var active = document.querySelector('#active')

// 完成的任务
var completed = document.querySelector('#completed')

var app = {
  arrList: [], // 保存所有任务
  count: 0, // 任务数
  init: function () {
    // 监听输入框，添加要做的任务
    newTodo.onkeyup = function (e) {
      if (e.keyCode == 13) {
        if (newTodo.value !== '') {
          this.addList(newTodo.value)
          newTodo.value = ''
          card.classList.replace('hideCard', 'showCard')
          span.innerHTML = this.count + ' items left'
          if (all.checked) {
            this.showAll()
          }
          if (active.checked) {
            this.showActive()
          }
          if (completed.checked) {
            this.showCompleted()
          }
        }
      }
    }.bind(this)

    // 监听任务被删除、完成、未完成
    ul.onclick = function (e) {
      this.change(e)
      if (all.checked) {
        this.showAll()
      }
      if (active.checked) {
        this.showActive()
      }
      if (completed.checked) {
        this.showCompleted()
      }
    }.bind(this)

    all.onclick = function () {
      this.showAll()
    }.bind(this)

    active.onclick = function () {
      this.showActive()
    }.bind(this)

    completed.onclick = function () {
      this.showCompleted()
    }.bind(this)
  },
  change: function (e) {
    if (e.target.localName === 'button') {
      var i = this.arrList.indexOf(e.target.parentNode)
      // 若点击button要删除的任务是未完成的，则count数也要减一
      if (!e.target.parentNode.children[0].checked) {
        this.count--
        span.innerHTML = this.count + ' items left'
      }
      this.arrList.splice(i, 1)
      e.target.parentNode.parentNode.removeChild(e.target.parentNode)
      if (this.arrList.length === 0) {
        card.classList.replace('showCard', 'hideCard')
      }
    } else if (e.target.localName === 'input') {
      // 若点击的是input，则判断任务是否完成
      if (e.target.checked) {
        e.target.parentNode.classList.add('check')
        e.target.parentNode.classList.replace('a', 'b')
        this.count--
        span.innerHTML = this.count + ' items left'
      } else {
        e.target.parentNode.classList.remove('check')
        e.target.parentNode.classList.replace('b', 'a')
        this.count++
        span.innerHTML = this.count + ' items left'
      }
    }
  },
  addList: function (val) {
    var li = document.createElement('li')
    li.classList.add('box')
    li.classList.add('list')
    li.classList.add('a')
    var content = `
        <input type="checkbox"></input>
        ${val}
        <button>x</button>
      `
    li.innerHTML = content
    this.arrList.push(li)
    ul.appendChild(li)
    this.count++
  },
  /* 
    类a代表未完成的任务
    类b代表已完成的任务
    类d2代表隐藏未完成的任务
    类d1代表隐藏已完成的任务
    
    addList函数中，给新的任务添加了一个类a；change函数中，当被选中后把类a换成了类b
    
    showActive函数中，要显示未完成的任务，所以要把已完成的任务隐藏，把带有类b的任务，换成了类d1，该类为display: none
    该函数中除了要隐藏已完成任务，也要将被隐藏的未完成任务显示出来，把类d2换成类a

    showCompleted函数中，要显示已完成的任务，所以要把未完成的任务隐藏，把带有类a的任务，换成了类d2，该类为display: none
    该函数中除了要隐藏未完成任务，也要将被隐藏的未完成任务显示出来，把类d1换成类b

  */
  showAll: function () {
    for (let i = 0; i < this.arrList.length; i++) {
      this.arrList[i].classList.replace('d1', 'b')
      this.arrList[i].classList.replace('d2', 'a')
    }
  },
  showActive: function () {
    for (let i = 0; i < this.arrList.length; i++) {
      this.arrList[i].classList.replace('d2', 'a')
      this.arrList[i].classList.replace('b', 'd1')
    }
  },
  showCompleted: function () {
    for (let i = 0; i < this.arrList.length; i++) {
      this.arrList[i].classList.replace('d1', 'b')
      this.arrList[i].classList.replace('a', 'd2')
    }
  }
}

app.init()
