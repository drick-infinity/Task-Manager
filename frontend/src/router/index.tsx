import {createBrowserRouter} from  'react-router-dom'
import App from '../App';
import Login from "../pages/Login";
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Createtask from '../pages/Createtask';
import Assignedtask from '../pages/Assignedtask';
import Overduetask from '../pages/Overduetask';

export const router = createBrowserRouter([
  {path :"/",element:<Login/>},
  {path :"/register",element:<Register/>},
{
  element:<App/>,
  children :[
    {path :"/dashboard",element:<Dashboard/>},
    {path :"/create-task",element:<Createtask/>},
    {path :"/assigned-task",element:<Assignedtask/>},
    {path :"/overdue-task",element:<Overduetask/>},
  ]
}
])