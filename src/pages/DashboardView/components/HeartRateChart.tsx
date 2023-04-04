import { observer } from "mobx-react-lite";
import { Bar } from 'react-chartjs-2';
import { GridContainer, GridZStack } from "../../../components/utils";
import { Chart } from "chart.js";
import { useMemo, useRef } from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";


interface Props {
  id: number,
  heartRate: number,
  heartRhythm: number,
}

const HeartRateChart = ({ heartRate, heartRhythm }: Props) => {
  const data = useMemo(() => ({
    labels: ['Rate'],
    datasets: [
      {
        label: 'Dataset 1',
        borderWidth: 2,
        borderRadius: Number.MAX_SAFE_INTEGER,
        borderColor: ['rgb(189,82,195)'],
        borderSkipped: false,
        backgroundColor: ['rgba(189,82,195,0.8)'],
        data: [heartRate],
      },
    ],
  }), [heartRate]);

  const chartRef = useRef<Chart>();

  return (
    <GridContainer>
      <GridZStack level={0} style={{ paddingBottom: 0 }}>
        <Stack width="50%" height="100%" >
        <Bar
          // @ts-ignore
          ref={chartRef}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {enabled: false},
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
            scales: {
              y: {
                display: false,
                grid: {display: false}, ticks: {display: false},
                min: 0, max: 100
              },
              x: {
                display: false,
              }
            },
            layout: {
              padding: 10
            }
          }}
          data={data}
        />
        </Stack>
      </GridZStack>
      <GridZStack level={1}>
        <Stack p={1} width="100%" height="100%" justifyContent="flex-end" alignItems="end">
          <Typography variant="button">
            Rate
          </Typography>
        </Stack>
      </GridZStack>
    </GridContainer>
  );
}

export default observer(HeartRateChart);
