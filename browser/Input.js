import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchText, buttonClick, buttonUnClick } from './reducers'
import Output from './Output'
import SpeechRecognition from 'react-speech-recognition'
import store from './store'

import Dict from './Dict'





console.log(fetchText)
class Input extends React.Component {
    constructor(props) {
        super(props)
        this.submitHandler = this.submitHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)

    }
    submitHandler(event) {
        event.preventDefault()
        console.log("event", event.target.text.value, this.props.fetchText)
        const text = {
            content: event.target.text.value
        }
        this.props.fetchText(text)
    }
    clickHandler() {

        console.log("TSTS")
        store.dispatch(this.props.buttonClick())
        console.log("!")
    }

    render() {{
        console.log(this.props, "props")
    }
        return (
            <div className="container">
                <h1 size = "200"> SAY WHAT? </h1>
                <style>

                </style>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <textarea name="text" rows="10" className="form-control" placeholder="Say This" />
                        <br/>
                        <button className="btn" type="submit">SAY THIS</button>
                    </div>
                </form>
                <Output mag={this.props.text.magnitude} score={this.props.text.score} />
                <button  className="btn" type="submit"onClick={() => this.clickHandler()}>Start</button>

                {this.props.showComponent === true ?
                    <Dict />
                : null}

            </div>
        )
    }


}

const mapDispatchToProps = { fetchText, buttonClick, buttonUnClick}
const mapStateToProps = ({text, showComponent}) => ({text, showComponent})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
