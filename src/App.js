import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'
import { EventsList } from './components/EventsList'
import { Cars } from './components/Cars'
import createCarStreamer from './api/car-data-streamer'

const CarEvents = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`

const CarsSection = styled('div')`
  flex: 3;
  max-height: 100vh;
  overflow: hidden;
`

const EventsSection = styled('div')`
  flex: 7;
  max-height: 100vh;
  overflow: hidden;
  border-left: 1px solid lightgray;
`

class App extends Component {
  state = {
    cars: [],
    events: [],
    streamers: {},
  }

  addEvent = event => {
    this.setState({
      ...this.state,
      events: [...this.state.events, event],
    })
  }

  addCar = vin => {
    const streamer = createCarStreamer(vin)
    streamer.subscribe(this.addEvent)
    streamer.start()
    this.setState({
      ...this.state,
      cars: [...this.state.cars, { vin, active: true }],
      streamers: {
        ...this.state.streamers,
        [vin]: streamer,
      },
    })
  }

  setCarActive = vin => {
    this.setState({
      ...this.state,
      cars: this.state.cars.map(car => {
        if (car.vin === vin) {
          car.active = !car.active
          if (car.active) {
            this.state.streamers[vin].start()
          } else {
            this.state.streamers[vin].stop()
          }
        }
        return car
      }),
    })
  }

  componentWillUnmount() {
    Object.keys(this.state.streamers).forEach(key =>
      this.state.streamers[key].removeHandler(this.addEvent),
    )
  }

  render() {
    return (
      <CarEvents>
        <CarsSection>
          <Cars
            cars={this.state.cars}
            addCar={this.addCar}
            setCarActive={this.setCarActive}
          />
        </CarsSection>
        <EventsSection>
          <EventsList events={this.state.events} />
        </EventsSection>
      </CarEvents>
    )
  }
}

export default App
