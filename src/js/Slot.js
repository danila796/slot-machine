import Reel from "./Reel.js";
import Symbol from "./Symbol.js";

export default class Slot {
  constructor(domElement) {
    Symbol.preload();

    this.currentSymbols = [
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
    ];

    this.nextSymbols = [
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
      ["apple", "apple", "apple"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");
  }

  spin() {
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;

    console.log("SPIN START");
  }

  onSpinEnd() {
    this.spinButton.disabled = false;

    console.log("SPIN END");

    if (this.autoPlayCheckbox.checked)
      return window.setTimeout(() => this.spin(), 200);
  }
}