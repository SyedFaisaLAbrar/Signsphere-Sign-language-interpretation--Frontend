import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import modelImage from '../assets/data-model.png';
import v81_metrices_img from '../assets/v81_ploting.png';
import v91_metrices_img from '../assets/v91.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SignSphereInsights = () => {
    const generateData = (start, end, fn) => 
        Array.from({ length: end - start + 1 }, (_, i) => fn(i + start));
      
      // Generate accuracy and loss data
      const accuracyData = generateData(1, 200, (epoch) => 30 + Math.min(epoch * 0.3, 81.5 - 30));
      const lossData = generateData(1, 200, (epoch) => Math.max(40 - epoch * 0.2, 6));
      
      const chartData = {
        labels: generateData(1, 200, (epoch) => `Epoch ${epoch}`),
        datasets: [
          {
            label: "Accuracy",
            data: accuracyData,
            borderColor: "#5b67f8",
            backgroundColor: "rgba(66, 165, 245, 0.2)",
            fill: true,
            borderWidth: 1, 
          },
          {
            label: "Loss",
            data: lossData,
            borderColor: "#ef5350",
            backgroundColor: "rgba(239, 83, 80, 0.2)",
            fill: true,
            borderWidth: 1, 
          },
        ],
      };
      

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 4 }}>
      <Box sx={{ textAlign: "center", mb: 10 }}>
        <Typography variant="h4" fontWeight="bold">
          SignSphere Insights
        </Typography>
        <Typography variant="h7" color="textSecondary">
          Real-time Generative AI for Sign Language Translation
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ width: "80%", height: "100%", marginLeft: "20px" }}>
        {/* Left Column: Model Image and Name */}
        <Grid
            item
            xs={2}  // Increase width for the model image
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #ccc",  // Add border for tabular effect
            padding: 2,

            }}
        >
            <img
            src={modelImage}
            alt="Model"
            style={{ width: "80%", height: "auto", borderRadius: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
            SSP 1.0
            </Typography>
        </Grid>

        {/* Right Column: Metrics and v81 Images */}
        <Grid
            item
            xs={10}  // Adjust right column width
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",  // Right align items
            justifyContent: "flex-start",  // Align top
            padding: 2,
            }}
        >
            <Grid container direction="row" spacing={3} sx={{ width: "100%" }}>
            {/* Bottom Section: v81 Image */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                src={v81_metrices_img}
                alt="v81 Metrics"
                style={{ width: "90%", height: "auto", borderRadius: "10px" }}
                />
            </Grid>
            </Grid>
        </Grid>
        </Grid>
      <Grid container spacing={3} sx={{ width: "80%", height: "100%", marginLeft: "20px" }}>
        {/* Left Column: Model Image and Name */}
        <Grid
            item
            xs={2}  // Increase width for the model image
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #ccc",  // Add border for tabular effect
            padding: 2,

            }}
        >
            <img
            src={modelImage}
            alt="Model"
            style={{ width: "80%", height: "auto", borderRadius: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
            SSP 2.0
            </Typography>
        </Grid>

        {/* Right Column: Metrics and v81 Images */}
        <Grid
            item
            xs={10}  // Adjust right column width
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",  // Right align items
            justifyContent: "flex-start",  // Align top
            padding: 2,
            }}
        >
            <Grid container direction="row" spacing={3} sx={{ width: "100%" }}>
            {/* Bottom Section: v81 Image */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                src={v91_metrices_img}
                alt="v81 Metrics"
                style={{ width: "90%", height: "auto", borderRadius: "10px" }}
                />
            </Grid>
            </Grid>
        </Grid>
        </Grid>

    </Box>
  );
  
  
  
};

export default SignSphereInsights;
