import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export type TabPanelProps = {
    Component: React.FC | any | JSX.Element
    index: number
    // value: number
    title : string
}

function TabPanel({index , value , Component}: { index : number , value : number , Component : any , title : string}) {
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && Component() }
    </div>
  );
}

const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })

type TabsHorizontalProps = {
  tabs : TabPanelProps[]
}
export default function TabsHorizontal({tabs} : TabsHorizontalProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} onChange={handleChange} aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        >
          {
            tabs.map(({title , index}) => <Tab key={index} label={title} {...a11yProps(index)} />)
          }
        </Tabs>
      </Box>
      {
        tabs.map(({title,index,Component}) => 
        <TabPanel 
          key={`key${index}`} 
          value={value} 
          title={title} 
          index={index} 
          Component={Component} 
        />)
      }
      
    </Box>
  );
}