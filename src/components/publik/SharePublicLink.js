import React, {Component} from 'react';
import {connect} from 'react-redux';

import './SharePublicLink.css';

// import ewoloUtil from '../../common/ewoloUtil';

import globalActions from '../../modules/global/globalActions';
import publikActions from '../../modules/publik/publikActions';

const mapStateToProps = (state) => {
  return {authToken: state.user.data.authToken};
};

const mapDispatchToProps = (dispatch) => {
  return {taskStart: globalActions.taskStart, taskEnd: globalActions.taskEnd, userNotificationAdd: globalActions.userNotificationAdd};
};

class SharePublicLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      linkUrl: ''
    };
  }

  handleShareLinkClick = (event) => {
    event.preventDefault();

    this
      .props
      .taskStart();

    publikActions
      .linkCreateAsync({linkType: this.props.publicLink.type, authToken: this.props.authToken, workoutId: this.props.publicLink.workoutId})
      .then(body => {
        const publicUrl = 'https://ewolo.fitness/public/' + body.id;

        if ('twitter' === this.props.type) {
          const text = this.props.publicLink.type === 'workout-details'
            ? `Just logged a workout for ${this.props.publicLink.workoutDate}: `
            : '';
          const twitterUrl = `https://twitter.com/intent/tweet?text=${window.encodeURIComponent(text)}&url=${window.encodeURIComponent(publicUrl)}&hashtags=TrackProgress&via=EwoloFitness`;
          window.location = twitterUrl;
        } else { // only need to set state and trigger re-render if not switching urls
          this.setState({linkUrl: publicUrl});
        }

      })
      .catch(err => {
        console.error(err);
        this
          .props
          .userNotificationAdd({type: 'ERROR', text: 'Error while creating public link'});
      })
      .then(() => {
        this
          .props
          .taskEnd();
      });
  }

  renderIcon = () => {
    if ('twitter' === this.props.type || 'link' === this.props.type) {
      return (
        <i className={"fa fa-" + this.props.type} aria-hidden="true"></i>
      );
    }

    return null;
  }

  renderContent = () => {
    if (this.state.linkUrl) {
      /*
      return (
        <span><input
          className="share-public-link-content"
          type="text"
          value={this.state.linkUrl}
          readOnly="true"/>
          <i className="share-public-link-content fa fa-copy" aria-hidden="true"></i>
        </span>
      );
      */
      return (<input
        className="share-public-link-content"
        type="text"
        value={this.state.linkUrl}
        readOnly="true"/>);
    }

    return (
      <a
        className="share-public-link-content"
        href=""
        onClick={this.handleShareLinkClick}>{this.props.children}</a>
    )
  }

  render() {
    return (
      <div className="share-public-link">
        {this.renderIcon()}{this.renderContent()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePublicLink);
