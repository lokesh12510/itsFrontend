import React from "react";
import { useSelector } from 'react-redux';

import * as actions from '../../utils/store/actions';

const CheckAccess = ({ children, request }) => {
  const authState = useSelector((state) => state.auth);
  const permission = actions.authGrantPermission(request, authState.user);
  
  return (
    <>
      {permission && children}
    </>
  );
};

export default CheckAccess;