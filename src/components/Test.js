import { h, Component } from 'preact';
import { inject, Observer } from 'mobx-react';

class Test extends Component {
    componentDidMount() {
        setTimeout(()=>{
            this.props.testStore.test = 'world'
        },3000)
    }
    render({}, {}) {
        return (
        <Observer>{()=>(
            <div>
                {this.props.testStore.test}
            </div>
        )}</Observer>
        );
    }
}

export default inject('testStore') (Test);