const d = document;

export default function currentTime(btnClock) {
  const $container = d.querySelector(".container__elements"),
    $tittle = d.querySelector(".tittle__element"),
    $itemsChild = d.querySelectorAll(".time__elements"),
    $clockTime = d.querySelector(".clock-time"),
    $btnTerminar = d.querySelector(".btn-end");

  let interval;

  d.addEventListener("click", (e) => {
    if (e.target.matches(btnClock)) {
      for (let i = 0; i < $itemsChild.length; i++) {
        $itemsChild[i].classList.add("hidden");
      }

      $tittle.innerHTML = "Hora Actual";

      $container.classList.add("clock");
      $clockTime.classList.remove("hidden");
      $btnTerminar.classList.add("active");

      interval = setInterval(() => {
        const time = new Date().toLocaleTimeString();
        $clockTime.innerHTML = time;
      }, 1000);
    }

    if (e.target === $btnTerminar) {
      clearInterval(interval);
      $container.classList.remove("clock");
      $btnTerminar.classList.remove("active");
      $clockTime.classList.add("hidden");
      $tittle.innerHTML = "Elige una opción";
      for (let i = 0; i < $itemsChild.length; i++) {
        $itemsChild[i].classList.remove("hidden");
      }
    }
  });
}
