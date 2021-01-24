import React from 'react'
import Checkbox from './Checkbox'

export function Car({ vin, active, setCarActive }) {
  function changeActiveState() {
    setCarActive(vin)
  }

  return (
    <div>
      <Checkbox checked={active} onChange={changeActiveState}>
        {vin}
      </Checkbox>
    </div>
  )
}
