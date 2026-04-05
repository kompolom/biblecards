import { html, css, LitElement } from 'lit';
import styles from './scramble.css?raw';
import { name } from './const';
import { themeLight } from 'shared/ui/Button';

const base = new CSSStyleSheet();
base.replaceSync(styles);

export class BCScramble extends LitElement {
  render() {
    return html`<div class="scramble">
      <div class="word-list scramble__results">
        <slot name="result"></slot>
      </div>
      <div class="word-list scramble__words">
        <slot name="words"></slot>
      </div>
      <slot></slot>
    </div>`;
  }
  connectedCallback(): void {
    super.connectedCallback();
    (this.renderRoot as ShadowRoot).adoptedStyleSheets.unshift(base);
    (this.renderRoot as ShadowRoot).adoptedStyleSheets.push(themeLight);
  }
  static register() {
    if (customElements && !customElements.get(name)) {
      customElements.define(name, BCScramble);
    }
  }
  static name = name;
}
