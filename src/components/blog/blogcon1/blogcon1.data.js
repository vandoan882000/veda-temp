const data = {
  general_settings: {
    fixed: false,
    background_color_enable: true,
    color: "#E5E5E5",
    background_image_enable: true,
    image: "",
    size: "cover",
    overlay: "transparent",
  },
  heading: {
    text: "Blog",
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
    blog: "tuong",
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
        }
      ]
    },

    {
      type: "newsletter"
    }

  ]
};
