const d = document;

export default function alarm() {
  const $btnAlarm = d.querySelector(".bi-alarm"),
    $value = d.querySelector(".alarm__input"),
    $btnInitial = d.querySelector(".btn-initial"),
    $btnEnd = d.querySelector(".btn-end"),
    $iconsItems = d.querySelectorAll(".time__elements"),
    $containerAlarm = d.querySelector(".container__alarm"),
    $tittleAlarm = d.querySelector(".alarm__tittle"),
    $alarm = d.querySelector(".alarm__element"),
    $tittleMain = d.querySelector(".tittle__element");

  let tempo, tempoOut;

  d.addEventListener("click", (e) => {
    // ****Evento click en el icono de la alarma ****
    if (e.target === $btnAlarm) {
      for (let i = 0; i < $iconsItems.length; i++) {
        $iconsItems[i].classList.add("hidden");
      }
      $tittleMain.classList.add("hidden");
      $containerAlarm.classList.add("container__alarm-grid-active");
    }

    // *** Evento click del boton iniciar ***
    if (e.target === $btnInitial) {
      const alarmFunction = () => {
        const fechaParametro = parseInt(new Date($value.value).getTime()),
          fechaActual = parseInt(new Date().getTime());
        if (isNaN(fechaParametro))
          return alert("Ingrese una fecha y hora valida");

        // Unidades
        let diferenciaTiempo = fechaParametro - fechaActual;
        const segundosUnidad = 1000,
          minutosUnidad = segundosUnidad * 60,
          horasUnidad = minutosUnidad * 60,
          diasUnidad = horasUnidad * 24;
        // Tiempo
        let segundos = (
            "0" +
            Math.floor((diferenciaTiempo % minutosUnidad) / segundosUnidad)
          ).slice(-2),
          minutos = (
            "0" + Math.floor((diferenciaTiempo % horasUnidad) / minutosUnidad)
          ).slice(-2),
          horas = (
            "0" + Math.floor((diferenciaTiempo % diasUnidad) / horasUnidad)
          ).slice(-2),
          dias = Math.floor(diferenciaTiempo / diasUnidad);

        // ***TIEMPO ****
        if (Math.sign(diferenciaTiempo) === 1) {
          $value.classList.add("hidden");
          $btnInitial.classList.add("hidden");
          $tittleAlarm.innerHTML = "Tu alarma sonará dentro de: ";
          $alarm.innerHTML = `${dias}:${horas}:${minutos}:${segundos} `;
        } else {
          clearInterval(tempo);
          const $alarmSong = d.createElement("audio");
          $alarmSong.loop = true;
          $alarmSong.src = "media/cancion.mp3";
          $tittleAlarm.innerHTML = "Detener alarma";

          tempoOut = setTimeout(() => {
            $alarmSong.play();
            $btnEnd.classList.remove("hidden");
          }, 1000);
        }
      };

      tempo = setInterval(() => {
        alarmFunction();
      }, 1000);
    }
    if (e.target === $btnEnd) {
      clearTimeout(tempoOut);
      window.location.reload();
    }
  });
}
