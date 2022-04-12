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
  heading: {
    text: "Products",
    design: "",
  },
  sidebar: {
    banner: {
      img: "img/banner-1.png",
      sub_title: "TREATS & GROOMING",
      title: "Spoil your true love",
    },
  },
  content: {
    collection: "402337759453",
    review_app: {
      enable: true,
      app: "product_reviews", // "product_reviews" or "rivyo_reviews" or "loox_reviews""
    },
    sale: {
      enable: true,
      text: "Sale",
      design: "",
    },
    add_to_cart_text: "Add to cart",
    column: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    }
  },
  compare_popup: {
    product_enable: true,
    product_title: "Product",
    rating_enable: true,
    rating_title: "Rating"
  },
  menu1: {
    name : "menu",
    bgColor: "#000000",
    color: "#FFFFFF",
    list: [
      {
        name :"LOGO",
        href: "#"
      },
      {
        name :"GENTLEMAN",
        href: "#"
      },
      {
        name :"Belle Doll",
        href: "#"
      },
      {
        name :"Amber.",
        href: "#"
      },
      {
        name :"GLASSY",
        href: "#"
      }
    ],
    type: "option"
  },
  menu2: {
    name : "menu",
    bgColor : "#FFFFFF",
    color: "#000000",
    list: [
      {
        name :"HOME",
        href: "/"
      },
      {
        name :"PRODUCT",
        href: "/product.html"
      },
      {
        name :"BLOG",
        href: "/blog.html"
      },
      {
        name :"TREND",
        href: "#"
      },
      {
        name :"NEW IN",
        href: "#"
      },
      {
        name :"BULK EDITOR",
        href: "#",
        hasMegaMenu: true,
        children: [
          {
            megaMenuEnabled: true,
            megaMenuId: "megamenu1",
          },
        ],
      }
    ],
    type: "search"
  }
};
