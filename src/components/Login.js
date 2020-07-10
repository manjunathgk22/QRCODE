import { h, Component } from 'preact';




class Login extends Component {
    state = { value: '' };
    onSubmit = e => {
        e.preventDefault();
        console.log("onsubmit",e)
    }

    onInput = e => {
        const { value } = e.target;
        this.setState({ value })
        console.log("oninput value",this.state.value)
    }
    render({ }, { value }) {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                    <label>Username: </label>
                    <input type="text" value={value} onInput={this.onInput} />
                    </div>
                    <div className="row">
                    <label>Password: </label>
                    <input type="password" value={value} onInput={this.onInput} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;