import css from "./ResultComponent.css?inline";
import IllustrationImage from "../../../../assets/images/illustration-thank-you.svg";

export default class ResultComponent extends HTMLElement {
  constructor() {
    self = super();
    this.currentRating = null;
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    const historyState = history.state;
    if (historyState.currentRating === null) {
      return null;
    } else {
      this.currentRating = historyState.currentRating;
    }
    this.shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <article class="result-block">
        <figure>
          <img src="${IllustrationImage}" alt="Rating receipt illustration" />
          <figcaption class="visually-hidden">Rating receipt illustration</figcaption>
        </figure>
        <p class="result">You selected ${this.currentRating} out of 5</p>
        <h2>Thank you!</h2>
        <p class="content">We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
      </article>
    `;
    setTimeout(() => {
      const resultBlock = this.shadow.querySelector(".result-block");
      resultBlock.classList.add("active");
    }, 1);
    return this;
  }
}
