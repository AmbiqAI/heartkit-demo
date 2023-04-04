import { Stack, Typography } from "@mui/material";
import { useSpring, animated, config } from "@react-spring/web";
import { observer } from "mobx-react-lite";
import { BeatCircleIcon } from "../../../assets/icons";
import { GridContainer, GridZStack } from "../../../components/utils";
import { useStore } from "../../../models/store";

const HeartBeatCard = observer(() => {
  const { root: { state: { results: { numBeats }}}} = useStore();
  const metricValue = numBeats;
  const { number } = useSpring({
    from: { number: 0 },
    number: metricValue,
    delay: 100,
    config: config.molasses
  })
  return (
    <GridContainer>
      <GridZStack level={0} style={{paddingBottom: 0}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' height='100%' sx={{p: 1}}>
            <BeatCircleIcon htmlColor="rgb(204,73,201)" sx={{ fontSize: '48px' }}/>
          <Stack spacing={1} textAlign="end" height="100%" justifyContent="end">
            <Typography variant='h5' component='div'>
             {numBeats > 0 ? (
             <animated.div>
                {number.to(n => n.toFixed(0))}
              </animated.div>
             ) :("--")
             }
            </Typography>
            <Typography variant='subtitle1' component='div'>
              HEART BEATS
            </Typography>
          </Stack>
        </Stack>
      </GridZStack>
    </GridContainer>
  )
});

export default HeartBeatCard;
