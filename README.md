[![Build Status](https://travis-ci.org/victorparmar/easy-workout-log.svg?branch=master)](https://travis-ci.org/victorparmar/easy-workout-log) [![Known Vulnerabilities](https://snyk.io/test/github/victorparmar/easy-workout-log/badge.svg)](https://snyk.io/test/github/victorparmar/easy-workout-log) [![license](https://img.shields.io/github/license/victorparmar/easy-workout-log.svg)](https://choosealicense.com/licenses/) [![GitHub release](https://img.shields.io/github/tag/victorparmar/easy-workout-log.svg)](https://ewolo.fitness) 

# Easy Workout Log

[https://ewolo.fitness](https://ewolo.fitness) frontend.

Created using React with Redux for state management.
    
## Development

- Start local server with live-reload: `npm start`
- Start tests and watch for changes: `npm test`
- Build and deployment: `cd scripts && ./deploy-frontend.sh`
- Count lines of js code: `find . -name '*.js' | xargs wc -l`

### API 

Note that this project does not include the API by default, a mock API implementation to enable standalone development is currently in progress.

## Misc

### Delete map files on production build

https://github.com/facebookincubator/create-react-app/issues/1341

## Releases

Dry run: `release-it -n -d`  
Release: `release-it`

## React

### React 16 upgrade

Note that there is a really weird error: `addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method,` which does not play well with redux. Currently, the analytics chart is broken because it uses refs. Fixes via:

```
this.chartist = new Chartist[type]('#chart', data, options, responsiveOptions);

...

return _react2.default.createElement(
        'div',
        { className: 'ct-chart ' + (className || ''), id: 'chart', style: style },
        childrenWithProps
      );
```

### Component lifecycle

- `constructor`
  - Set initial state via this.state = { ... }.
  - Bind callbacks.
  - Do not subscribe to events, dispatch redux actions, or otherwise cause side effects.

- `componentWillMount`
  - Similar to the constructor, but can cause side effects.
  - When possible, use constructor or componentDidMount instead.
  - Main use case is subscribing to events and dispatching actions in non-browser environments.

- update `this.state` (done by react)

- `render`
  - Do not call `this.setState()`.
  - Do not cause side effects.
  - Just create an element and return it.

- `componentDidMount`
  - Subscribe to events.
  - Dispatch actions.
  - Make any necessary calls to the DOM.
  - Not called in non-browser evironments, as there is no DOM to mount into.

Note that state doesn't change immediately: When you call `this.setState()`, React will not immediately update `this.state`. Instead, an update will be queued for some point in the future. Note that in the constructor, you can directly assign to `this.state`, and so any changes will happen immediately.

The `componentWillMount` method can accomplish many of the same tasks as constructor and `componentDidMount`. You can call `this.setState()` to change state, and can also cause side effects that change the input props. So why avoid `componentWillMount`?

If you cause a change in `props` in `componentDidMount`, it is obvious that the component will need to re-render. However, if you cause a change in props within `componentWillMount`, React’s behavior is far from obvious. When a component’s props change within `componentWillMount`, the following call to render will still use the old props.

The `componentWillMount` method can accomplish many of the same tasks as constructor and `componentDidMount`. However, unless you’re using server-side rendering, it cannot accomplish any more than other lifecycle methods. Avoiding it makes it easier to reason about your components.

### Performance

https://marmelab.com/blog/2017/02/06/react-is-slow-react-is-fast.html

# License

See [LICENSE](LICENSE)

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/victorparmar/easy-workout-log/badge.svg?style=beer-square)](https://beerpay.io/victorparmar/easy-workout-log)  [![Beerpay](https://beerpay.io/victorparmar/easy-workout-log/make-wish.svg?style=flat-square)](https://beerpay.io/victorparmar/easy-workout-log?focus=wish)
