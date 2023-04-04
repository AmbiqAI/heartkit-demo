import { observer } from "mobx-react-lite";
import { Doughnut } from 'react-chartjs-2';
import { useSpring, animated, config } from "@react-spring/web";
import { GridContainer, GridZStack } from "../../../components/utils";
import { Chart } from "chart.js";
import { useMemo, useRef } from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HeartCircleIcon } from "../../../assets/icons";


interface Props {
  id: number,
  heartRate: number,
  heartRhythm: string
}

const HeartChart = ({ heartRate, heartRhythm }: Props) => {
  const metricValue = heartRate;
  const { number } = useSpring({
    from: { number: 0 },
    number: metricValue,
    delay: 100,
    config: config.molasses
  })
  const data = useMemo(() => {
    const perc = 100*Math.min(1, heartRate/120);
    return ({
      datasets: [
        {
          label: 'Dataset 1',
          borderColor: ['rgb(189,82,195)', '#ccc'],
          backgroundColor: ['rgba(189,82,195,0.8)', '#cccccccd'],
          data: [perc, 100-perc],
        },
      ],
    });
  }, [heartRate]);

  const chartRef = useRef<Chart>();

  return (
    <GridContainer>
      <GridZStack level={0} style={{ paddingBottom: 0 }}>
      <Stack width="90%" height="100%" >
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
              tooltip: {
                enabled: false
              },
              legend: {
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
        <Stack direction="row" justifyContent='center' alignItems='center' textAlign='center' height='100%' width='90%' pr={2}>
        <Typography variant='h3' fontWeight={900} component='div'>
            {heartRate > 0 ? (
              <animated.div>
                {number.to(n => n.toFixed(0))}
              </animated.div> ) : (
                '--'
            )}
            </Typography>
        </Stack>
      </GridZStack>

      <GridZStack level={1} style={{pointerEvents: 'none'}}>
        <Stack direction="row" textAlign="center" justifyContent='center' alignItems='end' height='100%' width='90%' pr={2}>
          <Typography variant='h5' component='div'>
            BPM
          </Typography>
        </Stack>
      </GridZStack>

      <GridZStack level={2} style={{paddingBottom: 0, pointerEvents: 'none'}}>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' height='100%' px={1} pt={1}>
          <HeartCircleIcon htmlColor="rgb(204,73,201)" sx={{ fontSize: '48px' }}/>
          <Stack spacing={0} textAlign="end" height="100%" justifyContent="end">
            <Typography variant='h5' component='div'>
             {heartRhythm}
            </Typography>
            <Typography variant='subtitle1' fontWeight={900} component='div'>
              HEART RHYTHM
            </Typography>
          </Stack>
        </Stack>
      </GridZStack>

    </GridContainer>
  );
}

export default observer(HeartChart);
