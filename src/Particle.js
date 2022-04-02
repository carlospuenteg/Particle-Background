import React from 'react'

const MAXHEIGHT = window.innerHeight
const MAXWIDTH = window.innerWidth
const MAXSIZE = 10

class Particle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: rand(0, MAXSIZE),
            color: "#" + randint(0,16**6).toString(16),
            blur: rand(0,10),
            x: rand(0, MAXWIDTH),
            y: rand(0, MAXHEIGHT),
            dir: {
                x: rand(-10,10),
                y: rand(-10,10)
            },
            vel: rand(0.5,2),
        }
    }

    componentDidMount() {
        setInterval(this.movement, 10);
    }

    render() {
        var STYLE = {
            position: "absolute",
            left: this.state.x + "px",
            top: this.state.y + "px",
            width: this.state.size + "px",
            height: this.state.size + "px",
            borderRadius: "50%",
            filter: "blur(" + this.state.blur + "px)",
            backgroundColor: this.state.color
        }
        return (
            <div style={STYLE}></div>
        );
    }

    movement = () => {        
        // Random change of direction
        if (Math.random() < 0.01) {
            this.setState(prevState => ({
                dir: {                   // object that we want to update
                    ...prevState.dir,    // keep all other key-value pairs
                    x: rand(-10,10)       // update the value of specific key
                }
            }));
        }
        if (Math.random() < 0.01) {
            this.setState(prevState => ({
                dir: {                   // object that we want to update
                    ...prevState.dir,    // keep all other key-value pairs
                    y: rand(-10,10)       // update the value of specific key
                }
            }));
        }

        // Forced change of direction
        if (this.state.x < -50) {
            this.setState(prevState => ({
                dir: {                   // object that we want to update
                    ...prevState.dir,    // keep all other key-value pairs
                    x: rand(0,10)       // update the value of specific key
                }
            }));
        }
        if (this.state.x > MAXWIDTH + 50) {
            this.setState(prevState => ({
                dir: {                   // object that we want to update
                    ...prevState.dir,    // keep all other key-value pairs
                    x: rand(-10,0)       // update the value of specific key
                }
            }));
        }
        if (this.state.y < -50) {
            this.setState(prevState => ({
                dir: {                   // object that we want to update
                    ...prevState.dir,    // keep all other key-value pairs
                    y: rand(0,10)       // update the value of specific key
                }
            }));
        }
        if (this.state.y > MAXHEIGHT + 50) {
            this.setState(prevState => ({
                dir: {                   // object that we want to update
                    ...prevState.dir,    // keep all other key-value pairs
                    y: rand(-10,0)       // update the value of specific key
                }
            }));
        }

        this.setState({x: this.state.x + Math.random() * 0.3 * this.state.vel * this.state.dir.x});
        this.setState({y: this.state.y + Math.random() * 0.3 * this.state.vel * this.state.dir.y});
    }
}

export default Particle;

function rand(min, max) {
    return Math.random()*(max-min) + min
}

function randint(min, max) {
    return Math.floor(Math.random()*(max-min+1)) + min;
}