import { observer } from "mobx-react-lite";
import { Line } from 'react-chartjs-2';
import { GridContainer, GridZStack } from "../../../components/utils";
import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import { RhythmCircleIcon } from "../../../assets/icons";
import { Stack, Typography } from "@mui/material";

interface Props {
  id: number,
  ecg: number[],
  beatIdxs: number[],
}

const BeatsPlot = ({ecg, beatIdxs}: Props) => {

  const chartRef = useRef<Chart>();

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) { return; }
    chart.data.datasets = [];
    for (let i = 0; i < beatIdxs.length; i++) {
      const beatIdx = beatIdxs[i] - 100;
      const data = Array(200).fill(0).map((v, i) => ({x: i-100, y:ecg[beatIdx+i] ?? 0}));
      // @ts-ignore
      chart.data.datasets.push({
        label: `Beat ${i}`,
        borderWidth: 2,
        borderColor: 'rgb(97, 196, 242)',
        backgroundColor: 'rgba(97, 196, 242, 0.5)',
        yAxisID: 'y',
        data: data
      });
    }
    chart.update('resize');
    return () => {};
  }, [ecg, beatIdxs]);

  return (
    <GridContainer>
      <GridZStack level={0} style={{paddingBottom: 0}}>
        <Stack width="100%" height="100%" py={1} >
        <Line
          // @ts-ignore
          ref={chartRef}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: { point: { radius: 0 } },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
            scales: {
              x: {
                type: "linear",
                display: false,
              },
              y: {
                display: false
              }
            }
          }}
          data={{
            datasets: [
              {
                label: 'Beat',
                borderWidth: 2,
                borderColor: 'rgb(97, 196, 242)',
                backgroundColor: 'rgba(97, 196, 242, 0.5)',
                yAxisID: 'y',
                data: [{x:0, y:1}, {x:100, y:1}]
              }
            ]
          }}
        />
        </Stack>
      </GridZStack>
      <GridZStack level={2} style={{paddingBottom: 0, pointerEvents: 'none'}}>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' height='100%' px={1} pt={1}>
          <RhythmCircleIcon htmlColor="rgb(204,73,201)" sx={{ fontSize: '48px' }}/>
          <Stack spacing={1} textAlign="end" height="100%" justifyContent="end">
            {/* <Typography variant='h5' component='div'>
             {normBeats}
            </Typography> */}
            <Typography variant='subtitle1' fontWeight={900} component='div'>
              R PEAKS
            </Typography>
          </Stack>
        </Stack>
      </GridZStack>

    </GridContainer>
  );
}

export default observer(BeatsPlot);
