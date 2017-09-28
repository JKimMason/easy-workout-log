import React, {Component} from 'react';
import {connect} from 'react-redux';

import './LogWorkout.css';

import * as quotesService from '../../services/quotesService';

import UserNotificationBar from '../notification/UserNotificationBar';
import LogExercise from './LogExercise';
import Modal from '../generic/Modal';
import {EwoloFormHintSplit} from '../generic/EwoloFormHint';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';
import userDataActions from '../../modules/user-data/userDataActions';

// import ewoloUtil from '../../common/ewoloUtil';
import ewoloContent from '../../common/ewoloContent';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout, exerciseNames: state.user.data.exerciseNames, defaultUnits: state.user.data.units};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkoutExercise: ({
      name,
      reps,
      weight,
      sets,
      tempo,
      rest,
      showAdvanced,
      units
    }) => {
      dispatch(logWorkoutActions.logWorkoutExercise({
        name,
        reps,
        weight,
        sets,
        tempo,
        rest,
        showAdvanced,
        units
      }));
      dispatch(userDataActions.userDataExerciseNameAdd(name));
    },
    doLogWorkoutSetData: (date, notes) => {
      dispatch(logWorkoutActions.logWorkoutSetData(date, notes));
    },
    doLogWorkoutSetShowTempoHelp: (showTempoHelp) => {
      dispatch(logWorkoutActions.logWorkoutSetShowTempoHelp(showTempoHelp));
    },
    doLogWorkoutSetShowRestHelp: (showRestHelp) => {
      dispatch(logWorkoutActions.logWorkoutSetShowRestHelp(showRestHelp));
    },
    doLogWorkoutSetShowWeightHelp: (showWeightHelp) => {
      dispatch(logWorkoutActions.logWorkoutSetShowWeightHelp(showWeightHelp));
    },
    doLogWorkoutSaveThunk: () => {
      dispatch(logWorkoutActions.logWorkoutSaveThunk());
    },
    doLogWorkoutExerciseDelete: (index) => {
      dispatch(logWorkoutActions.logWorkoutExerciseDelete(index));
    },
    doLogWorkoutExerciseSetData: (index, exercise) => {
      dispatch(logWorkoutActions.logWorkoutExerciseSetData(index, exercise));
    },
    doLogWorkoutEditCancelThunk: () => {
      dispatch(logWorkoutActions.logWorkoutEditCancelThunk());
    }
  };
};

