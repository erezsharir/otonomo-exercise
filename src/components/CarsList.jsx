import React from 'react'
import { Car } from './Car'

export function CarsList({ cars, setCarActive }) {
  return (
    <div>
      {cars.map(car => (
        <Car
          key={car.vin}
          vin={car.vin}
          active={car.active}
          setCarActive={setCarActive}
        />
      ))}
    </div>
  )
}
