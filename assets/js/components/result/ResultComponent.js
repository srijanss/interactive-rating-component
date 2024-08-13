import css from "./ResultComponent.css?inline";
import Store from "../store";

export default class ResultComponent extends HTMLElement {
  constructor() {
    self = super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    self.hidden = false;
    this.shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <article>
        <figure>
          <img src="assets/images/illustration-thank-you.svg" alt="Rating receipt illustration" />
          <figcaption class="visually-hidden">Rating receipt illustration</figcaption>
        </figure>
        <p class="result">You selected ${Store.currentRating} out of 5</p>
        <h2>Thank you!</h2>
        <p class="content">We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
      </article>
    `;
  }
}