class LogWorkout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quote: ''
    };
  }

  componentDidMount() {
    this.setState({
      quote: quotesService
        .getRandomQuote()
        .quote
    });
  }

  renderExercises() {
    const lastExerciseIndex = this.props.logWorkout.exercises.length - 1;
    return this
      .props
      .logWorkout
      .exercises
      .map((exercise, index) => {
        // index is actually the right thing to do in this case!
        return (<LogExercise
          key={index}
          index={index}
          isLast={lastExerciseIndex === index ? true : false}
          exercise={exercise}
          exerciseNames={this.props.exerciseNames}
          doLogWorkoutExerciseDelete={this.props.doLogWorkoutExerciseDelete}
          doLogWorkoutExerciseSetData={this.props.doLogWorkoutExerciseSetData}
          doLogWorkoutSetShowTempoHelp={this.props.doLogWorkoutSetShowTempoHelp}
          doLogWorkoutSetShowRestHelp={this.props.doLogWorkoutSetShowRestHelp}
          doLogWorkoutSetShowWeightHelp={this.props.doLogWorkoutSetShowWeightHelp}/>);
      });
  }

  // Stage 1 fat arrow class methods auto scope this!
  handleBtnAddExerciseClick = (event) => {
    event
      .currentTarget
      .blur(); // hide the tooltip

    const numExercises = this.props.logWorkout.exercises.length;

    if (numExercises) {
      const {
        name,
        reps,
        weight,
        sets,
        tempo,
        rest,
        showAdvanced,
        units
      } = this.props.logWorkout.exercises[numExercises - 1];

      this
        .props
        .doLogWorkoutExercise({
          name,
          reps,
          weight,
          sets,
          tempo,
          rest,
          showAdvanced,
          units
        });

      window.scrollBy(0, 200); // scrolling to btnAddExercise on safari makes the button go all the way to the top :(

      return;
    }

    this
      .props
      .doLogWorkoutExercise({units: this.props.defaultUnits});
  };

  handleDateChange = (event) => {
    this
      .props
      .doLogWorkoutSetData(event.target.value, this.props.logWorkout.notes);
  }

  handleNotesChange = (event) => {
    this
      .props
      .doLogWorkoutSetData(this.props.logWorkout.date, event.target.value);
  }

  handleSave = (event) => {
    event.preventDefault();
    this
      .props
      .doLogWorkoutSaveThunk();
  }

  handleCancelEdit = (event) => {
    event.preventDefault();
    this
      .props
      .doLogWorkoutEditCancelThunk();
  }

  doCloseTempoHelp = () => {
    this
      .props
      .doLogWorkoutSetShowTempoHelp(false);
  }

  doCloseRestHelp = () => {
    this
      .props
      .doLogWorkoutSetShowRestHelp(false);
  }

  doCloseWeightHelp = () => {
    this
      .props
      .doLogWorkoutSetShowWeightHelp(false);
  }

  render() {

    const pageTitle = (
      <h3>{this.props.logWorkout.id
          ? `Edit workout for ${this.props.logWorkout.date}`
          : 'Log a new workout'}</h3>
    );

    const secondaryOperation = this.props.logWorkout.id
      ? (
        <button
          id="btn-cancel-edit-workout"
          className="btn btn-link btn-lg"
          onClick={this.handleCancelEdit}>
          Cancel edit workout
        </button>
      )
      : (
        <div className="quote">{this.state.quote}</div>
      );

    return (
      <div>
        <UserNotificationBar/>

        <Modal
          doModalActionCancel={this.doCloseTempoHelp}
          showModal={this.props.logWorkout.showTempoHelp}
          size="sm"
          title="Tempo"
          content={ewoloContent.tempoHelpModalContent}/>

        <Modal
          doModalActionCancel={this.doCloseRestHelp}
          showModal={this.props.logWorkout.showRestHelp}
          size="sm"
          title="Rest"
          content={ewoloContent.restHelpModalContent}/>

        <Modal
          doModalActionCancel={this.doCloseWeightHelp}
          showModal={this.props.logWorkout.showWeightHelp}
          size="sm"
          title="Weight"
          content={ewoloContent.weightHelpModalContent}/>

        <div className="container grid-xs section-content">
          <div className="columns">
            <div className="column col-12">
              {pageTitle}
              <p className="no-text">
                Click + to add a new exercise. Use the same exercise name for multiple sets.
              </p>
              <p className="no-text">
                Clickable labels provide hints.
              </p>
              <p className="no-text">
                Hit the save button once finished.
              </p>
            </div>
          </div>

          <div className="columns">
            <div className="column col-12">

              <form className="form-horizontal">

                <div className="form-group">
                  <div className="col-3">
                    <label className="form-label">Date</label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-input"
                      type="date"
                      value={this.props.logWorkout.date}
                      onChange={this.handleDateChange}/>
                  </div>
                </div>

                <EwoloFormHintSplit formHint={this.props.logWorkout.dateFormHint}/>

                <div className="form-group">
                  <div className="col-3">
                    <label className="form-label">Notes</label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. chest and legs"
                      value={this.props.logWorkout.notes}
                      onChange={this.handleNotesChange}/>
                  </div>

                </div>

                {this.renderExercises()}

                <div className="form-group">
                  <div className="col-10"></div>
                  <div className="col-2 text-center">
                    <button
                      id="btn-add-exercise"
                      className="btn btn-action circle btn-exercise-action tooltip"
                      data-tooltip="Add exercise"
                      type="button"
                      onClick={this.handleBtnAddExerciseClick}>
                      <i className="icon icon-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-12 text-center">
                    <button
                      id="btn-save-workout"
                      className="btn btn-primary btn-lg"
                      onClick={this.handleSave}>
                      Save Workout
                    </button>
                  </div>
                </div>

                <div className="form-group secondary-operation">
                  <div className="col-12 text-center">
                    {secondaryOperation}
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkout);
