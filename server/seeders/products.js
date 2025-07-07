const Product = require("../models/Product");
const Category = require("../models/Category");

const createProducts = async () => {
  try {
    // Get all categories
    const categories = await Category.find({});

    const products = [];

    // 2024-25 Jerseys
    const jerseys2024 = categories.find(
      (cat) => cat.slug === "2024-25-jerseys"
    );
    if (jerseys2024) {
      products.push(
        {
          title: "Manchester United Home Jersey 2024-25",
          description:
            "Official Manchester United home jersey for the 2024-25 season. Made with premium materials for comfort and style.",
          price: 1999,
          originalPrice: 999,
          category: jerseys2024._id,
          images: [
            "https://futballgear.in/wp-content/uploads/2024/07/1cb59bb0-1.jpg",
            "https://futballgear.in/wp-content/uploads/2024/07/bfc47306.jpg",
            "https://futballgear.in/wp-content/uploads/2024/07/1e6dda81.jpg",
            "https://futballgear.in/wp-content/uploads/2024/07/9410eb04.jpg",
          ],
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Red", "White"],
          stock: 50,
          customizable: true,
          customizationPrice: 150,
          tags: ["manchester united", "premier league", "home jersey"],
        },
        {
          title: "Real Madrid Away Jersey 2024-25",
          description:
            "Official Real Madrid away jersey featuring the latest design and technology.",
          price: 1299,
          originalPrice: 899,
          category: jerseys2024._id,
          images: [
            "https://futballgear.in/wp-content/uploads/2024/08/5580f469-scaled.jpeg",
            "https://futballgear.in/wp-content/uploads/2024/08/a1389088-scaled.jpeg",
            "https://futballgear.in/wp-content/uploads/2024/08/c685aa98-scaled.jpeg",
            "https://futballgear.in/wp-content/uploads/2024/08/4a40b295-scaled.jpeg",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Orange"],
          stock: 15,
          customizable: true,
          customizationPrice: 150,
          tags: ["real madrid", "la liga", "away jersey"],
        },
        {
          title: "Barcelona Away Jersey 2024-25",
          description: "Barcelona away kit with unique design",
          price: 1299,
          category: jerseys2024._id,
          images: [
            "https://futballgear.in/wp-content/uploads/2024/08/d4a70626-1.jpg",
            "https://futballgear.in/wp-content/uploads/2024/08/2df73108-1.jpg",
            "https://futballgear.in/wp-content/uploads/2024/08/2df73108-1.jpg",
            "https://fulltimestore.in/cdn/shop/files/d1d0db16.jpg?v=1726570839&width=600",
          ],
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: ["Red", "Black"],
          stock: 40,
          customizable: true,
          customizationPrice: 150,
          tags: ["barcelona", "la liga", "third jersey"],
        },
        {
          title: "PSG Fourth Jersey 2024-25",
          description:
            "Paris Saint-Germain fourth jersey with flary design and premium quality.",
          price: 899,
          originalPrice: 1399,
          category: jerseys2024._id,
          images: [
            "https://futballgear.in/wp-content/uploads/2025/04/98c632b4.jpg",
            "https://futballgear.in/wp-content/uploads/2025/04/b55803cd.jpg",
            "https://futballgear.in/wp-content/uploads/2025/04/b44217f7.jpg",
            "https://futballgear.in/wp-content/uploads/2025/04/9d12297e.jpg",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Navy", "White"],
          stock: 30,
          customizable: true,
          customizationPrice: 500,
          tags: ["psg", "ligue 1", "home jersey"],
        },
        {
          title: "Liverpool Third Jersey 2024-25",
          description:
            "Liverpool FC third jersey with modern design and excellent fit.",
          price: 1039,
          category: jerseys2024._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/LiverpoolThird2024Fulltimestore.jpg?v=1723585338&width=600",
            "https://fulltimestore.in/cdn/shop/files/ba519c3f.jpg?v=1723585337&width=600",
            "https://fulltimestore.in/cdn/shop/files/a957f92c.jpg?v=1723585338&width=600",
            "https://fulltimestore.in/cdn/shop/files/b7e20a97.jpg?v=1723585338&width=600",
          ],
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["White"],
          stock: 45,
          customizable: true,
          customizationPrice: 150,
          tags: ["liverpool", "premier league", "third jersey"],
        }
      );
    }

    // Retro Jerseys
    const retroCategory = categories.find(
      (cat) => cat.slug === "retro-jerseys"
    );
    if (retroCategory) {
      products.push(
        {
          title: "Brazil 2002 Retro Jersey",
          description:
            "Iconic Brazil national team jersey from the legendary 2002 World Cup victory.",
          price: 2999,
          category: retroCategory._id,
          images: [
            "https://topfootball.in/wp-content/uploads/2024/11/Retro-2002-Brazil-Soccer-Jersey-Home-4.jpg",
            "https://topfootball.in/wp-content/uploads/2024/11/Retro-2002-Brazil-Soccer-Jersey-Home-2.jpg",
            "https://topfootball.in/wp-content/uploads/2024/11/Retro-2002-Brazil-Soccer-Jersey-Home-3.jpg",
            "https://fulltimestore.in/cdn/shop/products/09c561b3.jpg?v=1687685470&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Yellow", "Blue"],
          stock: 25,
          customizable: true,
          customizationPrice: 200,
          tags: ["brazil", "retro", "1970", "world cup"],
        },
        {
          title: "Manchester United 1998-99 Treble Jersey",
          description:
            "Classic Manchester United home jersey from the historic treble-winning season.",
          price: 1799,
          category: retroCategory._id,
          images: [
            "https://topfootball.in/wp-content/uploads/2023/02/WhatsApp-Image-2022-08-25-at-7.45.01-PM.jpeg.webp",
            "https://topfootball.in/wp-content/uploads/2023/02/WhatsApp-Image-2022-08-25-at-7.45.03-PM-1.jpeg.webp",
            "https://topfootball.in/wp-content/uploads/2023/02/WhatsApp-Image-2022-08-25-at-7.45.03-PM.jpeg.webp",
            "https://topfootball.in/wp-content/uploads/2023/02/WhatsApp-Image-2022-08-25-at-7.45.02-PM.jpeg",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Red", "White"],
          stock: 20,
          customizable: true,
          customizationPrice: 200,
          tags: ["manchester united", "retro", "1999", "treble"],
        },
        {
          title: "Barcelona 2009 Retro Jersey",
          description:
            "FC Barcelona home jersey from the 2009 season with classic design.",
          price: 1799,
          category: retroCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/f92cfe91.jpg?v=1702754808&width=600",
            "https://fulltimestore.in/cdn/shop/files/ed790d2f.jpg?v=1746048668&width=600",
            "https://fulltimestore.in/cdn/shop/files/9002ffe1.jpg?v=1746048668&width=600",
            "https://fulltimestore.in/cdn/shop/files/b8458739.jpg?v=1746048668&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Blue", "Red"],
          stock: 30,
          customizable: true,
          customizationPrice: 200,
          tags: ["barcelona", "retro", "2009"],
        },
        {
          title: "AC Milan 1998 Retro Jersey",
          description:
            "Classic AC Milan jersey from the golden era of the 1990s.",
          price: 2199,
          category: retroCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/ac_milan_1998-00_home_retro.jpg?v=1728418587&width=600",
            "https://fulltimestore.in/cdn/shop/files/602834ca.jpg?v=1728418587&width=600",
            "https://fulltimestore.in/cdn/shop/files/3a6370bf.jpg?v=1728418587&width=600",
            "https://fulltimestore.in/cdn/shop/files/542f433b.jpg?v=1728418587&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Red", "Black"],
          stock: 22,
          customizable: true,
          customizationPrice: 200,
          tags: ["ac milan", "retro", "1990s"],
        },
        {
          title: "Argentina 1986 World Cup Jersey",
          description:
            "Legendary Argentina national team jersey from the 1986 World Cup.",
          price: 1499,
          category: retroCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/products/fcbe5f89.jpg?v=1687686001&width=600",
            "https://fulltimestore.in/cdn/shop/products/d333a9e8.jpg?v=1687686001&width=600",
            "https://fulltimestore.in/cdn/shop/products/20b63efb.jpg?v=1687686001&width=600",
            "https://fulltimestore.in/cdn/shop/products/05c89cbd.jpg?v=1687686001&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Light Blue", "White"],
          stock: 18,
          customizable: true,
          customizationPrice: 200,
          tags: ["argentina", "retro", "1986", "world cup"],
        }
      );
    }

    // Anthem Jackets
    const anthemCategory = categories.find(
      (cat) => cat.slug === "anthem-jackets"
    );
    if (anthemCategory) {
      products.push(
        {
          title: "Real Madrid Anthem Jacket 2024",
          description:
            "Official Real Madrid anthem jacket for pre-match warmup.",
          price: 1999,
          category: anthemCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/realmadridanthemjacket.jpg?v=1735905053&width=600",
            "https://fulltimestore.in/cdn/shop/files/d2589e51.jpg?v=1735904984&width=600",
            "https://fulltimestore.in/cdn/shop/files/6ee5303b.jpg?v=1735904984&width=600",
            "https://fulltimestore.in/cdn/shop/files/3756f5ae.jpg?v=1735904984&width=600",
          ],
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Navy", "White"],
          stock: 20,
          tags: ["real madrid", "anthem jacket", "warmup"],
        },
        {
          title: "Barcelona Pre-Match Jacket",
          description:
            "Barcelona official pre-match jacket with modern design.",
          price: 1799,
          category: anthemCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/barcelona_anthem_jacket.jpg?v=1735594105&width=600",
            "https://fulltimestore.in/cdn/shop/files/241c7486.jpg?v=1735594105&width=600",
            "https://fulltimestore.in/cdn/shop/files/dc5343e4.jpg?v=1735593786&width=600",
            "https://fulltimestore.in/cdn/shop/files/5777fdec.jpg?v=1735594105&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Blue", "Red"],
          stock: 15,
          tags: ["barcelona", "anthem jacket", "pre-match"],
        },
        {
          title: "Manchester City Anthem Jacket",
          description:
            "Manchester City official anthem jacket with premium quality.",
          price: 2499,
          category: anthemCategory._id,
          images: [
            "https://static.wixstatic.com/media/3f13d8_68745fa4f7ab400ea58f9a4e32fedc5f~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3f13d8_68745fa4f7ab400ea58f9a4e32fedc5f~mv2.jpg",
            "https://static.wixstatic.com/media/3f13d8_109097013fb541469cb8172f57ca88ef~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3f13d8_109097013fb541469cb8172f57ca88ef~mv2.jpg",
            "https://static.wixstatic.com/media/3f13d8_f816dbbf14424d64b2e0cfdeae05494a~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3f13d8_f816dbbf14424d64b2e0cfdeae05494a~mv2.jpg",
            "https://static.wixstatic.com/media/3f13d8_a0c1c1601bf54005b36cd5ea7d755d0d~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3f13d8_a0c1c1601bf54005b36cd5ea7d755d0d~mv2.jpg",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Sky Blue", "Navy"],
          stock: 30,
          tags: ["manchester city", "anthem jacket"],
        },
        {
          title: "PSG Anthem Jacket 2024",
          description: "Paris Saint-Germain anthem jacket with elegant design.",
          price: 3499,
          category: anthemCategory._id,
          images: [
            "https://images.footballfanatics.com/paris-saint-germain/psg-x-jordan-wings-anthem-jacket-sail_ss5_p-202135244+pv-2+u-osthh17kp6kozq7ynulu+v-4gr3xu3hkb6aejh65cck.jpg?_hv=2&w=900",
            "https://images.footballfanatics.com/paris-saint-germain/psg-x-jordan-wings-anthem-jacket-sail_ss5_p-202135244+pv-3+u-osthh17kp6kozq7ynulu+v-liqztwrnl2lydug64nao.jpg?_hv=2&w=900",
            "https://images.footballfanatics.com/paris-saint-germain/psg-x-jordan-wings-anthem-jacket-sail_ss5_p-202135244+pv-5+u-osthh17kp6kozq7ynulu+v-ijcmatjyuuevjk7hwhyj.jpg?_hv=2&w=900",
            "https://images.footballfanatics.com/paris-saint-germain/psg-x-jordan-wings-anthem-jacket-sail_ss5_p-202135244+pv-9+u-osthh17kp6kozq7ynulu+v-n96tnm2yckvxyn8s9lbf.jpg?_hv=2&w=900",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Navy", "Red"],
          stock: 25,
          tags: ["psg", "anthem jacket", "paris"],
        },
        {
          title: "Germany Anthem Jacket",
          description: "Germany anthem jacket for true supporters.",
          price: 2899,
          category: anthemCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/germanywindbreaker.jpg?v=1733581716&width=600",
            "https://fulltimestore.in/cdn/shop/files/1cc0814c.jpg?v=1733581634&width=600",
            "https://fulltimestore.in/cdn/shop/files/4530fc3d.jpg?v=1733581634&width=600",
            "https://fulltimestore.in/cdn/shop/files/2fe50cca.jpg?v=1733581634&width=600",
          ],
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Red", "White", "Yellow", "Black"],
          stock: 38,
          tags: ["germany", "anthem jacket"],
        }
      );
    }

    // Full Sleeves Jerseys
    const fullSleeveCategory = categories.find(
      (cat) => cat.slug === "full-sleeves-jerseys"
    );
    if (fullSleeveCategory) {
      products.push(
        {
          title: "Manchester City Long Sleeve Home Jersey",
          description:
            "Manchester City home jersey with full sleeves for comfort.",
          price: 899,
          category: fullSleeveCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/Mancity2024fullsleevshome.png?v=1723587041&width=600",
            "https://fulltimestore.in/cdn/shop/files/31721702520ea2f9b65IMG1588.jpg?v=1723586994&width=600",
            "https://fulltimestore.in/cdn/shop/files/2172170252025375b5bIMG1587.jpg?v=1723586994&width=600",
            "https://fulltimestore.in/cdn/shop/files/817217025205ac66a4bIMG1594.jpg?v=1723586994&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Blue", "White"],
          stock: 32,
          customizable: true,
          customizationPrice: 150,
          tags: ["manchester city", "long sleeve", "home jersey"],
        },
        {
          title: "Barcelona Long Sleeve Away Jersey",
          description:
            "Barcelona away jersey with long sleeves and modern design.",
          price: 899,
          category: fullSleeveCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/barcelona_away_full_sleeves_2024-25.jpg?v=1730303923&width=600",
            "https://fulltimestore.in/cdn/shop/files/d3f69906b694d3cb.jpg?v=1730303780&width=600",
            "https://fulltimestore.in/cdn/shop/files/08538710d22e3689.jpg?v=1730303778&width=600",
            "https://fulltimestore.in/cdn/shop/files/f0c24ba9df196d58.jpg?v=1730303779&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black", "Blue"],
          stock: 28,
          customizable: true,
          customizationPrice: 150,
          tags: ["barcelona", "long sleeve", "away jersey"],
        },
        {
          title: "Real Madrid 2024-25 Full Sleeves Home Jersey",
          description: "Real Madrid home jersey with full sleeves.",
          price: 899,
          category: fullSleeveCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/realmadridhomefullsleeves.jpg?v=1721560460&width=600",
            "https://fulltimestore.in/cdn/shop/files/be4df6fb.jpg?v=1721560460&width=600",
            "https://fulltimestore.in/cdn/shop/files/9ca851a2.jpg?v=1721560460&width=600",
            "https://fulltimestore.in/cdn/shop/files/a2dca819.jpg?v=1721560460&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["White"],
          stock: 26,
          customizable: true,
          customizationPrice: 150,
          tags: ["real madrid", "long sleeve", "la liga"],
        },
        {
          title: "PSG Long Sleeve Fourth Jersey",
          description: "PSG third jersey with unique long sleeve design.",
          price: 799,
          category: fullSleeveCategory._id,
          images: [
            "https://fulltimestore.in/cdn/shop/files/psg_forth_full_sleeve.jpg?v=1743515259&width=600",
            "https://fulltimestore.in/cdn/shop/files/cf1a6868.jpg?v=1743515218&width=600",
            "https://fulltimestore.in/cdn/shop/files/290297d3.jpg?v=1743515205&width=600",
            "https://fulltimestore.in/cdn/shop/files/85935ad9.jpg?v=1743515218&width=600",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Navy"],
          stock: 24,
          customizable: true,
          customizationPrice: 150,
          tags: ["psg", "long sleeve", "fourth jersey"],
        },
        {
          title: "Manchester United LS Third Jersey",
          description: "Manchester United third jersey with long sleeves.",
          price: 799,
          category: fullSleeveCategory._id,
          images: [
            "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-third-shirt-2024-25-long-sleeve_ss5_p-200954468+pv-2+u-ii4qcfzueeejmavae8ap+v-kjro0noqh8kp2sjehfv3.jpg?_hv=2&w=900",
            "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-third-shirt-2024-25-long-sleeve_ss5_p-200954468+pv-3+u-ii4qcfzueeejmavae8ap+v-u1cp4aiipiwsdmjbnays.jpg?_hv=2&w=900",
            "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-third-shirt-2024-25-long-sleeve_ss5_p-200954468+pv-4+u-ii4qcfzueeejmavae8ap+v-qs2z9upfvjwnkkych3sn.jpg?_hv=2&w=900",
            "https://mufc-live.cdn.scayle.cloud/images/1b999cc0420ab54abca3898aba794133.jpg?brightness=1&width=576&height=768&quality=70&bg=ffffff",
          ],
          sizes: ["S", "M", "L", "XL"],
          colors: ["White", "Red", "Black"],
          stock: 30,
          customizable: true,
          customizationPrice: 150,
          tags: ["manchester united", "long sleeve", "away jersey"],
        }
      );
    }

    // Football Shoes
    const shoesCategory = categories.find(
      (cat) => cat.slug === "football-shoes"
    );
    if (shoesCategory) {
      products.push(
        {
          title: "Nike Mercurial Vapor 15 Elite",
          description:
            "The pitch is yours when you lace up in the Vapor 15 Elite.",
          price: 12999,
          originalPrice: 14999,
          category: shoesCategory._id,
          images: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6e254825-e316-4afe-bd7e-5cce856818bb/ZOOM+VAPOR+15+ELITE+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f1468b2-c132-4b73-9c93-684df07c33dd/ZOOM+VAPOR+15+ELITE+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8bd43208-6060-4eb5-acd2-c92f2b204b1f/ZOOM+VAPOR+15+ELITE+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1eccf9f0-5f13-478e-805b-f448a855195b/ZOOM+VAPOR+15+ELITE+FG.png",
          ],
          sizes: ["6", "7", "8", "9", "10", "11", "12"],
          colors: ["Crimson", "White"],
          stock: 20,
          tags: ["nike", "mercurial", "elite", "speed"],
        },
        {
          title: "Adidas Predator Elite Bellingham",
          description:
            "Dominate like Jude wearing adidas Predator x Bellingham",
          price: 27999,
          category: shoesCategory._id,
          images: [
            "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/687e163ccdbf46ebb3a6c76861557eaf_9366/Predator_Elite_Bellingham_Firm_Ground_Boots_Black_JI3380_01_00_standard.jpg",
            "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/58889fa8cdf54c22b740013e67548a00_9366/Predator_Elite_Bellingham_Firm_Ground_Boots_Black_JI3380_02_standard.jpg",
            "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/d62cbc456f054d23bf28a618ebc4feff_9366/Predator_Elite_Bellingham_Firm_Ground_Boots_Black_JI3380_41_detail.jpg",
            "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fcbcdf1d41ee4232a66f11e23737a8c2_9366/Predator_Elite_Bellingham_Firm_Ground_Boots_Black_JI3380_03_standard.jpg",
          ],
          sizes: ["6", "7", "8", "9", "10", "11"],
          colors: ["Gold", "Black"],
          stock: 18,
          tags: ["adidas", "predator", "accuracy", "control"],
        },
        {
          title: "Puma Future Ultimate GK",
          description: "Puma Future boots with innovative design for agility.",
          price: 10999,
          category: shoesCategory._id,
          images: [
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/107539/01/sv01/fnd/PNA/fmt/png/FUTURE-ULTIMATE-Firm-Ground/Artificial-Ground-Men's-Goalkeeper-Soccer-Cleats",
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/107539/01/fnd/PNA/fmt/png/FUTURE-ULTIMATE-Firm-Ground/Artificial-Ground-Men's-Goalkeeper-Soccer-Cleats",
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/107539/01/sv04/fnd/PNA/fmt/png/FUTURE-ULTIMATE-Firm-Ground/Artificial-Ground-Men's-Goalkeeper-Soccer-Cleats",
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/107539/01/sv02/fnd/PNA/fmt/png/FUTURE-ULTIMATE-Firm-Ground/Artificial-Ground-Men's-Goalkeeper-Soccer-Cleats",
          ],
          sizes: ["7", "8", "9", "10", "11", "12"],
          colors: ["Pink", "Black"],
          stock: 22,
          tags: ["puma", "future", "ultimate", "gk"],
        },
        {
          title: "Nike Phantom 6 Low Elite",
          description:
            "Nike Phantom boots for enhanced ball striking and control.",
          price: 23499,
          category: shoesCategory._id,
          images: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/86cec9e6-90fa-4f28-ac4e-11c8b5105509/PHANTOM+6+LOW+ELITE+LE+AG-PRO.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cac46501-daa6-403c-b241-55c88d6945eb/PHANTOM+6+LOW+ELITE+LE+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6f782e29-781f-4868-871a-d40375e39efb/PHANTOM+6+LOW+ELITE+LE+AG-PRO.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f3893ede-b49d-4c98-a152-ebab4b1204ee/PHANTOM+6+LOW+ELITE+LE+FG.png",
          ],
          sizes: ["6", "7", "8", "9", "10", "11"],
          colors: ["Green", "Black"],
          stock: 15,
          tags: ["nike", "phantom", "elite", "striking"],
        },
        {
          title: "Nike Mercurial Superfly 10 Elite",
          description: "Obsessed with speed? So are these boots.",
          price: 24999,
          category: shoesCategory._id,
          images: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f44164e-7f03-4f3f-befe-18febd425ec9/ZM+SUPERFLY+10+ELITE+FG+LV8.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/35f43433-c67e-4efe-9964-b0e12bcc0dd8/ZM+SUPERFLY+10+ELITE+FG+LV8.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1f853c4f-2a06-41b2-9210-b59c001b0082/ZM+SUPERFLY+10+ELITE+FG+LV8.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6da4aa18-8a15-4d35-976f-df6c0905197d/ZM+SUPERFLY+10+ELITE+FG+LV8.png",
          ],
          sizes: ["6", "7", "8", "9", "10", "11", "12"],
          colors: ["White", "Purple", "Blue"],
          stock: 25,
          tags: ["nike", "mercurial", "superfly", "elite"],
        },
        {
          title: "Nike Mercurial Vapor 16 Pro Kylian Mbappe",
          description:
            "Serious about your speed? A Pro boot is for those who, like Kylian Mbappé, want to push the pace all match long.",
          price: 26999,
          category: shoesCategory._id,
          images: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/140b85cf-b8ad-475a-bed9-5b0cae87f20b/ZM+VAPOR+16+PRO+KM+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f2d82f32-8af4-47c7-b70b-959a0b07a2c6/ZM+VAPOR+16+PRO+KM+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c9064cdf-5f77-45b6-9ef3-b2b9e5dd96c2/ZM+VAPOR+16+PRO+KM+FG.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0d075463-8faa-4e36-9e2b-b002bcf93578/ZM+VAPOR+16+PRO+KM+FG.png",
          ],
          sizes: ["6", "7", "8", "9", "10", "11", "12"],
          colors: ["White", "Purple"],
          stock: 25,
          tags: ["nike", "mercurial", "vapor", "mbappe"],
        }
      );
    }

    return products;
  } catch (error) {
    console.error("❌ Error creating products data:", error);
    throw error;
  }
};

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});

    // Create products
    const productsData = await createProducts();

    // Insert products
    const createdProducts = await Product.insertMany(productsData);
    console.log(`✅ Created ${createdProducts.length} products`);

    return createdProducts;
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    throw error;
  }
};

module.exports = { seedProducts, createProducts };
