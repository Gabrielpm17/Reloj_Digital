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

  let secPrevious = 0,
    minutosPrevious = 0,
    horasPrevious = 0,
    secActual = 0;

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
      const $filas = d.createElement("div");
      $filas.classList.add("fila");
      $filas.innerHTML = `${hr > 9 ? hr : "0" + hr}:${
        min > 9 ? min : "0" + min
      }:${sec > 9 ? sec : "0" + sec}`;
      $containerVueltas.insertAdjacentElement("afterbegin", $filas);

      // Tiempo en segundos
      if (secPrevious === 0) {
        secPrevious = sec;
        console.log("Primera vuelta  " + secPrevious);
      } else if (secPrevious > sec) {
        secActual = Math.abs(sec - secPrevious);
        secActual = 60 - secActual;
        secPrevious = sec;
        console.log(` Vuelta ${i++}: segundos  ${secActual}`);
      } else {
        secActual = sec - secPrevious;
        secPrevious = sec;
        console.log(` Vuelta ${i++}: segundos  ${secActual}`);
      }
    }
  });
}
