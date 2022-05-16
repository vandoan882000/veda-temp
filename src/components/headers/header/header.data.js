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
    caret_enabled: true,
  },
};
