
import React from 'react'
        class MouseTracker extends React.Component {
            constructor(props) {
            super(props);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.state = { x: 0, y: 0 };
            }
        
            handleMouseMove(event) {
            this.setState({
                x: event.clientX,
                y: event.clientY
            });
            }
        
            render() {
            return (
                <svg 

                onMouseMove={this.handleMouseMove}>
                <line
                x1={this.state.x-15}
                x2={this.state.x-15}
                y1={0}
                y2={400}

                stroke='gray'
                ></line>
                <line
                x1={0}
                x2={400}
                y1={this.state.y-15}
                y2={this.state.y-15}
                stroke='gray'
                ></line>
                </svg>
            );
            }
        }