import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

type PropsDialogBasic = {
    isOpen : boolean
    handleOpenDialog : (isOpen : boolean) => void
    responsive? : boolean
    children : JSX.Element | JSX.Element[]
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBasic({ isOpen , handleOpenDialog , responsive = false ,children } : PropsDialogBasic) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Dialog
            fullScreen={responsive ? fullScreen : false}
            open={isOpen}
            scroll="paper"
            onClose={()=> handleOpenDialog(false)}
            TransitionComponent={Transition}
            fullWidth={true}
            >
            {children}
        </Dialog>
    )
}