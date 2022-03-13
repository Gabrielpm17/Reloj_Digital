const d = document;

export default function countdown() {
  const $icons = d.querySelectorAll(".time__elements"),
    $iconStopwatch = d.querySelector(".bi-stopwatch"),
    $containerCountdown = d.querySelector(".container-countdown"),
    $btninitial = d.querySelector(".countdown__btn-initial"),
    $btnReiniciar = d.querySelector(".countdown__btn-reiniciar"),
    $btnVuelta = d.querySelector(".countdown__btn-vuelta"),
    $countdownElement = d.querySelector(".countdown__element"),
    $tittle = d.querySelector(".tittle__element"),
    $containerVueltas = d.querySelector(".container-vueltas"),
    $btnStop = d.querySelector(".countdown__btn-stop");

  let sec = 0,
    min = 0,
    hr = 0,
    i = 0,
    interval;

  // Variables para diferencia de tiempo.
  let secPrevious = 0,
    secActual = 0,
    minutosActual = 0,
    minutosPrevious = 0,
    j = 0;

  // Variable set interval
  let contador;

  d.addEventListener("click", (e) => {
    if (e.target === $iconStopwatch) {
      $icons.forEach((el) => {
        el.classList.add("hidden");
      });
      $containerCountdown.classList.remove("hidden");
      $containerCountdown.classList.add("grid-container");
      $tittle.innerHTML = "Cronometro";
    }

    if (e.target === $btninitial) {
      const countdownFunction = () => {
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hr++;
          }
        }

        $countdownElement.innerHTML = `${hr > 9 ? hr : "0" + hr}:${
          min > 9 ? min : "0" + min
        }:${sec > 9 ? sec : "0" + sec}`;
      };
      interval = setInterval(() => {
        countdownFunction();
      }, 1000);

      $btninitial.classList.add("hidden");
      $btnVuelta.classList.remove("hidden");
      $btnStop.classList.remove("hidden");
      $btnReiniciar.classList.add("hidden");
    }

    if (e.target === $btnStop) {
      $btnVuelta.classList.add("hidden");
      $btnReiniciar.classList.remove("hidden");
      $btnStop.classList.add("hidden");
      $btninitial.classList.remove("hidden");
      alert("presionaste el boton de detener");
      clearInterval(interval);
    }

    if (e.target === $btnVuelta) {
      $containerVueltas.classList.remove("hidden");
      i++;
      clearInterval(contador);
      // Diferencia en segundos
      if (secPrevious === 0) {
        secPrevious = sec;
        secActual = sec;
        console.log("Primera vuelta  " + secPrevious);
      } else if (secPrevious > sec) {
        secActual = Math.abs(sec - secPrevious);
        secActual = 60 - secActual;
        secPrevious = sec;
        console.log(` Vuelta${i} : segundos  ${secActual}`);
      } else {
        secActual = sec - secPrevious;
        secPrevious = sec;
        console.log(` Vuelta${i} : segundos  ${secActual}`);
      }
      // Diferencia en minutos
      if (i >= 1) {
        contador = setInterval(() => {
          j++;
          console.log("segundos para el minuto " + j);
        }, 1000);
      }

      if (j > 60) {
        minutosActual = min - minutosPrevious;
        minutosPrevious = min;
      } else if (j < 60) {
        minutosActual = 0;
      }
      j = 0;

      // Creando elementos
      const $fila = d.createElement("tr"),
        $columTimeAbsolute = d.createElement("td"),
        $columTime = d.createElement("td"),
        $columVuelta = d.createElement("td");
      // Introduciendo los valores de la columna
      $columVuelta.innerHTML = i;
      $columTimeAbsolute.innerHTML = `${hr > 9 ? hr : "0" + hr}:${
        min > 9 ? min : "0" + min
      }:${sec > 9 ? sec : "0" + sec}`;
      $columTime.innerHTML = `${
        minutosActual > 9 ? minutosActual : "0" + minutosActual
      }:${secActual > 9 ? secActual : "0" + secActual}`;

      // Insertando los elementos
      $fila.classList.add("fila");
      $fila.appendChild($columVuelta);
      $fila.appendChild($columTime);
      $fila.appendChild($columTimeAbsolute);
      $containerVueltas.insertAdjacentElement("beforeend", $fila);
    }
  });
}
