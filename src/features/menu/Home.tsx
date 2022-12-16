import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import config from '../../config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function Home() {
  const [taskStatistics, setTaskStatistics] = useState<any[]>([]);

  ChartJS.register(...registerables);
  ChartJS.defaults.color = '#fff';
  ChartJS.defaults.font.size = 25;

  //Get the statistics.
  useEffect(() => {
    fetch(config.backendURL + '/tasks/statistics', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTaskStatistics(data);
      });
  }, []);

  // Labels for Horizontal axis. Okay, we got labels.
  console.log(taskStatistics);
  const labels = taskStatistics.map((object) => object['category']);
  const dataValues = taskStatistics.map((object) => object['taskCount']);
  console.log('Get the values.');
  console.log(dataValues);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        // Position of the legend.
        position: 'top' as const,
      },
      title: {
        // Just a title.
        display: false,
        text: 'Tasks in Each Category',
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        // The label.
        label: 'Tasks',
        data: labels.map(() => dataValues),
        //Just a color
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Content name={'Task Statistics'} height={'60vh'}>
      <Bar options={chartOptions} data={chartData} />
    </Content>
  );
}

export default Home;
