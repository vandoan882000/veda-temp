const data = {
  general_settings: {
    background_fixed: false,
    background_type: "color", // image, color, none
    background_image: "",
    background_color: "#ffffff",
    background_size: "cover",
    background_overlay_enable: false,
    background_overlay_color: "transparent",
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  search: {
    enable: true,
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
      },
      {
        label: "BLOG",
        iconEnabled: false,
        href: "/blog.html",
      },
      {
        label: "TREND",
        iconEnabled: false,
        href: "#",
        children: [
          {
            label: "Trend 1",
            href: "#",
          },
          {
            label: "Trend 2",
            href: "#",
          },
          {
            label: "Trend",
            iconEnabled: false,
            href: "#",
            children: [
              {
                label: "Trend 1",
                href: "#",
              },
              {
                label: "Trend 2",
                href: "#",
              },
            ],
          },
        ],
      },
      {
        label: "NEW IN",
        iconEnabled: false,
        href: "#",
        hasMegaMenu: true,
        children: [
          {
            megaMenuEnabled: true,
            megaMenuId: "megamenu1",
          },
        ],
      },
      {
        label: "BULK EDITOR",
        iconEnabled: false,
        href: "#",
      },
    ],
  },
};
