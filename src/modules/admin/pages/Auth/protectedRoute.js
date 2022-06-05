import React, { useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as actions from '../../utils/store/actions';
import { Forbidden as DenyAccess } from '../Error';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const breadcrumbName = rest.breadcrumbName;
    const action = rest.action;
    const roles = rest.roles;

    const authState = useSelector((state) => state.auth);
    
    return (
        <Route { ...rest } render={(props) => {
            if(authState.isLoggedIn && authState.token !== null)
            {
                if(authState.user && authState.user.id)
                {
                    const permission = actions.authGrantPermission(roles, authState.user);
                    if(permission)
                    {
                        //return <Component { ...props } />
                        return <Component {...{...props, breadcrumbName, action, roles }} />
                    }
                    else
                    {
                        return <DenyAccess />
                    }
                }
            }
            else
            {
                //return <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
                return <Redirect to={ '/Login' } />
            }
        }} />
    );
}

export default ProtectedRoute;