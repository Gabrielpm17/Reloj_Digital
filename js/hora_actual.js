const d = document;

export default function currentTime(btnClock) {
  const $container = d.querySelector(".container__elements"),
    $tittle = d.querySelector(".tittle__element"),
    $itemsChild = d.querySelectorAll(".time__elements");

  d.addEventListener("click", (e) => {
    if (e.target.matches(btnClock)) {
      for (let i = 0; i < $itemsChild.length; i++) {
        $itemsChild[i].remove();
      }

      $tittle.innerHTML = "Hora Actual";

      const $clock = d.createElement("div");
      $container.appendChild($clock);
      $container.classList.add("clock");

      setInterval(() => {
        const time = new Date().toLocaleTimeString();
        $clock.innerHTML = time;
      }, 1000);
    }
  });
}
