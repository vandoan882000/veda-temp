type Logger = (actionName: string) => void;
type Unsubscibe = () => void;
type VNode = any;
type Colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
// @ts-ignore
declare abstract class Component<P = {}, S = {}> {
	componentWillMount?(): void;
	componentDidMount?(): void;
	componentWillUnmount?(): void;
	getChildContext?(): object;
	componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
	shouldComponentUpdate?(
		nextProps: Readonly<P>,
		nextState: Readonly<S>,
		nextContext: any
	): boolean;
	componentWillUpdate?(
		nextProps: Readonly<P>,
		nextState: Readonly<S>,
		nextContext: any
	): void;
	getSnapshotBeforeUpdate?(oldProps: Readonly<P>, oldState: Readonly<S>): any;
	componentDidUpdate?(
		previousProps: Readonly<P>,
		previousState: Readonly<S>,
		snapshot: any
	): void;
	componentDidCatch?(error: any, errorInfo: any): void;
}
declare abstract class PureComponent<P = {}, S = {}> extends Component<P,S> {
  isPureReactComponent: boolean;
}

interface MobileMenuOptions {
  width?: number;
  duration?: number;
  navSelector?: string;
  menuSelector?: string;
  linkSelector?: string;
  subMenuSelector?: string;
  backClassName?: string;
  closeClassName?: string;
  hamburgerButtonPosition?: string;
  renderHamburgerButton?: (className: string) => string;
  renderBackButton?: (className: string) => string;
  renderCloseButton?: (className: string) => string;
}
interface MobileMenuReturn {
  init(): void;
  destroy(): void;
}

