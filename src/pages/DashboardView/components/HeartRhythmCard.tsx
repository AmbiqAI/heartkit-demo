import { Stack, Typography } from "@mui/material";
import { animated } from "@react-spring/web";
import { observer } from "mobx-react-lite";
import { RhythmCircleIcon } from "../../../assets/icons";
import { GridContainer, GridZStack } from "../../../components/utils";
import { useStore } from "../../../models/store";

const HeartRhythmCard = observer(() => {
  const rhythms = ['Normal', 'Tachycardia', 'Bradycardia']
  const { root: { state: { results: {heartRhythm, arrhythmia} } }} = useStore();
  const rhythm = arrhythmia ? 'Arrhythmia' : rhythms[heartRhythm];
  return (
    <GridContainer>
      <GridZStack level={0} style={{paddingBottom: 0}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' height='100%' p={1}>
          <RhythmCircleIcon htmlColor="rgb(204,73,201)" sx={{ fontSize: '48px' }}/>
          <Stack spacing={1} textAlign="end" height="100%" justifyContent="end">
            <Typography variant='h5' component='div'>
              <animated.div>
                {rhythm}
              </animated.div>
            </Typography>
            <Typography variant='subtitle1' component='div'>
              HEART RHYTHM
            </Typography>
          </Stack>
        </Stack>
      </GridZStack>
    </GridContainer>
  )
});

export default HeartRhythmCard;
