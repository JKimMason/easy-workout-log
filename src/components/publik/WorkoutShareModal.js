import React, {Component} from 'react';

import SimpleModal from '../generic/SimpleModal'; // TODO: use basic modal here instead
import SharePublicLink from './SharePublicLink';

class WorkoutShareModal extends Component {

  render() {
    const publicLink = {
      type: 'workout-details',
      workoutId: this.props.workoutId,
      workoutDate: this.props.workoutDate
    };

    return (
      <SimpleModal
        doModalActionClose={this.props.doModalActionClose}
        showModal={this.props.showModal}
        size="sm"
        title="Share workout">
        <SharePublicLink type='twitter' publicLink={publicLink}>Tweet workout details</SharePublicLink>
        <SharePublicLink type='link' publicLink={publicLink}>Get public link</SharePublicLink>
      </SimpleModal>
    );
  }

};

export default WorkoutShareModal;
