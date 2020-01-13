import React, { Component } from "react";
import axios from "axios";
import CanvasJSReact from "../assets/canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CanvasJsChart extends Component {
  state = {
    chartData: {}
  };

  componentDidMount() {
    axios
      .get(
        "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=XRP&market=USD&apikey=Y37MZSJIGWEI11ZQ"
      )
      .then(res => {
        console.log(res.data);
        const data = res.data["Time Series (Digital Currency Daily)"];
        console.log(data);
        this.setState({
          chartData: data
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const dataPoints = [];

    for (let item in this.state.chartData) {
      const dataObj = {};
      dataObj.x = new Date(item);
      let a, b, c, d;
      a = Number(this.state.chartData[item]["1a. open (USD)"]).toFixed(2);
      b = Number(this.state.chartData[item]["2a. high (USD)"]).toFixed(2);
      c = Number(this.state.chartData[item]["3a. low (USD)"]).toFixed(2);
      d = Number(this.state.chartData[item]["4a. close (USD)"]).toFixed(2);

      dataObj.y = [a, b, c, d];

      dataObj.y = dataObj.y.map(i => Number(i));

      dataPoints.push(dataObj);
    }

    const options = {
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Bitcoin Daily Candlestick"
      },
      axisX: {
        valueFormatString: "MMM"
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price (in USD)"
      },
      data: [
        {
          type: "candlestick",
          showInLegend: true,
          name: "Bitcoin Daily Candlestick",
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMMM YY",
          dataPoints: dataPoints
        }
      ]
    };

    return (
      <>
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
      </>
    );
  }
}

export default CanvasJsChart;
