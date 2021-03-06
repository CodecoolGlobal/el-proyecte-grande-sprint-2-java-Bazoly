import {Route, Switch} from 'react-router';

import './App.css';

import EmployeeList from './components/Employee/EmployeeList';
import Javapeno from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Employee from "./components/Employee/Employee";
import Transactions from "./components/Transactions/Transactions";
import EmployeeForm from "./components/Employee/EmployeeForm";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/employee/:userId">
            <Employee/>
          </Route>
          <Route path="/create-employee" >
            <EmployeeForm isEdit={false}/>
          </Route>
          <Route path="/edit-employee" >
            <EmployeeForm isEdit={true} />
          </Route>
          <Route path="/employees">
            <EmployeeList isEdit={false}/>
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/home" >
            <Javapeno />
          </Route>
          <Route path="/" >
            <Javapeno />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
