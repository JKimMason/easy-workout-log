import React from 'react';
import {connect} from 'react-redux';

import UserNotification from './UserNotification';

import globalActions from '../../modules/global/globalActions';

const mapStateToProps = (state) => {
  return {userNotifications: state.global.userNotifications};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateUserNotification: (id, isRead) => {
      dispatch(globalActions.userNotificationUpdate(id, isRead));
    }
  };
};

const UserNotificationBar = (props) => {

  const renderUserNotifications = () => {
    return props
      .userNotifications
      .map((userNotification, index) => {
        return (<UserNotification
          key={userNotification.id}
          index={index}
          doUpdateUserNotification={props.doUpdateUserNotification}
          userNotification={userNotification}/>);
      });
  }

  console.log('wtf');

  return (
    <div>
      <div className="container grid-xs">
        {renderUserNotifications()}
      </div>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotificationBar);
