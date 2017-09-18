import React from 'react';
import Chartist from 'chartist';
import moment from 'moment';

import ChartistGraph from 'react-chartist';

import ewoloUtil from '../../common/ewoloUtil';

import {ctAxisTitle, ctPointLabels, ChartistLegend} from './ChartistPlugins';
import * as workoutAnalyticsService from '../../services/workoutAnalyticsService';

class AnalyticsExerciseChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: ewoloUtil.getWindowWidth()
    };
  }

  getCtClassName() {
    if (this.state.width < 400) {
      return 'ct-square';
    }

    if (this.state.width < 600) {
      return 'ct-perfect-fourth';
    }

    return 'ct-major-tenth';
  }

  updateDimensions = () => {
    const newState = this.state;
    newState.width = ewoloUtil.getWindowWidth();
    this.setState(newState);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {

    /*
    const chartData = {
      series: [
        {
          name: 'series-1',
          data: [
            {
              x: new Date(143134652600),
              y: 53
            }, {
              x: new Date(143234652600),
              y: 40
            }, {
              x: new Date(143340052600),
              y: 45
            }, {
              x: new Date(143366652600),
              y: 40
            }, {
              x: new Date(143410652600),
              y: 20
            }, {
              x: new Date(143508652600),
              y: 32
            }, {
              x: new Date(143569652600),
              y: 18
            }, {
              x: new Date(143579652600),
              y: 11
            }
          ]
        }, {
          name: 'series-2',
          data: [
            {
              x: new Date(143134652600),
              y: 53
            }, {
              x: new Date(143234652600),
              y: 35
            }, {
              x: new Date(143334652600),
              y: 30
            }, {
              x: new Date(143384652600),
              y: 30
            }, {
              x: new Date(143568652600),
              y: 10
            }
          ]
        }
      ]
    };
    */

    const analyticsExerciseChartData = {
      series: workoutAnalyticsService.getAnalyticsExerciseChartistSeriesData(this.props.analyticsExerciseData)
    };

    // console.log(chartData); console.log(analyticsExerciseChartData);

    // TODO: consider adding a tooltip
    // https://github.com/gsklee/react-chartist-tooltip/blob/master/react-chartist-t
    // o oltip.babel.js

    // TODO: enable legend click functionality
    const chartOptions = {
      chartPadding: {
        top: 20, // padding for top label
        right: 0,
        bottom: 30,
        left: 20
      },
      lineSmooth: Chartist
        .Interpolation
        .simple({fillHoles: true}),
      // low: 0,
      axisX: {
        // type: Chartist.Chartist, divisor: 5,
        type: Chartist.AutoScaleAxis,
        scaleMinSpace: 50,
        labelInterpolationFnc: function (value) {
          return moment(value).format('D MMM YY');
        }
      },
      plugins: [
        ctAxisTitle({
          axisX: {
            axisTitle: 'Days',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 50
            },
            textAnchor: 'middle'
          },
          axisY: {
            axisTitle: 'Weight (' + ewoloUtil.unitsToText(this.props.defaultUnits) + ')',
            axisClass: 'ct-axis-title',
            offset: {
              x: -50,
              y: 20
            },
            flipTitle: true
          }
        }),
        ctPointLabels({textAnchor: 'middle'})
      ]
    };

    return (
      <div>
        <div>
          Showing progress data for&nbsp;
          <strong>{this.props.exerciseName}</strong>
        </div>
        <ChartistLegend series={analyticsExerciseChartData.series}></ChartistLegend>
        <ChartistGraph
          data={analyticsExerciseChartData}
          options={chartOptions}
          type={'Line'}
          className={this.getCtClassName()}/>
      </div>
    );
  }

};

export default AnalyticsExerciseChart;
