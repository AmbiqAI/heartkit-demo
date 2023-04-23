import { observer } from "mobx-react-lite";
import { Line } from 'react-chartjs-2';
import { GridContainer, GridZStack } from "../.././../components/utils";
import { Chart, ScriptableContext } from "chart.js";
import { useEffect, useMemo, useRef } from "react";
import { Stack, Typography } from "@mui/material";

const delayBetweenPoints = 1;
const previousY = (ctx: ScriptableContext<'line'>) => {
  if (ctx.dataIndex === 0 || ctx.dataIndex === undefined) {
    return ctx.chart.scales.y.getPixelForValue(100);
  }
  return ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.dataIndex - 1].getProps(['y'], true).y;
}

interface Props {
  id: number,
  ecg: number[],
  segs: number[],
  normIdxs: number[],
  pacIdxs: number[],
  pvcIdxs: number[],
}

const EcgPlot = ({ id, ecg, segs, normIdxs, pacIdxs, pvcIdxs }: Props) => {

  const data = useMemo(() => ({
    datasets: [
      {
        label: 'P-Wave',
        borderWidth: 3,
        borderColor: 'rgb(253,79,44)',
        backgroundColor: 'rgba(253,79,44,0.5)',
        yAxisID: 'y',
        data: []
      }, { // 92,201,154  205,72,200  253,79,44
        label: 'QRS',
        borderWidth: 3,
        borderColor: 'rgb(92,201,154)',
        backgroundColor: 'rgba(92,201,154,0.5)',
        yAxisID: 'y',
        data: []
      }, {
        label: 'T-Wave',
        borderWidth: 3,
        borderColor: 'rgb(205,72,200)',
        backgroundColor: 'rgba(205,72,200,0.5)',
        yAxisID: 'y',
        data: []
      }, {
        label: 'ECG',
        borderWidth: 3,
        borderColor: 'rgb(99,194,242)',
        backgroundColor: 'rgba(99,194,242,0.5)',
        yAxisID: 'y',
        data: []
      },
    ],
  }), []);

  const annotations = useMemo(() => {
    return [
      ...normIdxs.map((i) => ({
        drawTime: 'afterDatasetsDraw',
        type: 'line',
        value: i,
        borderColor: 'rgb(123,194,237)',
        scaleID: 'x',
        borderDash: [5, 5],
        borderWidth: 2,
        label: {
          display: false,
        }
      })),
      ...pacIdxs.map((i) => ({
        drawTime: 'afterDatasetsDraw',
        type: 'line',
        value: i,
        borderColor: 'rgb(189,82,195)',
        scaleID: 'x',
        borderDash: [5, 5],
        borderWidth: 2,
        label: {
          display: true,
          content: 'PAC',
          position: 'start',
          rotation: 90
        }
      })),
      ...pvcIdxs.map((i) => ({
        drawTime: 'afterDatasetsDraw',
        type: 'line',
        value: i,
        borderColor: 'rgb(253,79,44)',
        scaleID: 'x',
        borderDash: [5, 5],
        borderWidth: 2,
        label: {
          display: true,
          content: 'PVC',
          position: 'start',
          rotation: 90
        }
      })),
    ];
  }, [normIdxs, pacIdxs, pvcIdxs]);

  const chartRef = useRef<Chart>();

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) { return; }
    const pWaveSet = chart.data.datasets[0];
    const qrsSet = chart.data.datasets[1];
    const tWaveSet = chart.data.datasets[2];
    const ecgSet = chart.data.datasets[3];

    ecgSet.data = Array.from(ecg, (v,i) => ({x:i, y:v}));
    // ecgSet.data = Array.from(segs, (s,i) => ({x:i, y: s === 0 ? ecg[i] : NaN}));
    pWaveSet.data = Array.from(segs, (s,i) => ({x:i, y: s === 1 ? ecg[i] : NaN}));
    qrsSet.data = Array.from(segs, (s,i) => ({x:i, y: (s&0xF) === 2 ? ecg[i] : NaN}));
    tWaveSet.data = Array.from(segs, (s,i) => ({x:i, y: s === 3 ? ecg[i] : NaN}));
    chart.update('resize');
    return () => {};
  }, [id]);  // eslint-disable-line

  return (
    <GridContainer>
      <GridZStack level={0} style={{paddingBottom: 0}}>
        <Line
          // @ts-ignore
          ref={chartRef}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: { point: { radius: 0 } },
            animation: {
            },
            animations: {
              x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN,
                delay(ctx: ScriptableContext<'line'>) {
                  return ctx.type !== 'data' ? 0 : ctx.dataIndex * delayBetweenPoints;
                }
              },
              y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx: ScriptableContext<'line'>) {
                  return ctx.type !== 'data' ? 0 : ctx.dataIndex * delayBetweenPoints;
                }
              },
            },
            plugins: {
              annotation: {
                // @ts-ignore
                annotations: annotations
              },
              legend: {
                position: 'bottom' as const,
                align: 'start',
                labels: {
                  color: 'white',
                  font: {
                    family: 'Roboto',
                    size: 14
                  }
                },
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
          data={data}
        />
      </GridZStack>
      <GridZStack level={1} style={{pointerEvents: 'none'}}>
        <Stack p={1} width="100%" height="100%" justifyContent="flex-end" alignItems="end" px={1} pt={1}>
          <Typography variant="subtitle1" fontWeight={900} component='div'>
            1-LEAD ECG
          </Typography>
        </Stack>
      </GridZStack>
    </GridContainer>
  );
}

export default observer(EcgPlot);
