

import { h, Component } from 'preact';
//Wrap this component on all page level components handle common data from here
class BaseView extends Component {
    render({}, {}) {
        return (
            <div>
              {this.props.children}  
            </div>
        );
    }
}

export default BaseView;
