const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const list = document.getElementById("list");

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 51.43, value: 2 },
  { minDegree: 51.44, maxDegree: 102.86, value: 1 },
  { minDegree: 102.87, maxDegree: 154.29, value: 6 },
  { minDegree: 154.3, maxDegree: 205.72, value: 5 },
  { minDegree: 205.73, maxDegree: 257.15, value: 4 },
  { minDegree: 257.16, maxDegree: 308.58, value: 3 },
  { minDegree: 308.59, maxDegree: 360, value: 7 },
];

//Size of each piece
const data = [16, 16, 16, 16, 16, 16, 16];

//background color for each piece
var pieColors = ["rgb(145, 120, 168)"];

//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6, 7],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

//display value based on the randomAngle
var totalpoints = 0;
document.getElementById("segnapunti").innerHTML = totalpoints;
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      if (i.value == 1) {
        addItemToList("Raccogli spazzatura per strada", 1);
        finalValue.innerHTML = `<p>Raccogli spazzatura per strada +1</p>`;
      }
      if (i.value == 2) {
        addItemToList("Consegna spesa ai bisognosi", 1);
        finalValue.innerHTML = `<p>Consegna spesa ai bisognosi +1</p>`;
      }
      if (i.value == 3) {
        addItemToList("Pianta alberi", 1);
        finalValue.innerHTML = `<p>Pianta alberi +1</p>`;
      }
      if (i.value == 4) {
        addItemToList("Usa un mezzo ecologico", 3);
        finalValue.innerHTML = `<p>Usa un mezzo ecologico +3</p>`;
      }
      if (i.value == 5) {
        addItemToList("Risparmia elettricita", 4);
        finalValue.innerHTML = `<p>Risparmia elettricita +4</p>`;
      }
      if (i.value == 6) {
        addItemToList("Mangiare meno carne", 3);
        finalValue.innerHTML = `<p>Mangiare meno carne +3</p>`;
      }
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Gira...</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

//------------------------------------------
// Function to add a new item to the list
function addItemToList(item, value) {
  // Create a new list item element
  const li = document.createElement("p");

  // Create a new checkbox element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Add the checkbox and item text to the list item

  li.appendChild(document.createTextNode(`- ${item} , ${value} punto/i`));
  li.appendChild(checkbox);

  // Add the new item to the list
  list.appendChild(li);

  // Controllo sul checkbox
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      li.style.display = "none";
      totalpoints += value;
      document.getElementById("segnapunti").innerHTML = totalpoints;
    } else {
      li.style.display = "block";
    }
  });
}

//--------------------------------------------------
