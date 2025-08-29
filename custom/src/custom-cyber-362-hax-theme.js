/**
 * Copyright 2025 winstonwumbo
 * @license Apache-2.0, see License.md for full text.
 */
import { HAXCMSLitElementTheme, css, unsafeCSS, html, store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { PolarisFlexTheme } from "@haxtheweb/polaris-theme/lib/polaris-flex-theme.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/blocks/site-children-block.js";

/**
 * `CustomCyber362HaxTheme`
 * `CustomCyber362HaxTheme based on modern flex design system`
 * `This theme is an example of extending an existing theme component`
 *
 * @microcopy - language worth noting:
 *  - HAXcms - A headless content management system
 *  - HAXCMSTheme - A super class that provides correct baseline wiring to build a new theme
 *
 * @documentation - see HAX docs to learn more about theming
 *  - Custom theme development - https://haxtheweb.org/documentation/developers/haxsite/custom-theme-development
 *  - Theme Blocks - https://haxtheweb.org/documentation/developers/theme-blocks
 *  - DDD - https://haxtheweb.org/documentation/ddd
 *  - Data Store - https://haxtheweb.org/documentation/developers/haxsite/data-store
 * @element custom-cyber-362-hax-theme
 */
class CustomCyber362HaxTheme extends PolarisFlexTheme {
  //styles function
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          --media-banner-height: 300px;
        }
      `,
    ];
  }

  /**
   * Overload methods for customization of slots from the base class 
   */
  renderHeaderSlot() {
    return html``
  }

  renderFooterContactInformation() {
    return html``
  }

  renderFooterSecondarySlot() {
    return html``
  }

  renderFooterPrimarySlot() {
    return html``
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "custom-cyber-362-hax-theme";
  }
 
  constructor() {
    super();
  }
}
customElements.define(CustomCyber362HaxTheme.tag, CustomCyber362HaxTheme);
export { CustomCyber362HaxTheme };
