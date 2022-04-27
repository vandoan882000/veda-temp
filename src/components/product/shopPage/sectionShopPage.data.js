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
    text: "Product",
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
    availability : "1",
    filter_categories : [
      {
        value: "Activewear",
        id: "category_activewear",
        checked: true,
      },
      {
        value: "Hoodies & Sweatshirts",
        id: "category_hoodies_sweatshirts",
        checked: false,
      },
      {
        value: "Coats & Jackets",
        id: "category_coats_jackets",
        checked: false,
      },
      {
        value: "Dresses",
        id: "category_dresses",
        checked: false,
      },
      {
        value: "Sweatshirt Short",
        id: "category_sweatshirt_short",
        checked: false,
      },
      {
        value: "Jeans",
        id: "category_jeans",
        checked: false,
      },
      {
        value: "Skirts & Tops",
        id: "category_skirts_tops",
        checked: false,
      },
      {
        value: "Bikinis & Swimsuits",
        id: "category_bikinis_swimsuits",
        checked: false,
      },
    ],
    filter_brands : [
      {
        value: "Gap",
        id: "category_gap",
        checked: true,
      },
      {
        value: "Levi’s",
        id: "category_levi",
        checked: false,
      },
      {
        value: "Polo",
        id: "category_polo",
        checked: false,
      },
      {
        value: "Zara",
        id: "category_zara",
        checked: false,
      },
      {
        value: "Gucci",
        id: "category_gucci",
        checked: false,
      },
    ],
    filter_sizes : [
      {
        value: "XS",
        checked: true,
      },
      {
        value: "S",
        checked: false,
      },
      {
        value: "M",
        checked: false,
      },
      {
        value: "L",
        checked: false,
      },
      {
        value: "XL",
        checked: false,
      }
    ],
    filter_colors : [
      {
        value: "Red",
        color_code: "#ff0000",
        checked: true,
      },
      {
        value: "Black",
        color_code: "#000000",
        checked: false,
      },
      {
        value: "Green",
        color_code: "#00ff00 ",
        checked: false,
      },
      {
        value: "Blue",
        color_code: "#0000ff",
        checked: false,
      },
      {
        value: "Yellow",
        color_code: "#ffff00",
        checked: false,
      },
      {
        value: "Violet",
        color_code: "#ff00ff",
        checked: false,
      },
      {
        value: "Orange",
        color_code: "#ffa500",
        checked: false,
      },
      {
        value: "Cyan",
        color_code: "#00ffff",
        checked: false,
      },
      {
        value: "Grey",
        color_code: "#808080",
        checked: false,
      },
      {
        value: "Brown",
        color_code: "#a52a2a",
        checked: false,
      },
      {
        value: "Pink",
        color_code: "#ffc0cb",
        checked: false,
      }
    ],
    filter_tags: [
      {
        value: "New",
        checked: true,
      },
      {
        value: "Sale",
        checked: false,
      },
      {
        value: "Hot",
        checked: false,
      },
      {
        value: "Trending",
        checked: false,
      },
      {
        value: "Best Seller",
        checked: false,
      },
      {
        value: "New",
        checked: false,
      },
      {
        value: "Sale",
        checked: false,
      },
      {
        value: "Hot",
        checked: false,
      },
      {
        value: "Trending",
        checked: false,
      },
      {
        value: "Best Seller",
        checked: false,
      }
    ],
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
  product_box: [
    {
      type: "search"
    },
    {
      type: "refine",
      item: [
        {
          name: "Yellow"
        },
        {
          name: "Hat"
        },
        {
          name: "XS"
        }
      ]
    },
    {
      type: "category",
      item: [
        {
          name: "Áo"
        },
        {
          name: "Váy"
        },
        {
          name: "Quần"
        },
        {
          name: "Bikini"
        },
        {
          name: "Phụ kiện"
        }
      ]
    },
    {
      type: "color",
      item: [
        {
          name: "--1"
        },
        {
          name: "--2"
        },
        {
          name: "--2"
        },
        {
          name: "--2"
        },
        {
          name: "--2"
        },
        {
          name: "--2"
        },
        {
          name: "--2"
        }
      ]
    },
    {
      type: "size",
      item: [
        {
          name: "XS"
        },
        {
          name: "S"
        },
        {
          name: "M"
        },
        {
          name: "L"
        },
        {
          name: "XL"
        }
      ]
    },
    {
      type: "filter"
    },
    {
      type: "brand",
      item: [
        {
          name: "Gap"
        },
        {
          name: "Levi"
        },
        {
          name: "Polo"
        },
        {
          name: "Zara"
        },
        {
          name: "Gucci"
        }
      ]
    },
    {
      type: "availability",
      item: [
        {
          name: "In stock"
        },
        {
          name: "Out of stock"
        }
      ]
    },
    {
      type: "tag",
      item: [
        {
          name: "Design"
        },
        {
          name: "Save"
        },
        {
          name: "Simple"
        },
        {
          name: "Stock"
        },
        {
          name: "Hãy tìm key đi"
        }
        ,
        {
          name: "Item"
        }
        ,
        {
          name: "Iec"
        }
        ,
        {
          name: "Linh Tinh"
        },
        {
          name: "Simple"
        },
        {
          name: "Stock"
        },
        {
          name: "Hãy tìm key đi"
        }
        ,
        {
          name: "Item"
        }
        ,
        {
          name: "Iec"
        }

      ]
    },
    {
      type: "popular-post",
      item: [
        {
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          srcImg: "../../img/post1.png"
        },
        {
          title: "Nisl natoque sed cursus purus. Pellentesque amet sollicitudin non ac adipiscing sed fac...",
          srcImg: "../../img/post2.png"
        },
        {
          title: "A arcu malesuada mauris consequat est cursus dignissim cras.",
          srcImg: "../../img/post3.png"
        }
      ]
    },
    {
      type: "newsletter"
    }

  ]
};
