import { Box, Card } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { observer } from "mobx-react-lite";
import DashboardHeader from "./components/DashboardHeader";
import EcgPlot from "./components/EcgPlot";
import { useStore } from "../../models/store";
import BeatChart from "./components/BeatChart";
import BeatsPlot from "./components/BeatsPlot";
import HeartChart from "./components/HeartChart";

const DashboardView = () => {
  const { root: { state }} = useStore();
  return (
    <Box sx={{ pb: 4, pt: 8, pl: 6, pr: 6 }}>
      <DashboardHeader appState={state.appState} />
      <Box flexGrow={1}>
        <Grid
          container
          direction="row"
          rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid flexGrow={0} xs={12} lg={12}>
            <Card elevation={1} sx={{height: 450}}>
              <EcgPlot
                id={state.dataId}
                ecg={state.data}
                segs={state.segMask}
                pacIdxs={state.pacBeatIdxs}
                pvcIdxs={state.pvcBeatIdxs}
              />
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <Card elevation={2} sx={{height: 250}} >
              <HeartChart
                id={state.dataId}
                heartRate={state.results.heartRate}
                heartRhythm={state.results.rhythmName}
              />
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <Card elevation={2} sx={{height: 250}} >
              <BeatChart
                id={state.dataId}
                normBeats={state.results.numNormBeats}
                pacBeats={state.results.numPacBeats}
                pvcBeats={state.results.numPvcBeats}
              />
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <Card elevation={1} sx={{height: 250}}>
              <BeatsPlot id={state.dataId} ecg={state.data} beatIdxs={state.beatIdxs} />
            </Card>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default observer(DashboardView);
