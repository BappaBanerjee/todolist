import './App.css';
import { Component } from 'react';
import web3 from './Ethereum/web3';
import todolist from './Ethereum/todolist';

class App extends Component{

  state = {
    accounts : " ",
    tasks : [],
    manager : '',
    text : '',
    taskCount : '',
    message : ''
  }

  async componentDidMount(){
    this.getBlockchainData();
  }
  

  async getBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    this.setState({accounts : accounts[0]});
    const manager = await todolist.methods.manager().call();
    this.setState({manager : manager});
    const taskCount = await todolist.methods.numberOfTask().call();
    this.setState({taskCount : taskCount});
    for (var i = 0; i < taskCount; i++) {
      const task = await todolist.methods.taskToDo(i).call();
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
  }

  onSubmit = async(event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message : 'Please Wait....'});

    await todolist.methods.create(this.state.text).send({
      from : accounts[0]
    })

    await this.refreshPage();

    this.setState({message : 'successFully created!'});
  }

  handleChange = async(key, event) => {
    event.preventDefault();
    this.setState({message : 'Please wait'});
    await todolist.methods.markComplete(key).send({
      from : this.state.accounts
    });
    await this.refreshPage();
    this.setState({message : 'event Completed!!'});
  }

  deleteTask = async(event, key) => {
    event.preventDefault();
    this.setState({message : 'Please wait...'});
    await todolist.methods.deleteTask(key).send({
      from : this.state.accounts
    });
    await this.refreshPage();
    this.setState({message : 'complete'});
  }

  refreshPage = async(event) => {
    window.location.reload(false);
  }

    render(){
      return(
        <div>
          <h1>Hello World</h1>
          <p>accounts are {this.state.accounts} </p>
          <p>Address of the manager {this.state.manager} </p>
          <h3>Todo</h3>
             <form onSubmit={this.onSubmit}>
            <label htmlFor='new_task'>
              Enter the task?
            </label>
            <input 
              id='new_task'
              type='text'
              value={this.state.text}
              onChange={event => this.setState({text : event.target.value})}
            />
            <button>
              Add #{this.state.tasks.length + 1}
            </button>
          </form>
          <ul id="taskList" className="list-unstyled">
              { this.state.tasks.map((task, key) => {
                return(
                  <div className="taskTemplate" key={key}>
                    <label>
                      <input 
                        type="checkbox" 
                        id = {key} 
                        onChange={(e) => this.handleChange(key, e)}
                        {... task.isDone ? {checked : true, disabled : true} : {checked : false}}
                      />
                      <span className="content">{task.task}</span>
                      <button onClick={(e) => this.deleteTask(e, key)}>Delete</button>
                    </label>
                  </div>
                )
              })}
            </ul>
            <hr />
        <h2>Status</h2>
        <h2>{this.state.message}</h2>
        </div>
        
      );
    }
}

export default App;