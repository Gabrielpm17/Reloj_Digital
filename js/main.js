import alarm from "./alarma.js";
import countdown from "./cronometro.js";
import currentTime from "./hora_actual.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  currentTime(".bi-clock");
  alarm();
  countdown();
});
