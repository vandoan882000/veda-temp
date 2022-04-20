const data = {
  general_settings: {
    fixed: false,
    background_color_enable: false,
    color: "transparent",
    background_image_enable: true,
    image: "",
    size: "cover",
    overlay: "transparent",
  },
  top_bar: {
    address_icon: '<i class="far fa-map-marker-alt"></i>',
    address: "523 Sylvan Ave Mountain View, CA 94041",
    logo: "img/logo.png",
    brand: [
      {
        name: "YASMINA",
        href: "#"
      },
      {
        name: "GENTLEMAN",
        href: "#"
      }
      ,
      {
        name: "Belle Doll",
        href: "#"
      }
      ,
      {
        name: "Amber.",
        href: "#"
      }
      ,
      {
        name: "GLASSY",
        href: "#"
      }
    ]
  },
  cart: {
    enable: true,
    icon: '<i class="fal fa-shopping-basket"></i>',
    use_mini_cart: true,
  },
  wishlist: {
    enable: true,
    icon: '<i class="fal fa-heart"></i>',
  },
  search: {
    enable: true,
    icon: '<i class="far fa-search"></i>',
    placeholder: "Search",
  },
  navigation: {
    arrow: true,
    menu: [
      {
        label: "HOME",
        iconEnabled: false,
        href: "/",
      },
      {
        label: "PRODUCT",
        iconEnabled: false,
        href: "product.html",
        hasMegaMenu: true,
        children: [
          {
            megaMenuEnabled: true,
            megaMenuId: "megamenu1",
          },
        ],
      },
      {
        label: "BLOG",
        iconEnabled: false,
        href: "/blog.html",
        children: [
          {
            label: "Blog 1",
            href: "#",
          },
          {
            label: "Blog 2",
            href: "#",
          },
          {
            label: "Blog",
            iconEnabled: false,
            href: "#",
            children: [
              {
                label: "Blog 1",
                href: "#",
              },
              {
                label: "Blog 2",
                href: "#",
              },
            ],
          },
        ],
      },
      {
        label: "TREND",
        iconEnabled: false,
        href: "#",
      },
      {
        label: "NEW IN",
        iconEnabled: false,
        href: "#",
      },
      {
        label: "BULK EDITOR",
        iconEnabled: false,
        href: "#",
      },
    ],
    caret_enabled: true,
  },
  content: {},
};
