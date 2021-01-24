import React, { useState, useEffect } from 'react'
import Input from './Input'
import Button from './Button'
import { CarsList } from './CarsList'
import styled from 'styled-components'

const CarsComponent = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 40px;
`

const Form = styled('div')`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
`

const FormFields = styled('div')`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
`

const CarInput = styled(Input)`
  flex: 0 0 auto;
  margin-right: 10px;
`

const AddCarButton = styled(Button)`
  flex: 0 0 auto;
`

const FormError = styled('div')`
  flex: 0 0 20px;
  padding: 10px 0;
`

const CarsListSection = styled('div')`
  flex: 1;
  overflow: auto;
  max-height: calc(100vh - 140px);
`

export function Cars({ cars, addCar, setCarActive }) {
  const [input, setInput] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [vinAlreadyInUse, setVinAlreadyInUse] = useState(false)

  useEffect(() => {
    const isVinCorrect =
      !!input && input.length === 17 && input.match(/^[0-9A-Z]+$/)
    let vinInUse = false
    if (isVinCorrect) {
      vinInUse = cars.filter(car => car.vin === input).length !== 0
    }
    setDisabled(!isVinCorrect || vinInUse)
    setVinAlreadyInUse(vinInUse)
  }, [input, cars])

  function buttonClicked() {
    addCar(input)
  }

  return (
    <CarsComponent>
      <Form>
        <FormFields>
          <CarInput
            value={input}
            placeholder={'VIN'}
            onChange={e => setInput(e.target.value)}
          />
          <AddCarButton onClick={buttonClicked} disabled={disabled}>
            Add
          </AddCarButton>
        </FormFields>
        <FormError>
          {vinAlreadyInUse && <span>VIN already in use</span>}
        </FormError>
      </Form>
      <CarsListSection>
        <CarsList cars={cars} setCarActive={setCarActive} />
      </CarsListSection>
    </CarsComponent>
  )
}
