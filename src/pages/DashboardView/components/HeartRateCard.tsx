import { Stack, Typography } from "@mui/material";
import { useSpring, animated, config } from "@react-spring/web";
import { observer } from "mobx-react-lite";
import { HeartCircleIcon } from "../../../assets/icons";
import { GridContainer, GridZStack } from "../../../components/utils";
import { useStore } from "../../../models/store";

const HeartRateCard = observer(() => {
  const { root: { state: { results: { heartRate } } }} = useStore();
  const metricValue = heartRate;
  const { number } = useSpring({
    from: { number: 0 },
    number: metricValue,
    delay: 100,
    config: config.molasses
  })
  return (
    <GridContainer>
      <GridZStack level={0} style={{paddingBottom: 0}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' height='100%' p={1}>
          <HeartCircleIcon htmlColor="rgb(204,73,201)" sx={{ fontSize: '48px' }}/>
          <Stack spacing={1} textAlign="end" height="100%" justifyContent="end">
            <Typography variant='h5' component='div'>
            {heartRate > 0 ? (
              <animated.div>
                {number.to(n => `${n.toFixed(0)} BPM`)}
              </animated.div> ) : (
                '--'
            )}

            </Typography>
            <Typography variant='subtitle1' component='div'>
              HEART RATE
            </Typography>
          </Stack>
        </Stack>
      </GridZStack>
    </GridContainer>
  )
});

export default HeartRateCard;
