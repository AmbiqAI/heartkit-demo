import Header from '../../../components/Header';
import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { HeartKitIcon, NeuralSpotIcon } from '../../../assets/icons';
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
            Live HeartKit Demo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box alignItems='center' sx={{ display: 'flex' }}>
            <NeuralSpotIcon sx={{height: '36px', width: 'auto' }} />
          </Box>

        </Toolbar>
      </Header>
  );
}

export default observer(DashboardHeader);
