import React from 'react'
import config from './config.json'

const MAXHEIGHT = window.innerHeight
const MAXWIDTH = window.innerWidth
const MINSIZE = config.minParticleSize
const MAXSIZE = config.maxParticleSize
const MINBLUR = config.minBlur
const MAXBLUR = config.maxBlur
const GLOBALVEL = config.globalVelocity
const OUTBOUND = MAXSIZE * 1.5
const FPS = config.FPS

class Particle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: rand(MINSIZE, MAXSIZE),
            color: "#" + randint(0,16**6).toString(16),
            blur: rand(MINBLUR,MAXBLUR),
            x: rand(0, MAXWIDTH),
            y: rand(0, MAXHEIGHT),
            angle: rand(0, 2*Math.PI),
            baseVel: rand(0.5,2),
            vel: rand(0.5,2),
            sizeChng: 1,
            sizeChngCount: 0,
        }
    }

    componentDidMount() {
        setInterval(this.movement, 1000/FPS);
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

    // Movement of a particle
    movement = () => {   
        // Size oscillation
        console.log(this.state.x)
        if (this.state.sizeChngCount >= 75) {
            this.setState({ sizeChng: -1 });
        } else if (this.state.sizeChngCount <= 0) {
            this.setState({ sizeChng: 1 });
        }
        this.setState(prev => ({
            size: prev.size + 0.05 * prev.sizeChng * rand(0,2),
            sizeChngCount: prev.sizeChngCount + prev.sizeChng
        }));

        if (Math.random() < 0.1) {
            this.setState(prev => ({
                angle: prev.angle + rand(-0.2,0.2),
            }));
        }     
        if (Math.random() < 0.015) {
            this.setState({
                angle: rand(0, 2*Math.PI),
                vel: rand(0.5,2)
            });
        }

        // Forced change of direction
        if (this.state.x < -OUTBOUND) {
            this.setState({ x: MAXWIDTH + OUTBOUND });
        }
        if (this.state.x > MAXWIDTH + OUTBOUND) {
            this.setState({ x: -OUTBOUND });
        }
        if (this.state.y < -OUTBOUND) {
            this.setState({ y: MAXHEIGHT + OUTBOUND });
        }
        if (this.state.y > MAXHEIGHT + OUTBOUND) {
            this.setState({ y: -OUTBOUND });
        }

        this.setState(prev => ({
            x: prev.x + prev.baseVel * prev.vel * GLOBALVEL * Math.cos(prev.angle),
            y: prev.y + prev.baseVel * prev.vel * GLOBALVEL * Math.sin(prev.angle)
        }));     
    }
}

export default Particle;

function rand(min, max) {
    return Math.random()*(max-min) + min
}
function randint(min, max) {
    return Math.floor(Math.random()*(max-min+1)) + min;
}