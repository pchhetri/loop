'use strict';

var _createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;
        desc = parent = getter = undefined;
        _again = false;
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);
            if (parent === null) {
                return undefined;
            } else {
                _x = parent;
                _x2 = property;
                _x3 = receiver;
                _again = true;
                continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;
            if (getter === undefined) {
                return undefined;
            }
            return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) subClass.__proto__ = superClass;
}

var ExpandableInput = (function(_React$Component) {
    function ExpandableInput(props) {
        _classCallCheck(this, ExpandableInput);

        _get(Object.getPrototypeOf(ExpandableInput.prototype), 'constructor', this).call(this, props);
        this.state = {
            expanded: false
        };
    }

    _inherits(ExpandableInput, _React$Component);

    _createClass(ExpandableInput, [{
        key: 'handleClick',
        value: function handleClick() {
            if (this.state.expanded) {
                return;
            }
            this.setState({
                expanded: true
            });
            TweenMax.to(React.findDOMNode(this.refs.label), 0.25, {
                y: 0,
                fontSize: 12
            });
            TweenMax.to(React.findDOMNode(this.refs.input), 0.25, {
                scaleY: 1
            });
            TweenMax.to(React.findDOMNode(this.refs.icon), 0.25, {
                opacity: 1,
                y: 0
            });
            setTimeout(this.focusInput.bind(this), 0.25);
        }
    }, {
        key: 'focusInput',
        value: function focusInput() {
            React.findDOMNode(this.refs.input).focus();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            TweenMax.set(React.findDOMNode(this.refs.label), {
                y: 30
            });
            TweenMax.set(React.findDOMNode(this.refs.icon), {
                opacity: 0,
                y: 20
            });
            TweenMax.set(React.findDOMNode(this.refs.input), {
                scaleY: 0.1
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div', {
                    className: 'expandable-input',
                    onClick: this.handleClick.bind(this),
                    onFocus: this.handleClick.bind(this)
                },
                React.createElement(
                    'div', {
                        ref: 'label',
                        className: 'expandable-input--label'
                    },
                    this.props.label
                ),
                React.createElement('i', {
                    className: this.props.icon,
                    ref: 'icon'
                }),
                React.createElement('input', {
                    type: this.props.inputType,
                    ref: 'input',
                    className: 'expandable-input--input'
                })
            );
        }
    }]);

    return ExpandableInput;
})(React.Component);

var Login = (function(_React$Component2) {
    function Login() {
        _classCallCheck(this, Login);

        _get(Object.getPrototypeOf(Login.prototype), 'constructor', this).call(this);
        this.state = {
            submitted: false
        };
    }

    _inherits(Login, _React$Component2);

    _createClass(Login, [{
        key: 'submit',
        value: function submit() {
            if (this.state.submitted) {
                return;
            }
            this.setState({
                submitted: true
            });
            var check = React.findDOMNode(this.refs.yolo);
            TweenMax.set(check, {
                display: 'block',
                y: 30
            });
            new TimelineMax().to(React.findDOMNode(this.refs.btnText), 0.5, {
                opacity: 0
            }).to(React.findDOMNode(this.refs.btn), 0.25, {
                scaleY: 6
            }).to(check, 0.25, {
                y: 0,
                opacity: 1,
                ease: 'Back.easeOut'
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div', {
                    className: 'login-container'
                },
                React.createElement(
                    'img', {
                        src:"public/img/nodafi-logo.png" 
                    }    
                ),
                React.createElement(
                    'div', {
                        className: 'yolo'
                    },
                    React.createElement('i', {
                        className: 'ion-checkmark',
                        ref: 'yolo'
                    })
                ),
                React.createElement(
                    'header',
                    null,
                    'Nodafi Sign in'
                    
                ),
                React.createElement(ExpandableInput, {
                    inputType: 'email',
                    label: 'Email/ID',
                    icon: 'ion-android-mail'
                }),
                React.createElement(ExpandableInput, {
                    inputType: 'password',
                    label: 'Password',
                    icon: 'ion-android-lock'
                }),

                React.createElement(
                    'a', {
                        href: '#',
                        className: 'forgot'
                    },
                    'Forgot password?'
                ),
                React.createElement(
                    'button', {
                        className: 'btn-block mt-1',
                        onClick: this.submit.bind(this),
                        ref: 'btn'
                    },
                    React.createElement(
                        'span', {
                            ref: 'btnText'
                        },
                        'Login'
                    )
                )
            );
        }
    }]);

    return Login;
})(React.Component);

React.render(React.createElement(Login, null), document.body);