declare interface Veda {
  utils: {
    objStrParse(value: string): Record<string, any>;
    isMobile: {
      android: boolean;
      blackBerry: boolean;
      ipad: boolean;
      iOS: boolean;
      opera: boolean;
      windows: boolean;
      any: boolean;
    };
    storage: Storage;
    store: {
      get(stateName?: string): Record<string, any>;
      create<T extends any>(stateName: string, options: { initialState: T, useStorage: boolean }): void;
      set<T extends any>(stateName: string, state: T): Logger;
      subscribe<T extends any>(stateName: string, listener: (state: T) => void): Unsubscibe;
    },
    getColorNames(): Colors;
    map<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): string;
    csr: {
      withStore(stateNames: string | string[]): (Component: any) => void;
      html(template: TemplateStringsArray, ...values: any[]): VNode;
      render(tree: VNode, parent: HTMLElement): void;
      createPortal(vnode: VNode, container: Element): VNode;
      Component: Component;
      PureComponent: PureComponent;
    }
  }
  plugins: {
    /** Masonry
     * @example
     * ```js
     * const masonry = veda.plugins.masonry('.masonry', {
     *  defaultColumn: 3,
     *  gap: 10,
     *  columnClassName: "masonry__item",
     *  responsive: [
     *    { breakpoint: 480, column: 2 },
     *    { breakpoint: 768, column: 3 },
     *    { breakpoint: 992, column: 4 }
     *  ]
     * });
     * masonry.on("load", () => {
     *  console.log("load");
     * });
     * masonry.on("resize", () => {
     *  console.log("resize");
     * });
     *```
     */
     masonry(selector: string, options: {
      defaultColumn?: number;
      gap?: number;
      columnClassName?: string;
      responsive?: ({
        breakpoint: number;
        column: number;
      })[];
     }): void;

    /** Theme toggle
     * @example
     * ```html
     * <button class="core-toggle-theme">Theme light | dark</button>
     * ```
     * ```js
     * // Javascript
     * veda.plugins.themeToggle(container);
     * ```
     */
    themeToggle(container: HTMLElement): void;

    /** Countdown
     * @example
     * ```html
     * // Liquid
     * <div class="core-countdown" data-options="{ timestamp: {{countdown}} }">
     *   <div>Days</div>
     *   <div class="core-countdown__days"></div>
     *   <div>Hours</div>
     *   <div class="core-countdown__hours"></div>
     *   <div>Minutes</div>
     *   <div class="core-countdown__minutes"></div>
     *   <div>Seconds</div>
     *   <div class="core-countdown__seconds"></div>
     * </div>
     * ```
     * ```js
     * // Javascript
     * veda.plugins.countdown(container);
     * ```
     */
    countdown(container: HTMLElement): void;

    /** Swiper
     * @example
     * ```html
     * // Liquid
     * <div
     *   class="core-swiper swiper"
     *   data-options="{
     *     speed: 400,
     *     spaceBetween: 30
     *   }"
     * >
     *   <div class="core-swiper-wrapper swiper-wrapper">
     *     {% for swiper in swipers %}
     *       <div component="swipers" class="swiper-slide">{{swiper.text}}</div>
     *     {% endfor %}
     *   </div>
     *   <div class="core-swiper-button core-swiper-button-pill core-swiper-button-abs">
     *     <div class="core-swiper-button-prev">
     *       <i class="fal fa-angle-left"></i>
     *     </div>
     *     <div class="core-swiper-button-next">
     *       <i class="fal fa-angle-right"></i>
     *     </div>
     *   </div>
     *   <div class="core-swiper-pagination"></div>
     * </div>
     * ```
     * ```js
     * // Javascript
     * veda.plugins.swiper(container);
     * ```
     */
    swiper(container: HTMLElement): void;

    /** Tabs
     * @example
     * ```html
     * // Liquid
     * <div component="tabs" class="core-tabs {{variant}}">
     *   <div class="core-tabs__nav">
     *     {% for tab in tabs %}
     *       <div class="core-tabs__link {{tab.active ? 'core-tabs__link--active' : ''}}">{{tab.label}}</div>
     *     {% endfor %}
     *   </div>
     *   <div class="core-tabs__content">
     *     {% for tab in tabs %}
     *       <div class="core-tabs__pane">{{tab.text}}</div>
     *     {% endfor %}
     *   </div>
     * </div>
     * ```
     * ```js
     * // Javscript
     * veda.plugins.tabs(container);
     * ```
     */
    tabs(container: HTMLElement): void;

    /** Collapse
     * @example
     * ```js
     * // Javascript
     * veda.plugins.collapse(container);
     * ```
     */
    collapse(container: HTMLElement): void;

    /** Image Zoom
     * @example
     * ```html
     * // Liquid
     * <div
     *   class="core-image-zoom"
     *   data-image-zoom-src="{{ image.src }}"
     *   data-image-zoom="6"
     * >
     *   <img
     *     src="{{ image.src }}"
     *     alt=""
     *   />
     * </div>
     * ```
     * ```js
     * // Javascript
     * veda.plugins.imageZoom(container);
     * ```
     */
    imageZoom(container: HTMLElement): void;

    /** Image Zoom
     * @example
     * ```js
     * veda.plugins.mobileMenu(container, {
     *   navSelector: ".pet-nav",
     *   menuSelector: ".pet-nav__menu",
     *   linkSelector: ".pet-nav__link",
     *   subMenuSelector: ".pet-nav__sub-list",
     *   backClassName: "pet-nav__list-item-back p:15px c:color-gray9 bdb:1px_solid_color-gray2",
     *   closeClassName: "pet-nav__close p:8px_15px c:color-gray9 bdb:1px_solid_color-gray2",
     * });
     * function checkResponsive() {
     *   if (window.innerWidth > 992) {
     *     menu.destroy();
     *   } else {
     *     menu.init();
     *   }
     * }
     * checkResponsive();
     * window.addEventListener("resize", checkResponsive);
     * ```
     */
     mobileMenu(container: HTMLElement, options: MobileMenuOptions): MobileMenuReturn;
  }
}

declare const veda: Veda;
