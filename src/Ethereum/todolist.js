import web3 from './web3';
import todolist from './build/todo_list.json';

const instance = new web3.eth.Contract(
    todolist.abi,
    '0xd2628E9a61b548DCa89fEcc4B49d7DF977550541'
);

export default instance;