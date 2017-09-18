import React from 'react';
// import Chartist from 'chartist';
// import moment from 'moment';

import ChartistGraph from 'react-chartist';

import ewoloUtil from '../../common/ewoloUtil';

import {getCtClassName} from './ChartistPlugins';

class WorkoutPieChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: ewoloUtil.getWindowWidth()
    };
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
      labels: [
        'Bananas', 'Apples', 'Grapes'
      ],
      series: [20, 15, 40]
    };
    */

    const chartOptions = {
      /*
      labelInterpolationFnc: function (value) {
        return value;
      },
      */
      chartPadding: 20,
      labelOffset: 0,
      labelDirection: 'neutral'
    };

    const responsiveOptions = [
      [
        'screen and (min-width: 640px)', {
          chartPadding: 30,
          labelOffset: 75,
          labelDirection: 'explode'
        }
      ],
      [
        'screen and (min-width: 1024px)', {
          chartPadding: 60,
          labelOffset: 100,
          labelDirection: 'explode'
        }
      ],
      [
        'screen and (min-width: 1280px)', {
          chartPadding: 60,
          labelOffset: 120,
          labelDirection: 'explode'
        }
      ]
    ];

    return (<ChartistGraph
      data={this.props.data}
      options={chartOptions}
      responsiveOptions={responsiveOptions}
      type={'Pie'}
      className={getCtClassName(this.state.width)}/>);
  }

};

export default WorkoutPieChart;
