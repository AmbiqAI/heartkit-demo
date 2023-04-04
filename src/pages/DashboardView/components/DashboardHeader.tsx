import Header from '../../../components/Header';
import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AmbiqIcon, HeartKitIcon } from '../../../assets/icons';
import { observer } from 'mobx-react-lite';
import { PulsedDiv } from '../../../components/utils';

interface Props {
  appState: string
}

const DashboardHeader = ({ appState }: Props) => {
  console.debug(appState);
  return (
      <Header>
        <Toolbar>
            <PulsedDiv>
              <HeartKitIcon fontSize='large' sx={{mr: 1}} />
            </PulsedDiv>
          <Typography variant='h5' component='div' sx={{flexGrow: 1}}>
            Live Heart Kit Demo
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box alignItems='center' sx={{ display: 'flex' }}>
            <Typography variant='h5' component='div' sx={{flexGrow: 1}}>
              neuralSPOT
            </Typography>
            <AmbiqIcon fontSize='large' sx={{ml: 1, color: 'white'}} />
          </Box>

        </Toolbar>
      </Header>
  );
}

export default observer(DashboardHeader);
