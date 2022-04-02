import React from 'react';
import Particle from './Particle.js';

class Background extends React.Component {
    // Render 50 Particle objects
    render() {
        var particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(<Particle key={i} id={"p"+i}/>);
        }
        return (<div>{particles}</div>);
    }
}

export default Background;