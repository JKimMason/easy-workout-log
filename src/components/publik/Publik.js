import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Chartist from 'chartist'; import ewoloUtil from
// '../../common/ewoloUtil';

import './Publik.css';

import UserNotificationBar from '../notification/UserNotificationBar';
import WorkoutPieChart from '../charts/WorkoutPieChart';

import publikActions from '../../modules/publik/publikActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {links: state.publik.links, authToken: state.user.data.authToken};
};

const mapDispatchToProps = {
  doPublikLinkFetchDataThunk: publikActions.linkFetchDataThunk
};

class Publik extends Component {

  getLinkId() {
    return this.props.match.params.linkId;
  }

  componentDidMount() {
    const linkId = this.getLinkId();
    this
      .props
      .doPublikLinkFetchDataThunk(linkId);
  }

  render() {
    // console.log('rendering Publik');

    const renderedChart = this.renderChart();
    const renderedCallToAction = this.renderCallToAction();

    return (
      <div>
        <UserNotificationBar/> {renderedChart}
        <div className="container grid-md section-content">
          <div className="columns margin-top-2rem">
            <div className="column col-12 text-center">
              {renderedCallToAction}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderChart() {
    const linkId = this.getLinkId();
    const data = this.props.links[linkId];

    if (!data) {
      return null;
    }

    // console.log(Chartist.getDataArray(data.workoutBreakdown, false));
    const renderedTable = renderTable(data.workoutBreakdown);

    return (
      <div>
        <div className="container grid-md section-content">
          <div className="columns">
            <div className="column col-12">
              Workout data for {data.date}
            </div>
          </div>
        </div>
        <div className="container grid-xl">
          <div className="columns">
            <div className="column col-12">
              <WorkoutPieChart data={data.workoutBreakdown}/>
            </div>
          </div>
        </div>
        <div className="container grid-sm centered workout-breakdown">
          <div className="columns">
            <div className="column col-12">
              {renderedTable}
            </div>
          </div>
        </div>
      </div>
    );

  }

  renderCallToAction() {
    if (this.props.authToken) {
      return (
        <button
          className="btn btn-primary btn-lg"
          onClick={this.handleBtnLogWorkoutClick}>Log a workout now!</button>
      );
    }

    return (
      <div>
        <p className="no-text">
          Want your own progress chart?
        </p>
        <div>
          <button className="btn btn-primary btn-lg" onClick={this.handleBtnSignupClick}>Create a free account</button>
        </div>
        <div className="margin-top-1rem">
          <p className="no-text">
            and start logging your workouts now!
          </p>
        </div>
      </div>
    );
  }

  handleBtnLogWorkoutClick = (event) => {
    event.preventDefault();
    this
      .props
      .history
      .push('/log-workout');
  }

  handleBtnSignupClick = (event) => {
    event.preventDefault();
    this
      .props
      .history
      .push('/signup');
  }
};

const renderTable = (workoutBreakdown) => {
  // const styleName = {width: '50%'};
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Exercise</th>
          <th className="text-center">Volume (lbs)</th>
        </tr>
      </thead>
      <tbody>
        {workoutBreakdown
          .labels
          .map((exerciseName, index) => {
            let value = workoutBreakdown.series[index];
            if (!Number.isInteger(value)) {
              value = value.toFixed(2);
            }
            return (
              <tr>
                <td>{exerciseName}</td>
                <td className="text-center">{value}</td>
              </tr>
            );
          })
}
      </tbody>
    </table>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Publik);
