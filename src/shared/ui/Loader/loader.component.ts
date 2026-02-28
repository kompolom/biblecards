import { html, css, unsafeCSS, LitElement } from 'lit';
import styles from './loader.css?inline';

export class Loader extends LitElement {
  render() {
    return html`
      <div class="Loader">
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
        <span class="Loader-Block"></span>
      </div>
    `;
  }
  static register(name: string) {
    if (customElements && !customElements.get(name)) {
      customElements.define(name, Loader);
    }
  }
  static styles = css`
    ${unsafeCSS(styles)}
  `;
}
