import { observer } from "mobx-react-lite";
import { Doughnut } from 'react-chartjs-2';
import { useSpring, animated, config } from "@react-spring/web";
import { GridContainer, GridZStack } from "../../../components/utils";
import { Chart } from "chart.js";
import { useMemo, useRef } from "react";
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { BeatCircleIcon } from "../../../assets/icons";


interface Props {
  id: number,
  normBeats: number,
  pacBeats: number,
  pvcBeats: number,
}

const BeatChart = ({ normBeats, pacBeats, pvcBeats }: Props) => {
  const numBeats = normBeats+pacBeats+pvcBeats;
  const { number } = useSpring({
    from: { number: 0 },
    number: numBeats,
    delay: 100,
    config: config.molasses
  })
  const data = useMemo(() => {
    const beats = normBeats+pacBeats+pvcBeats;
    return ({
    labels: ['Normal', 'PAC', 'PVC'],
    datasets: [
      {
        label: 'Beats',
        borderColor: ['rgb(123,194,237)', 'rgb(189,82,195)', 'rgb(253,79,44)'],
        backgroundColor: ['rgba(123,194,237,0.8)', 'rgba(189,82,195,0.8)', 'rgba(1253,79,44,0.8)'],
        data: [beats === 0 ? 1: normBeats, pacBeats, pvcBeats],
      },
    ],
    });
}, [normBeats, pacBeats, pvcBeats]);

  const chartRef = useRef<Chart>();

  return (
    <GridContainer>
      <GridZStack level={0}>
        <Stack width="90%" height="100%" py={1} pr={1} >
        <Doughnut
          // @ts-ignore
          ref={chartRef}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            rotation: 225, // start angle in degrees
            circumference: 270, // sweep angle in degrees
            cutout: '70%',
            plugins: {
              legend: {
                display: false,
                labels: {
                  color: 'white',
                  font: {
                    family: 'Roboto',
                    size: 14
                  }
                },
                position: 'right' as const,
                align: 'start'
              },
              title: {
                display: false,
              },
            },
            layout: {
              padding: 10
            }
          }}
          data={data}
        />
        </Stack>
      </GridZStack>

      <GridZStack level={1} style={{pointerEvents: 'none'}}>
        <Stack justifyContent='center' alignItems='center' textAlign='center' height='100%' width='90%' py={1} pr={1}>
          <Typography variant='h2' fontWeight={900}>
            {numBeats > 0 ? (
              <animated.text>
                {number.to(n => `${n.toFixed(0)}`)}
              </animated.text> ) : (
                '--'
            )}
            </Typography>
        </Stack>
      </GridZStack>

      <GridZStack level={1} style={{pointerEvents: 'none'}}>
        <Stack textAlign="center" justifyContent='flex-end' alignItems='center' height='100%' width='90%' py={1} pr={1}>
          <Typography variant='h4'>
            BEATS
          </Typography>
        </Stack>
      </GridZStack>

      <GridZStack level={2} style={{pointerEvents: 'none'}}>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' height='100%' px={1} pt={1}>
          <BeatCircleIcon htmlColor="rgb(204,73,201)" sx={{ fontSize: '48px' }}/>
          <Stack spacing={0} textAlign="start" height="100%" justifyContent="end">
            <Stack direction="row" width="100%" alignItems="center" spacing={1} textAlign="end" justifyContent="flex-end">
              <Typography variant='h6' component='div'>
              {`${normBeats} NSR`}
              </Typography>
              <Avatar sx={{ bgcolor: 'rgb(123,194,237)', width: '18px', height: '18px' }}>  </Avatar>
            </Stack>
            <Stack direction="row" width="100%" alignItems="center" spacing={1} textAlign="end" justifyContent="flex-end">
              <Typography variant='h6' component='div'>
              {`${pacBeats} PAC`}
              </Typography>
              <Avatar sx={{ bgcolor: 'rgb(189,82,195)', width: '18px', height: '18px' }}>  </Avatar>
            </Stack>
            <Stack direction="row" width="100%" alignItems="center" spacing={1} textAlign="end" justifyContent="flex-end">
              <Typography variant='h6' component='div'>
              {`${pvcBeats} PVC`}
              </Typography>
              <Avatar sx={{ bgcolor: 'rgb(253,79,44)', width: '18px', height: '18px' }}>  </Avatar>
            </Stack>

            <Typography variant='subtitle1' fontWeight={900} component='div' pt={2}>
              HEART BEATS
            </Typography>
          </Stack>
        </Stack>
      </GridZStack>

    </GridContainer>
  );
}

export default observer(BeatChart);
