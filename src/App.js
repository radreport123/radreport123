
import DropboxScreen from './components/DropboxScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import Home from './components/Home';
import Header from './components/Header';
import Navbar from './components/Dashboard';
import UploadStudies from './components/UploadStudies';
import AllAccounts from './components/AllAccounts';
import AllStudies from './components/AllStudies';
import { BrowserRouter, Route, Router, Switch, } from 'react-router-dom';
import IncompleteStudies from './components/IncompleteStudies';
import CompleteStudies from './components/CompleteStudies';
import Dashboard from './components/Dashboard';
import UserLogin from './components/UserLogin';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import CodeScreen from './components/CodeScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import ProfileEdit from './components/ProfileEdit';
import AdminLogin from './components/AdminLogin';
import AdminDasboard from './components/AdminDasboard';
function App() {
  //  document.title='rads';
  //  document.icon
  return (
    <BrowserRouter >


      <Switch>
        <Route path='/' component={Home} exact>
          <Header />
          <Home />
        </Route>
        <Route path='/DropboxScreen' component={DropboxScreen}>
          <Header />
          <DropboxScreen />
        </Route>
        <Route path='/CreateAccountScreen' component={CreateAccountScreen}>
          <Header />
          <CreateAccountScreen />
        </Route>

        <Route path='/UploadStudies' component={UploadStudies}>
          <Header />
          <UploadStudies />
        </Route>

        <Route path='/Dashboard' component={Dashboard}>
          {/* <Header />
          <Dashboard /> */}
        </Route>

        <Route path='/UserLogin' component={UserLogin}>
          <Header />
          <UserLogin />
        </Route>
        <Route path='/ForgotPasswordScreen' component={ForgotPasswordScreen}>
          <Header />
          <ForgotPasswordScreen />
        </Route>
        <Route path='/CodeScreen' component={CodeScreen}>
          <Header />
          <CodeScreen />
        </Route>
        <Route path='/ResetPasswordScreen' component={ResetPasswordScreen}>
          <Header />
          <ResetPasswordScreen />
        </Route>
        {/* <Route path='/ProfileEdit' component={ProfileEdit}></Route> */}
        <Route path='/AdminLogin' component={AdminLogin}></Route>
        <Route path='/AdminDashboard' component={AdminDasboard}></Route>

      </Switch>

    </BrowserRouter>

  );
}

export default App;
