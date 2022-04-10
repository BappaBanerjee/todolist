const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const todolist = require('./build/todo_list.json');

const provider = new HDWalletProvider(
  'stadium have multiply circle roof visa palace film connect token december cotton',
  'https://rinkeby.infura.io/v3/40940b19c5c64d48979c0df853f7453a'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(todolist.abi)
    .deploy({ data: todolist.evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
