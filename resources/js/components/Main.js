import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoadingBar from "react-top-loading-bar";

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raw_text: '',
            organize_text: '',
            translate_text: '',
            loadingBarProgress: 0
        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.translate = this.translate.bind(this);
        this.organize = this.organize.bind(this);
        this.copyTranslateText = this.copyTranslateText.bind(this);
        this.organizeTranslate = this.organizeTranslate.bind(this);
    }

    add(value) {
        this.setState({
            loadingBarProgress: this.state.loadingBarProgress + value
        });
    };

    complete() {
        this.setState({loadingBarProgress: 100});
    };

    onLoaderFinished() {
        this.setState({loadingBarProgress: 0});
    };

    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    translate() {
        axios.post('/translate', {
            text: this.state.organize_text,
        }, {
            onUploadProgress: progressEvent => {
                this.add(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        })
            .then(response => {
                this.complete();
                this.setState({
                    translate_text: response.data.translate,
                })
            })
            .catch(error => {
                this.onLoaderFinished();
                console.log(error);
            });
    }


    organizeTranslate() {
        axios.post('/organizeTranslate', {
            text: this.state.raw_text,
        }, {
            onUploadProgress: progressEvent => {
                this.add(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        })
            .then(response => {
                this.complete();
                this.setState({
                    organize_text: response.data.organize,
                    translate_text: response.data.translate,
                });
                this.copyTranslateText();
            })
            .catch(error => {
                this.onLoaderFinished();
                console.log(error);
            });
    }

    organize() {
        axios.post('/organize', {
            text: this.state.raw_text,
        }, {
            onUploadProgress: progressEvent => {
                this.add(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        })
            .then(response => {
                this.complete();
                this.setState({
                    organize_text: response.data.organize,
                })
            })
            .catch(error => {
                this.onLoaderFinished();
                console.log(error);
            });
    }

    copyTranslateText() {
        navigator.clipboard.writeText(this.state.translate_text);
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
                    <img src="logo.png" width="20%"/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.organizeTranslate}>مرتب کردن و ترجمه و
                        کپی</Button>
                    <br/>
                    <br/>

                    <TextField
                        name="raw_text"
                        label="متن اصلی"
                        multiline
                        className="text-file-size"
                        variant="outlined"
                        value={this.state.raw_text}
                        onChange={this.onChangeValue}
                    />
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.organize}>مرتب کردن</Button>


                    <br/>
                    <br/>
                    <TextField
                        name="organize_text"
                        label="متن مرتب شده"
                        multiline
                        variant="outlined"
                        className="text-file-size"
                        value={this.state.organize_text}
                        onChange={this.onChangeValue}
                    />

                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.translate}>ترجمه</Button>

                    <br/>
                    <br/>
                    <TextField
                        name="translate_text"
                        label="متن ترجمه شده"
                        multiline
                        className="text-file-size , text-file-size-rtl"
                        variant="outlined"
                        value={this.state.translate_text}
                        onChange={this.onChangeValue}
                    />

                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.copyTranslateText}>کپی</Button>
                    <br/>
                    <br/>
                </header>
            </div>
        );
    }
}

export default Main;
if (document.getElementById('content')) {
    ReactDOM.render(<Main/>, document.getElementById('content'));
}
