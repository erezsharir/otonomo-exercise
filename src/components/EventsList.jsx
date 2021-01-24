import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import EventNotification from './EventNotification'

const EventsComponent = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 40px;
`

const Header = styled('div')`
  flex: 0 0 40px;
  padding: 0 20px 20px;
  border-bottom: 1px solid lightgray;
`

const List = styled('div')`
  flex: 1;
  overflow: auto;
  max-height: calc(100vh - 140px);
`

const ListItem = styled('div')`
  max-width: 600px;
  padding: 20px 0;
  margin: 0 auto;
`

export function EventsList({ events }) {
  const [filter, setFilter] = useState(false)
  const [visibleEvents, setVisibleEvents] = useState([])

  useEffect(() => {
    setVisibleEvents([
      ...events.filter(event => (filter ? event.fuel < 0.15 : true)),
    ])
  }, [events, filter])

  function changeFilter() {
    setFilter(!filter)
  }

  return (
    <EventsComponent>
      <Header>
        <Checkbox checked={filter} onChange={changeFilter}>
          Filter events where fuel level is under 15%
        </Checkbox>
      </Header>
      <List>
        {visibleEvents.map(event => (
          <ListItem key={event.timestamp}>
            <EventNotification carEvent={event} />
          </ListItem>
        ))}
      </List>
    </EventsComponent>
  )
}
