import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormikProps } from "formik";
import { Component, useState } from 'react'

export type StepItem = {
  index : number
  title : string
  Component : React.ElementType | React.ReactNode | React.ReactNode[] | React.FC | any
}




export default function StepperLinearHorizontal({steps , onDone } : {steps : StepItem[] , onDone : () => void}){  

    const [activeStep, setActiveStep] = useState(0)


    const handleNext = () => { 
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {
          steps.map( ({ title }) => <Step key={title}><StepLabel>{title}</StepLabel></Step>)
        }
      </Stepper>
      
        <>
          <Box sx={{ mt: 2, mb: 1  }}>
            {
              steps.find( step => step.index == activeStep)?.Component()
            }
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Regresar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            {
              activeStep === steps.length - 1 ? 
              <Button onClick={() => onDone()}>Completar</Button> :
              <Button onClick={handleNext}>Continuar</Button>
            }
              
            </Box>
        </>
    </Box>
    )
}