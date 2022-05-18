const data = {
  general_settings: {
    background_fixed: false,
    background_type: "none", // image, color, none
    background_image: "",
    background_color: "",
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
  heading: {
    text: "Product",
    design: "",
  },
  price: {
    enable: true,
    title: "Price",
    title_design: "",
    price_text: "Price",
    from_text: "From",
    to_text: "To",
  },
  categories: {
    enable: true,
    title: "Categories",
    title_design: "",
  },
  categories_data: [
    {
      label: "Activewear",
      value: "activewear",
      label_design: "",
    },
    {
      label: "Hoodies & Sweatshirts",
      value: "hoodies_sweatshirts",
      label_design: "",
    },
    {
      label: "Coats & Jackets",
      value: "coats_jackets",
      label_design: "",
    },
    {
      label: "Sweatshirt Short",
      value: "sweatshirt_short",
      label_design: "",
    },
    {
      label: "Dresses",
      value: "dresses",
      label_design: "",
    },
    {
      label: "Jeans",
      value: "jeans",
      label_design: "",
    },
  ],
  color: {
    enable: true,
    title: "Color",
    title_design: "",
    colors: "Red,White,Green,Blue,Black,Gray",
  },
  size: {
    enable: true,
    title: "Size",
    title_design: "",
    sizes: "XS,S,M,L,XL",
  },
  brands: {
    enable: true,
    title: "Brand",
    title_design: "",
  },
  brands_data: [
    {
      label: "Gap",
      value: "gap",
      label_design: "",
    },
    {
      label: "Levi’s",
      value: "levi’s",
      label_design: "",
    },
    {
      label: "Polo",
      value: "polo",
      label_design: "",
    },
    {
      label: "Zara",
      value: "zara",
      label_design: "",
    },
    {
      label: "Gucci",
      value: "gucci",
      label_design: "",
    },
  ],
  availability: {
    enable: true,
    title: "Availability",
    title_design: "",
    in_stock_text: "In stock",
    in_stock_design: "",
    out_of_stock_text: "Out of stock",
    out_of_stock_design: "",
  },
  content: {
    collection: "402337759453",
    review_app_enable: true,
    review_app_type: "ali_reviews",
    review_app: {
      enable: true,
      app: "product_reviews", // "product_reviews" or "rivyo_reviews" or "loox_reviews""
    },
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
    sale: {
      enable: true,
      text: "Sale",
      design: "",
    },
    add_to_cart_text: "Add to cart",
  },
};
