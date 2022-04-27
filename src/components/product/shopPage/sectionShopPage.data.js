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
    filter_categories : [
      {
        value: "Activewear",
        id: "category_activewear",
      },
      {
        value: "Hoodies & Sweatshirts",
        id: "category_hoodies_sweatshirts",
      },
      {
        value: "Coats & Jackets",
        id: "category_coats_jackets",
      },
      {
        value: "Dresses",
        id: "category_dresses",
      },
      {
        value: "Sweatshirt Short",
        id: "category_sweatshirt_short",
      },
      {
        value: "Jeans",
        id: "category_jeans",
      },
      {
        value: "Skirts & Tops",
        id: "category_skirts_tops",
      },
      {
        value: "Bikinis & Swimsuits",
        id: "category_bikinis_swimsuits",
      },
    ],
    filter_brands : [
      {
        value: "Gap",
        id: "category_gap",
      },
      {
        value: "Levi’s",
        id: "category_levi",
      },
      {
        value: "Polo",
        id: "category_polo",
      },
      {
        value: "Zara",
        id: "category_zara",
      },
      {
        value: "Gucci",
        id: "category_gucci",
      },
    ],
    filter_sizes : [
      {
        value: "XS",
      },
      {
        value: "S",
      },
      {
        value: "M",
      },
      {
        value: "L",
      },
      {
        value: "XL",
      }
    ],
    filter_colors : [
      {
        value: "Red",
        color_code: "#ff0000",
      },
      {
        value: "Black",
        color_code: "#000000",
      },
      {
        value: "Green",
        color_code: "#00ff00 ",
      },
      {
        value: "Blue",
        color_code: "#0000ff",
      },
      {
        value: "Yellow",
        color_code: "#ffff00",
      },
      {
        value: "Violet",
        color_code: "#ff00ff",
      },
      {
        value: "Orange",
        color_code: "#ffa500",
      },
      {
        value: "Cyan",
        color_code: "#00ffff",
      },
      {
        value: "Grey",
        color_code: "#808080",
      },
      {
        value: "Brown",
        color_code: "#a52a2a",
      },
      {
        value: "Pink",
        color_code: "#ffc0cb",
      }
    ],
    filter_tags: [
      {
        value: "New",
      },
      {
        value: "Sale",
      },
      {
        value: "Hot",
      },
      {
        value: "Trending",
      },
      {
        value: "Best Seller",
      },
      {
        value: "New",
      },
      {
        value: "Sale",
      },
      {
        value: "Hot",
      },
      {
        value: "Trending",
      },
      {
        value: "Best Seller",
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
