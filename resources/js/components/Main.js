import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoadingBar from "react-top-loading-bar";

class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            loadingBarProgress: 0
        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmitButton = this.onSubmitButton.bind(this);
    }

    add(value) {
        this.setState({
            value: this.state.value,
            loadingBarProgress: this.state.loadingBarProgress + value
        });
    };

    complete() {
        this.setState({ value: this.state.value, loadingBarProgress: 100 });
    };

    onLoaderFinished() {
        this.setState({ value: this.state.value, loadingBarProgress: 0 });
    };

    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitButton() {

        axios.post('/translate', {
            text: this.state.value,
        }, {
            onUploadProgress: progressEvent => {
                this.add(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        })
            .then(response => {
                this.complete();
                console.log(response.data);
                this.setState({
                    value: response.data.translate,
                    description: 'ff'
                })
            })
            .catch(error => {
                this.onLoaderFinished();
                console.log(error);
            });

    }


    render() {
        return (
            <div className="App">
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={3}
                    color="red"
                    loaderSpeed={700}
                    transitionTime={10}
                    onLoaderFinished={() => this.onLoaderFinished()}
                />
                <header className="App-header">
                    <br />
                    <img src="logo.png" width="150px"></img>
                    <br />
                    <Button variant="contained" color="primary" onClick={this.onSubmitButton}>مرتب کردن و ترجمه و کپی</Button>
                    <br />

                    <TextField
                        name="value"
                        label="متن خود را وارد کنید"
                        multiline
                        variant="outlined"
                        value={this.state.value}
                        onChange={this.onChangeValue}
                    />
                    <br />
                    <Button variant="contained" color="primary">مرتب کردن</Button>


                    <br />
                    <TextField
                        id="outlined-textarea"
                        label="متن مرتب شده"
                        multiline
                        variant="outlined"
                    />

                    <br />
                    <Button variant="contained" color="primary" onClick>ترجمه</Button>

                    <br />
                    <TextField
                        id="outlined-textarea"
                        label="متن ترجمه شده"
                        multiline
                        variant="outlined"
                    />

                    <br />
                    <Button variant="contained" color="primary">کپی</Button>
                    <br />
                </header>
            </div>
        );

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                <form onSubmit={this.onSubmitButton}>
                                    <strong>Name:</strong>
                                    <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChangeValue} />
                                    <strong>Description:</strong>
                                    <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChangeValue}></textarea>
                                    <button className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Example;
if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}