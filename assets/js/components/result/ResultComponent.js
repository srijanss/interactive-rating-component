import css from "./ResultComponent.css?inline";

export default class ResultComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <article>
        <figure>
          <img src="assets/images/illustration-thank-you.svg" alt="Rating receipt illustration" />
          <figcaption class="visually-hidden">Rating receipt illustration</figcaption>
        </figure>
        <p class="result">You selected 4 out of 5</p>
        <h1>Thank you!</h1>
        <p class="content">We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
      </article>
    `;
  }
}
