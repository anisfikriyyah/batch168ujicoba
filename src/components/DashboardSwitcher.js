import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Listcompany from './content/Buku/ListBuku';
// import Test from './content/Buku/Test';
import { Redirect } from 'react-router';
import apiconfig from '../configs/api.config.json'

const DashboardSwitcher = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <Switch>
            <PrivateRoute path="/dashboard" component={Listcompany} />
             {/* <PrivateRoute path="/test" component={Test} />  */}
            </Switch>
        </main>
    )
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(apiconfig.LS.TOKEN)!=null? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
export default DashboardSwitcher
