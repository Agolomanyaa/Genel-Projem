// Bu dosya tüm ürün verilerini merkezi olarak tutar.
export const getProductsData = () => [
    // 1. Ürün
    {
        productId: 'product-1',
        title: "Men's Oversize Jean Shirt Black",
        category: 'Men',
        price: '16.48',
        oldPrice: '20.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/38c0ceaa-0b03-415c-8b7f-faae530b52a5/image_3840.webp',
        brand: 'Banny Jeans',
        productCode: 'B21-25021-ES',
        rating: 4.83,
        availability: 'In Stock',
        description: 'Classic cut, comfortable and stylish oversize jean shirt.',
        colors: ['#000000'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/38c0ceaa-0b03-415c-8b7f-faae530b52a5/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/969ad16a-3c9c-4a6c-bb90-3bfecb9f2c3f/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/06911373-ce1b-4f7d-a545-bcbd83c970e5/image_3840.webp'
        ],
        detailPrice: '16.48',
        detailOldPrice: '20.00',
        detailedDescription: [
            "Product Content: 100% Cotton", "Model's measurements: Height: 186cm Waist: 85cm Chest: 98cm Hips: 98cm, Weight: 79kg.", "The size worn by the model is M.", "Product Fit: Oversize, loose fit.", "Size S shirt shoulder-to-hem measurement is 76 cm.", "Does not contain Lycra.", "Does not stretch.", "Dropped shoulders and long sleeves.", "Fabric Information: 100% Cotton", "Fit Information: Oversize"
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 2. Ürün
    {
        productId: 'product-2',
        title: "Men's Oversize Jean Shirt Khaki",
        category: 'Men',
        price: '16.48',
        oldPrice: '20.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ff728341-c3bc-4ee4-b28d-863833d5537e/3840/b21-25021-eh-4.webp',
        brand: 'Banny Jeans',
        productCode: 'B21-25021-KH',
        rating: 4.7,
        availability: 'In Stock',
        description: 'Stylish and comfortable oversize khaki jean shirt.',
        colors: ['#8FBC8F'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ff728341-c3bc-4ee4-b28d-863833d5537e/3840/b21-25021-eh-4.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/8b4f6fd4-29ac-45c5-8cd3-58ad707a777b/3840/b21-25021-eh-7.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/8b149775-3717-4fcd-8515-30b02746abad/3840/b21-25021-eh-5.webp'
        ],
        detailPrice: '16.48',
        detailOldPrice: '20.00',
        detailedDescription: [
            "Product Content: 100% Cotton", "Model's measurements: Height: 186cm Waist: 85cm Chest: 98cm Hips: 98cm, Weight: 79kg.", "The size worn by the model is S.", "Product Fit: Oversize, loose fit.", "Size S shirt shoulder-to-hem measurement is 76 cm.", "Does not contain Lycra.", "Does not stretch.", "Dropped shoulders and long sleeves.", "Fabric Information: 100% Cotton", "Fit Information: Oversize"
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 3. Ürün
    {
      productId: 'product-3',
      title: "Men's Denim Overalls",
      category: 'Men',
      price: '25.76',
      oldPrice: '40.00',
      imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ad1e21f5-bf70-49ff-8295-ae9b43302f29/3840/2699-2.webp',
      brand: 'Denim Co.',
      productCode: 'DC-OVERALL-03',
      rating: 4.5,
      availability: 'In Stock',
      description: 'Slim fit denim overalls with side buttons and 5 pockets.',
      colors: ['#6495ED'],
      sizes: ['S', 'M', 'L', 'XL'],
      detailImages: [
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ad1e21f5-bf70-49ff-8295-ae9b43302f29/3840/2699-2.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/fbcb8c27-b437-4311-a8c5-7877b1531adc/3840/2699-1.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/f50f5901-1a19-44d9-8044-08eb0b606e77/3840/2699.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/fda61fb6-7a56-4e9e-bf64-7c39448aa1db/3840/2699-5.webp'
      ],
      detailPrice: '25.76',
      detailOldPrice: '40.00',
      detailedDescription: [
        "Fabric: 100% Cotton", "Model's measurements: Height: 186cm, Waist: 85cm, Chest: 98cm, Hips: 98cm, Weight: 79kg.", "Model is wearing size S.", "Fit: Slim Fit. Features side button closure.", "Total of 5 pockets.", "Button and zipper closure.", "Made from high-quality fabric.", "Care: Wash at max 30°C, do not bleach, do not tumble dry, iron at low temperature.", "Note: Colors may vary slightly due to lighting in studio photos.", "Fit Information: Slim Fit"
      ],
       sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 4. Ürün
    {
      productId: 'product-4',
      title: "Men's Straight Leg Jean Pants Blue",
      category: 'Men',
      price: '29.42',
      oldPrice: '30.00',
      imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/00bc99ff-ed27-40c7-b640-974552da427f/image_3840.webp',
      brand: 'Casual Denim',
      productCode: 'CD-STRGHT-04',
      rating: 4.2,
      availability: 'In Stock',
      description: 'Straight leg blue jeans with a flexible fabric.',
      colors: ['#4682B4'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      detailImages: [
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/00bc99ff-ed27-40c7-b640-974552da427f/image_3840.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/537dbc4e-d7d6-4f1f-be58-986513966005/image_3840.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ff38362b-349b-4ad4-a132-35d2bbc777d0/image_3840.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/1a7264a1-88ad-4eca-99d2-e300fc574dab/image_3840.webp'
      ],
      detailPrice: '29.42',
      detailOldPrice: '30.00',
      detailedDescription: [
        "Fabric: 81% Cotton, 16% Polyester, 3% Elastane. The pant fabric has a flexible structure.", "Total of 5 pockets.", "Button and zipper closure.", "Made from high-quality fabric.", "Care: Wash at max 30°C, do not bleach, do not tumble dry, iron at low temperature.", "Note: Colors may vary slightly due to lighting in studio photos.", "Fit Information: Straight Leg"
      ],
       sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 5. Ürün
    {
      productId: 'product-5',
      title: "Men's Skater Fit Jean Pants Ice Blue",
      category: 'Men',
      price: '29.42',
      oldPrice: '30.00',
      imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/eb77f57a-3e12-47d7-9f4d-eb4fb4b3a6d4/3840/bnny-24003-e-buz-mavi-3.webp',
      brand: 'Urban Skater',
      productCode: 'US-SKTFT-05',
      rating: 4.4,
      availability: 'In Stock',
      description: 'Comfortable skater fit jeans in ice blue, made from flexible denim.',
      colors: ['#ADD8E6'],
      sizes: ['S', 'M', 'L', 'XL'],
      detailImages: [
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/eb77f57a-3e12-47d7-9f4d-eb4fb4b3a6d4/3840/bnny-24003-e-buz-mavi-3.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/7b100860-4193-4fbb-95f5-35a8ba30f141/3840/bnny-24003-e-buz-mavi-7.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/2644bed3-a242-4a8b-aaee-6fb741c11b32/3840/bnny-24003-e-buz-mavi-18.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3b6902ea-46db-400b-ac66-d6bce68ff685/3840/bnny-24003-e-buz-mavi-8.webp'
      ],
      detailPrice: '29.42',
      detailOldPrice: '30.00',
      detailedDescription: [
        "Made from high-quality denim fabric.",
        "Features a sturdy, flexible fabric: 98% Cotton, 2% Elastane.",
        "Comfortable model with a wide, skater fit.",
        "High waist.",
        "Zipper closure.",
        "Size M measurements: Waist 43cm, Hips 58cm, Thigh 37cm, Leg opening 25cm, Inseam 72cm, Length 100cm. (Approx. 2cm difference between sizes)."
      ],
      sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 6. Ürün
    {
      productId: 'product-6',
      title: "Men's Polo Neck Tree Pattern 100% Cotton T-Shirt",
      category: 'Men',
      price: '9.24',
      oldPrice: '15.00',
      imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/44651322-5d3c-4fab-a314-cb0315f57607/900/e24002-yesil-3.webp',
      brand: 'Man',
      productCode: 'MAN-POLO-06',
      rating: 4.1,
      availability: 'In Stock',
      description: 'Regular fit polo t-shirt with tree pattern, 100% cotton.',
      colors: ['#228B22'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      detailImages: [
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/44651322-5d3c-4fab-a314-cb0315f57607/3840/e24002-yesil-3.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/58897a57-9849-4fe5-93c7-a40e8ddbe8de/3840/e24002-yesil.webp',
        'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/685ac570-9eb0-4012-8389-81bedfdfaaff/3840/e24002-yesil-5.webp'
      ],
      detailPrice: '9.24',
      detailOldPrice: '15.00',
      detailedDescription: [
        "Our t-shirt is made from 100% cotton.",
        "Available in different color options.",
        "Fit: Regular Fit.",
        "Features elasticated cuffs.",
        "You can choose your usual size.",
        "Shoulder-to-hem length is 72 cm.",
        "Model is wearing size L.",
        "Model measurements: Height: 187cm, Weight: 82kg.",
        "Fabric: 100% Cotton"
      ],
      sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 7. Ürün
    {
        productId: 'product-7',
        title: "Men's Crew Neck Basic T-Shirt Black",
        category: 'Men',
        price: '9.24',
        oldPrice: '15.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b8139956-1f9c-41c6-94c1-7262be45475c/900/1609-nvy-2.webp',
        brand: 'Men',
        productCode: 'MEN-BASIC-07',
        rating: 4.3,
        availability: 'In Stock',
        description: 'Basic crew neck t-shirt made from soft bamboo blend fabric.',
        colors: ['#000000'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b8139956-1f9c-41c6-94c1-7262be45475c/3840/1609-nvy-2.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/89fffdbc-b07b-4784-aa77-82aadfed6de1/3840/1609-nvy-1.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d81e783e-9e42-4d11-b986-a7658fc8bde8/3840/1609-nvy-7.webp'
        ],
        detailPrice: '9.24',
        detailOldPrice: '15.00',
        detailedDescription: [
            "Fabric: 92% Bamboo, 8% Elastane.",
            "Basic crew neck t-shirt.",
            "Soft and flexible fabric.",
            "Ideal for daily wear.",
            "Fit: Regular Fit"
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 8. Ürün
    {
        productId: 'product-8',
        title: "Men's Stretch Denim Jacket Blue",
        category: 'Men',
        price: '17.96',
        oldPrice: '22.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/79fd3697-bc65-4441-8d48-afbb8916f51e/3840/22p012-mavi-4.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-JCKT-08',
        rating: 4.5,
        availability: 'In Stock',
        description: 'Regular fit stretch denim jacket in blue.',
        colors: ['#4682B4'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/79fd3697-bc65-4441-8d48-afbb8916f51e/3840/22p012-mavi-4.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/06b7bb0d-1029-4188-a4f3-5ce195e388dd/3840/110750.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/f62a01df-9ebb-4ede-a1fc-64d24d7c0dcd/3840/110749.webp'
        ],
        detailPrice: '17.96',
        detailOldPrice: '22.00',
        detailedDescription: [
            "Fabric: 80.5% Cotton, 17% Polyester, 2.5% Elastane.",
            "Product Fit: Regular Fit.",
            "Highly flexible stretch product.",
            "Sample size shoulder-to-hem length is 70 cm.",
            "Wide size range available."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 9. Ürün (Fiyat Güncellendi)
    {
        productId: 'product-9',
        title: "Men's Regular Fit Jean Pants Black",
        category: 'Men',
        price: '29.42',
        oldPrice: '30.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/14ebe403-d208-4b42-8e63-083b37c27b09/3840/22038-rins-1.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-REGFIT-09',
        rating: 4.6,
        availability: 'In Stock',
        description: 'Regular fit black jeans with a comfortable stretch fabric.',
        colors: ['#000000'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/14ebe403-d208-4b42-8e63-083b37c27b09/3840/22038-rins-1.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/de7f3ee7-0408-4ac1-ac9e-5803a9419da4/3840/22038-rins-2.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b9b08e73-977c-40eb-8df9-047f1944afbd/3840/22038-rins-5.webp'
        ],
        detailPrice: '29.42',
        detailOldPrice: '30.00',
        detailedDescription: [
            "Fabric: 82% Cotton, 16% Polyester, 2% Elastane.",
            "Product Fit: Regular Fit.",
            "Comfortable fabric feel.",
            "Normal waist, straight cut.",
            "Button and zipper closure.",
            "Easy to style for daily life.",
            "Made from high-quality fabric.",
            "You can choose your usual size.",
            "Care: Wash at max 30°C, do not bleach, do not tumble dry, iron at low temperature.",
            "Note: Pant colors may vary slightly due to lighting in studio photos."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 10. Ürün (Son erkek ürünü)
    {
        productId: 'product-10',
        title: "Men's Stretch Straight Jean Pants",
        category: 'Men',
        price: '29.42',
        oldPrice: '30.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/84a22b3c-e5e6-4954-bea7-c7b190b396a7/3840/bw-f10063.webp',
        brand: 'Blue White',
        productCode: 'BW-STRGHT-10',
        rating: 4.7,
        availability: 'In Stock',
        description: 'Straight fit stretch jeans from Blue White.',
        colors: ['#ADD8E6'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/84a22b3c-e5e6-4954-bea7-c7b190b396a7/3840/bw-f10063.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/229a3b2a-abe6-440d-a0ff-b91ccaf86031/3840/bw-f10063-4-recovered.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3acb6d24-3d7a-436f-9cc7-015124e9d229/3840/bw-f10063-2.webp'
        ],
        detailPrice: '29.42',
        detailOldPrice: '30.00',
        detailedDescription: [
            "Made from high-quality denim fabric.",
            "Fabric: 98% Cotton, 2% Elastane (Stretch).",
            "Zipper closure.",
            "Product length: 105 cm.",
            "Leg opening width: 22 cm.",
            "Fit: Straight Fit."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp"
    },
    // 11. Ürün (İlk Kadın Ürünü)
    {
        productId: 'product-11',
        title: "Women's Oversize Jean Shirt Black",
        category: 'Women',
        price: '17.18',
        oldPrice: '21.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/40301e6e-96b6-418a-b919-da99f34c1628/900/692a7390.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WOSJ-11',
        rating: 4.8,
        availability: 'In Stock',
        description: 'Comfortable oversize jean shirt for women, 100% cotton.',
        colors: ['#000000'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/40301e6e-96b6-418a-b919-da99f34c1628/3840/692a7390.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/9a0f0362-f374-4048-8561-df4c47641881/3840/692a7400.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/978e3b92-7553-4791-b84a-3ae19eba316b/3840/692a7413.webp'
        ],
        detailPrice: '17.18',
        detailOldPrice: '21.00',
        detailedDescription: [
            "Product Content: 100% Cotton.",
            "Model's measurements: Height: 174cm, Chest: 92cm, Waist: 69cm, Hips: 90cm (Assumed), Weight: 58kg.",
            "Model is wearing size S.",
            "Product Fit: Oversize, loose fit.",
            "Size S shirt shoulder-to-hem measurement is 76 cm.",
            "Does not contain Lycra. Does not stretch.",
            "Dropped shoulders and long sleeves.",
            "Fabric Information: 100% Cotton."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 12. Ürün
    {
        productId: 'product-12',
        title: "Women's Oversize Jean Shirt Khaki",
        category: 'Women',
        price: '17.18',
        oldPrice: '21.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/656081b6-7d44-406a-a55c-4f7eade0cda5/3840/692a7468.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WOSJ-12',
        rating: 4.7,
        availability: 'In Stock',
        description: 'Comfortable oversize khaki jean shirt for women.',
        colors: ['#8FBC8F'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/656081b6-7d44-406a-a55c-4f7eade0cda5/3840/692a7468.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/fd07711e-74ca-45fc-8e6e-e53d72bf6796/3840/692a7448.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/22e1a688-f7ee-4286-902e-5e8cf88933e8/3840/692a7463.webp'
        ],
        detailPrice: '17.18',
        detailOldPrice: '21.00',
        detailedDescription: [
            "Product Content: 100% Cotton.",
            "Model's measurements: Height: 178cm, Chest: 90cm, Waist: 64cm, Hips: 94cm.",
            "Model is wearing size S.",
            "Product Fit: Oversize, loose fit.",
            "Size S shirt shoulder-to-hem measurement is 76 cm.",
            "Does not contain Lycra. Does not stretch.",
            "Dropped shoulders and long sleeves.",
            "Fabric Information: 100% Cotton."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 13. Ürün
    {
        productId: 'product-13',
        title: "Women's Jean Jacket with Pocket Detail",
        category: 'Women',
        price: '18.46',
        oldPrice: '23.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/7caa07c8-c226-407a-8a50-f5a603416f82/image_3840.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WJCKT-13',
        rating: 4.6,
        availability: 'In Stock',
        description: 'Regular fit stretch denim jacket with pocket details.',
        colors: ['#4682B4'],
        sizes: ['S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/7caa07c8-c226-407a-8a50-f5a603416f82/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/18c7de40-cfe3-4cad-8268-29183fdffeaa/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/2fc7f2f0-901d-4c2b-879e-7a6a8ab866f3/image_3840.webp'
        ],
        detailPrice: '18.46',
        detailOldPrice: '23.00',
        detailedDescription: [
            "Fabric: 98% Cotton, 2% Elastane.",
            "Regular Fit.",
            "Highly flexible stretch fabric, offers ease of movement.",
            "Medium thickness, comfortable fabric.",
            "Total of 4 active pockets (chest and side).",
            "Model's measurements: Height: 1.73m, Waist: 64cm, Chest: 89cm, Hips: 93cm. Sample Size: 'S'.",
            "Shoulder-to-hem length: 52 cm.",
            "Ideal comfortable cut for daily use. True to size.",
            "Suitable for stylish & casual combinations.",
            "Button closure.",
            "Care: Wash at max 30°C, do not bleach, do not tumble dry, iron at low temperature.",
            "Note: Jacket colors may vary slightly due to lighting in studio photos."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 14. Ürün
    {
        productId: 'product-14',
        title: "Women's High Waist Wide Leg Jean Pants",
        category: 'Women',
        price: '29.42',
        oldPrice: '30.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b28dad06-4b5d-4762-9db7-4339b317811f/3840/bw-23001-13.webp',
        brand: 'Blue White',
        productCode: 'BW-WWIDE-14',
        rating: 4.9,
        availability: 'In Stock',
        description: 'Stylish and comfortable high waist, wide leg jeans.',
        colors: ['#ADD8E6'],
        sizes: ['S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b28dad06-4b5d-4762-9db7-4339b317811f/3840/bw-23001-13.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/a08110df-b816-435c-a4a2-c9d1f8fe8ec4/3840/bw-23001-6.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/c2bd9a5b-e1db-4055-bfeb-f430ea675e51/3840/bw-23001-1.webp'
        ],
        detailPrice: '29.42',
        detailOldPrice: '30.00',
        detailedDescription: [
            "Offers a stylish and comfortable look.",
            "Made using 100% cotton fabric, providing a soft and comfortable touch to your skin.",
            "High waist and wide leg design make your legs look longer and offer freedom of movement.",
            "Product length: 112 cm.",
            "Leg opening width: 35 cm.",
            "Fabric Information: 100% Cotton.",
            "Fit Information: Wide Leg."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 15. Ürün
    {
        productId: 'product-15',
        title: "Women's Cargo Pocket Jean Pants Blue",
        category: 'Women',
        price: '29.42',
        oldPrice: '30.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b8c1535e-4a24-4079-901e-114d45809472/3840/23w046-5.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WCARGO-15',
        rating: 4.7,
        availability: 'In Stock',
        description: 'Baggy fit blue jeans with functional cargo pockets.',
        colors: ['#4682B4'],
        sizes: ['S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b8c1535e-4a24-4079-901e-114d45809472/3840/23w046-5.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/613a5357-7ad3-423c-9532-9a4ce6c0ec7f/3840/23w046-10.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/c58b7e33-9f01-4fab-b446-ede1d2dd0ca6/3840/23w046-14.webp'
        ],
        detailPrice: '29.42',
        detailOldPrice: '30.00',
        detailedDescription: [
            "Product Fabric: 100% Cotton.",
            "Product Fit: Baggy.",
            "Features a sturdy fabric structure.",
            "High waist.",
            "Product waist measurement: 72 cm.",
            "Sample size length: 110 cm.",
            "Total of 9 functional pockets.",
            "Button and zipper closure.",
            "Made from high-quality fabric.",
            "You can choose your usual size.",
            "Care: Wash at max 30°C, do not bleach, do not tumble dry, iron at low temperature.",
            "Note: Pant colors may vary slightly due to lighting in studio photos."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 16. Ürün
    {
        productId: 'product-16',
        title: "Women's Batwing Sleeve Jean Jumpsuit Rins",
        category: 'Women',
        price: '25.76',
        oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/4eaedf98-263e-4dfc-b4f9-28e60f566930/3840/bnny-w20-533-16.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WJUMP-16',
        rating: 4.5,
        availability: 'In Stock',
        description: 'Regular fit batwing sleeve denim jumpsuit with removable belt.',
        colors: ['#191970'],
        sizes: ['S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/4eaedf98-263e-4dfc-b4f9-28e60f566930/3840/bnny-w20-533-16.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d1ab3c9e-d2e4-40ef-8af5-e3e1dc49030a/3840/bnny-w20-533-15.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/5769d021-1558-4d1f-9961-d72d7958281d/3840/bnny-w20-533-5.webp'
        ],
        detailPrice: '25.76',
        detailOldPrice: '40.00',
        detailedDescription: [
            "Made from high-quality denim fabric: 100% Cotton.",
            "Not stretch.",
            "Total of 3 pockets.",
            "Belted (removable).",
            "Product length: 144 cm, Waist-to-hem length: 102 cm.",
            "Leg opening width: 17 cm.",
            "Fit: Regular Fit."
        ],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 17. Ürün
    {
        productId: 'product-17',
        title: "Women's Oversize Jean Jumpsuit Blue",
        category: 'Women',
        price: '37.42',
        oldPrice: '45.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/5b80060e-1133-4f6c-8e3a-ecce48a4e5a3/3840/a8002-620.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WJUMPOV-17',
        rating: 4.6,
        availability: 'In Stock',
        description: 'Oversize fit denim jumpsuit in blue.',
        colors: ['#4682B4'],
        sizes: ['XS', 'S', 'M', 'L'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/5b80060e-1133-4f6c-8e3a-ecce48a4e5a3/3840/a8002-620.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/bb8b1f2e-6ab8-4e75-9dc6-0b1f9aff295c/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/4b599579-26c1-4f43-8b65-5fd9ecccdd3f/image_3840.webp'
        ],
        detailPrice: '37.42',
        detailOldPrice: '45.00',
        detailedDescription: ["Fabric: 100% Cotton (Assumed).", "Fit: Oversize."],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 18. Ürün
    {
        productId: 'product-18',
        title: "Women's Ethnic Pattern Belted Soft Texture Jean Jumpsuit Blue",
        category: 'Women',
        price: '25.76',
        oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/bc365e31-1aa8-414f-bcc6-ae7e5cb35598/image_3840.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WJUMPET-18',
        rating: 4.4,
        availability: 'In Stock',
        description: 'Soft denim jumpsuit with an ethnic pattern belt.',
        colors: ['#6495ED'],
        sizes: ['S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/bc365e31-1aa8-414f-bcc6-ae7e5cb35598/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/e6eb8d44-f88a-4042-9d20-ee227900806a/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/405714de-bcd9-418f-b247-8e4af149d36d/image_3840.webp'
        ],
        detailPrice: '25.76',
        detailOldPrice: '40.00',
        detailedDescription: ["Fabric: 100% Cotton (Assumed).", "Fit: Regular Fit (Assumed).", "Features a soft texture and ethnic pattern belt."],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 19. Ürün
    {
        productId: 'product-19',
        title: "Women's Trimmed Oversize Jean Jacket Light Blue",
        category: 'Women',
        price: '16.48',
        oldPrice: '20.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b0182123-ec87-44a0-ab94-4e22eedcd32b/image_3840.webp',
        brand: 'Blue White',
        productCode: 'BW-WJCKTOV-19',
        rating: 4.7,
        availability: 'In Stock',
        description: 'Oversize light blue jean jacket with stylish trim details.',
        colors: ['#ADD8E6'],
        sizes: ['XS', 'S', 'M', 'L'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/b0182123-ec87-44a0-ab94-4e22eedcd32b/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d0a8ee3a-ede7-49af-ba92-6e37d30c1a28/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/87701c9f-aefb-477a-8d8c-ecda016aebc2/image_3840.webp'
        ],
        detailPrice: '16.48',
        detailOldPrice: '20.00',
        detailedDescription: ["Fabric: 98% Cotton, 2% Elastane (Assumed).", "Fit: Oversize.", "Features unique trim details."],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 20. Ürün
    {
        productId: 'product-20',
        title: "Women's High Waist Skater Fit Jean Pants Ice Blue",
        category: 'Women',
        price: '29.42',
        oldPrice: '30.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/fd20c9c3-121c-45e0-bde3-791cf94e2a09/3840/bnny-24003-k-11.webp',
        brand: 'Banny Jeans',
        productCode: 'BJ-WSKTR-20',
        rating: 4.8,
        availability: 'In Stock',
        description: 'High waist skater fit jeans in ice blue.',
        colors: ['#ADD8E6'],
        sizes: ['S', 'M', 'L', 'XL'],
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/fd20c9c3-121c-45e0-bde3-791cf94e2a09/3840/bnny-24003-k-11.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/92b84134-f5d1-4ba2-b552-8bce8b0f3a0c/3840/bnny-24003-k-23.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/80052ecd-7152-4e0f-a47b-cd99826630dd/3840/bnny-24003-k-18.webp'
        ],
        detailPrice: '29.42',
        detailOldPrice: '30.00',
        detailedDescription: ["Fabric: 98% Cotton, 2% Elastane (Assumed).", "Fit: Skater Fit.", "High waist design."],
        sizeChartUrl: "https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp"
    },
    // 21. Ürün
    {
        productId: 'product-21',
        title: "Cotton Box Double Satin Duvet Cover Set Luster Beige",
        category: 'Home & Living', price: '57.72', oldPrice: '65.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/6be81ffa-c38c-4a56-abd5-9c4de25673a5/image_3840.webp',
        brand: 'Cotton Box', productCode: 'CB-SATIN-LUSBE', rating: 4.9, availability: 'In Stock',
        description: 'Double size 100% cotton satin duvet cover set.', colors: ['#F5F5DC'], sizes: ['Double'], // Beige
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/6be81ffa-c38c-4a56-abd5-9c4de25673a5/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3c209b1e-3e33-489e-9e8f-4fd3c36f426b/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/f97478f7-62f0-437a-943c-750ffa63817a/image_3840.webp'],
        detailPrice: '57.72', detailOldPrice: '65.00',
        detailedDescription: ["Duvet Cover: 200x220 cm", "Sheet: 240x260 cm", "4 Pillowcases: 50x70 cm", "Product Features:", "83 Thread Count", "Material: 100% Cotton Satin", "Washing and Care Recommendations:", "Wash at 30 degrees warm water, inside out.", "Do not use bleach.", "Wash at low heat."]
    },
    // 22. Ürün
    {
        productId: 'product-22',
        title: "Cotton Box Modern Double Duvet Cover Set Giorno Grey",
        category: 'Home & Living', price: '57.72', oldPrice: '65.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3a1ac4b4-3a15-456d-b93f-8fa43e46c6f6/image_3840.webp',
        brand: 'Cotton Box', productCode: 'CB-MOD-GIOGRY', rating: 4.8, availability: 'In Stock',
        description: 'Modern double size 100% cotton duvet cover set.', colors: ['#808080'], sizes: ['Double'], // Grey
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3a1ac4b4-3a15-456d-b93f-8fa43e46c6f6/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ccbf42e2-7044-457d-8373-5d81b54340a2/image_3840.webp'],
        detailPrice: '57.72', detailOldPrice: '65.00',
        detailedDescription: ["Product Dimensions:", "Duvet Cover: 200x220 cm", "Sheet: 240x260 cm", "2 Pillowcases: 50x70 cm", "Product Features:", "Fabric: 30/1 57 Thread Ranforce 100% Cotton, Reactive Print & Solid Dye", "Washing and Care Recommendations:", "Wash at 30 degrees warm water, inside out.", "Do not use bleach.", "Wash at low heat."]
    },
    // 23. Ürün
    {
        productId: 'product-23',
        title: "Cotton Box Petite Double Duvet Cover Set June Mint",
        category: 'Home & Living', price: '57.72', oldPrice: '65.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/397483d6-e061-412f-8c81-39b436d8410c/image_3840.webp',
        brand: 'Cotton Box', productCode: 'CB-PET-JUNMIN', rating: 4.7, availability: 'In Stock',
        description: 'Petite double size 100% cotton duvet cover set.', colors: ['#98FB98'], sizes: ['Double'], // PaleGreen (Mint)
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/397483d6-e061-412f-8c81-39b436d8410c/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/df4741d1-5f88-4c70-a62f-28d01706585a/image_3840.webp'],
        detailPrice: '57.72', detailOldPrice: '65.00',
        detailedDescription: ["Product Dimensions:", "Duvet Cover: 200x220 cm", "Sheet: 240x260 cm", "2 Pillowcases: 50x70 cm", "Product Features:", "Fabric: 30/1 57 Thread", "Material: 100% Cotton Pigment Print", "Washing and Care Recommendations:", "Wash at 30 degrees warm water, inside out.", "Do not use bleach.", "Wash at low heat."]
    },
     // 24. Ürün
    {
        productId: 'product-24',
        title: "Cotton Box Double Satin Duvet Cover Set Owen Beige",
        category: 'Home & Living', price: '57.72', oldPrice: '65.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d77a0060-9293-4e04-b158-6f98e70cbaa0/image_3840.webp',
        brand: 'Cotton Box', productCode: 'CB-SATIN-OWEBEI', rating: 4.9, availability: 'In Stock',
        description: 'Double size 100% cotton satin duvet cover set.', colors: ['#F5F5DC'], sizes: ['Double'], // Beige
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d77a0060-9293-4e04-b158-6f98e70cbaa0/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/854d97dc-ff5d-4e10-abf6-51c4c1844904/image_3840.webp'],
        detailPrice: '57.72', detailOldPrice: '65.00',
        detailedDescription: ["Duvet Cover: 200x220 cm", "Sheet: 240x260 cm", "4 Pillowcases: 50x70 cm", "Product Features:", "83 Thread Count", "Material: 100% Cotton Satin", "Washing and Care Recommendations:", "Wash at 30 degrees warm water, inside out.", "Do not use bleach.", "Wash at low heat."]
    },
    // 25. Ürün
    {
        productId: 'product-25',
        title: "Cotton Box Minimal Double Duvet Cover Set Stew Blue",
        category: 'Home & Living', price: '57.72', oldPrice: '65.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/01292b52-60e0-4771-8381-05cad6f96fa6/image_3840.webp',
        brand: 'Cotton Box', productCode: 'CB-MIN-STEBLU', rating: 4.6, availability: 'In Stock',
        description: 'Minimal double size 100% cotton Ranforce duvet cover set.', colors: ['#4682B4'], sizes: ['Double'], // Steel Blue
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/01292b52-60e0-4771-8381-05cad6f96fa6/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/6323eace-33bc-4ddd-84a2-7e0078f9c8ae/image_3840.webp'],
        detailPrice: '57.72', detailOldPrice: '65.00',
        detailedDescription: ["Product Dimensions:", "Duvet Cover: 200x220 cm", "Sheet: 240x260 cm", "2 Pillowcases: 50x70 cm", "Product Features:", "Fabric: 30/1 57 Thread Ranforce 100% Cotton", "Washing and Care Recommendations:", "Wash at 30 degrees warm water, inside out.", "Do not use bleach.", "Wash at low heat."]
    },
    // 26. Ürün
    {
        productId: 'product-26',
        title: "Cotton Box Palace Satin Double Duvet Cover Set Togay Anthracite",
        category: 'Home & Living', price: '64.72', oldPrice: '72.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ce3fc248-e887-4b31-8e92-9bd39200d70f/image_3840.webp',
        brand: 'Cotton Box', productCode: 'CB-PALSAT-TOGANT', rating: 5.0, availability: 'In Stock',
        description: 'Palace double size 100% cotton satin duvet cover set.', colors: ['#2F4F4F'], sizes: ['Double'], // DarkSlateGray (Anthracite)
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ce3fc248-e887-4b31-8e92-9bd39200d70f/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/8cda2c30-27e6-430c-ab77-775ee69c245c/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/54ae2bc2-445b-4601-a534-1743ac91b96b/image_3840.webp'],
        detailPrice: '64.72', detailOldPrice: '72.00',
        detailedDescription: ["Duvet Cover: 200x220 cm", "Sheet: 240x260 cm", "4 Pillowcases: 50x70 cm", "Product Features:", "120 Thread Count", "Material: 100% Cotton Satin", "Washing and Care Recommendations:", "Wash at 30 degrees warm water, inside out.", "Do not use bleach.", "Wash at low heat."]
    },
    // 27. Ürün
    {
        productId: 'product-27',
        title: "Depa H2o Borosilicate Glass Bottle Vacuum Lid Black 1000ML",
        category: 'Home & Living', price: '5.76', oldPrice: '10.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/92cc28e2-6801-4c14-8b4b-2f277d4742fe/image_3840.webp',
        brand: 'Depa', productCode: 'DEP-H2O-BLK1L', rating: 4.5, availability: 'In Stock',
        description: 'Heat-resistant borosilicate glass water bottle with vacuum lid.', colors: ['#000000', '#FFFFFF'], sizes: ['1000ML'], // Black Lid, Clear Glass
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/92cc28e2-6801-4c14-8b4b-2f277d4742fe/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/07adbe97-f1be-4dad-afc9-d3cffba6621d/image_3840.webp'],
        detailPrice: '5.76', detailOldPrice: '10.00',
        detailedDescription: ["Heat-resistant structure and stylish design, always with you.", "Made of glass material.", "Does not cause mold or odor.", "Easy to clean.", "Dishwasher safe.", "BPA-free, suitable for food contact.", "Height: 25 cm", "Volume: 1 Lt", "Contact us immediately if there is a problem with your purchased products.", "Return Conditions: Products must be returned wrapped in bubble wrap, boxed, and with intact packaging as received. Otherwise, returns will not be accepted."]
    },
    // 28. Ürün
    {
        productId: 'product-28',
        title: "Depa Set of 2 Olive Oil/Liquid Oil Bottles with Bamboo Stand",
        category: 'Home & Living', price: '5.76', oldPrice: '10.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/720f7b45-c9f4-4436-8137-ab8c4044ef1a/image_3840.webp',
        brand: 'Depa', productCode: 'DEP-OILSET-BAM', rating: 4.6, availability: 'In Stock',
        description: 'Set of 2 non-drip 750ml glass oil bottles with bamboo stand.', colors: ['#FFFFFF', '#DEB887'], sizes: ['Set'], // Clear Glass, Bamboo
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/720f7b45-c9f4-4436-8137-ab8c4044ef1a/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/9e6a280e-8c80-4d02-8bef-2c603ee4f158/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d9bbdd3a-e856-4b0d-b273-ce36c578c2b2/image_3840.webp'],
        detailPrice: '5.76', detailOldPrice: '10.00',
        detailedDescription: ["Made of glass.", "Ideal for storing liquid oil and varieties.", "Dishwasher safe without the cap.", "Bottle height: 29 cm", "Consists of 2 x 750 ml Oil Bottles and 1 Bamboo Stand.", "Ews Kitchenware aims to serve its customers with practical, sturdy, and long-lasting kitchen utensils.", "Contact us immediately if there is a problem with your purchased product.", "Return Conditions: Products must be returned wrapped in bubble wrap, boxed, and with intact packaging as received. Otherwise, returns will not be accepted."]
    },
    // 29. Ürün
    {
        productId: 'product-29',
        title: "Depa Set of 9 Glass Jars with Bamboo Vacuum Lid (3x1.3L, 3x0.8L, 3x0.5L)",
        category: 'Home & Living', price: '25.76', oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/27fa85d7-a0c0-4df0-98e7-5786994e2aa9/image_3840.webp',
        brand: 'Depa', productCode: 'DEP-JARSET9-BAM', rating: 4.8, availability: 'In Stock',
        description: 'Set of 9 borosilicate glass jars with vacuum bamboo lids.', colors: ['#FFFFFF', '#DEB887'], sizes: ['Set'], // Clear Glass, Bamboo
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/27fa85d7-a0c0-4df0-98e7-5786994e2aa9/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d21c2426-94e5-49da-858a-d5f457012129/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/8acbd46d-3361-4fbc-978e-8b02568b03ab/image_3840.webp'],
        detailPrice: '25.76', detailOldPrice: '40.00',
        detailedDescription: ["Borosilicate glass jars, known for their 100% lead-free and impact-resistant structure, are the healthiest tool for storing legumes and various foods.", "Bamboo lids that vacuum the air inside the jar prevent insects in legumes and foods.", "Jars are dishwasher safe.", "Washing bamboo lids in the dishwasher is not recommended.", "Ews Kitchenware aims to serve its customers with practical, sturdy, and long-lasting kitchen utensils.", "Contact us immediately if there is a problem with your purchased product.", "Return Conditions: Products must be returned wrapped in bubble wrap, boxed, and with intact packaging as received. Otherwise, returns will not be accepted."]
    },
    // 30. Ürün
    {
        productId: 'product-30',
        title: "Depa 12-Piece Spice Set with Spoons & Stand",
        category: 'Home & Living', price: '16.48', oldPrice: '20.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d32724b0-e998-4d19-bf77-a6b17c7264d4/image_3840.webp',
        brand: 'Depa', productCode: 'DEP-SPICESET-12', rating: 4.4, availability: 'In Stock',
        description: '12-piece spice jar set with spoons and a stand.', colors: ['#FFFFFF', '#C0C0C0'], sizes: ['Set'], // Clear Glass, Silver
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d32724b0-e998-4d19-bf77-a6b17c7264d4/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/1481857a-1150-4df8-aad6-09c5503dfac3/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/887e3bb7-6eb3-49bc-a83c-7c592a1d2303/image_3840.webp'],
        detailPrice: '16.48', detailOldPrice: '20.00',
        detailedDescription: ["Stylish and practical 12-piece spice set.", "Includes jars, spoons, and a stand.", "Keeps your spices organized and accessible."] // Placeholder details
    },
    // 31. Ürün
    {
        productId: 'product-31',
        title: "Depa 18-Piece Baroque Round Jar Set (6x2L, 6x1L, 6x0.5L)",
        category: 'Home & Living', price: '16.48', oldPrice: '20.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3aaa71b1-33c2-4218-8181-978929c34ca8/image_3840.webp',
        brand: 'Depa', productCode: 'DEP-JARSET18-BAR', rating: 4.7, availability: 'In Stock',
        description: 'Set of 18 acrylic storage jars in 3 sizes.', colors: ['#FFFFFF'], sizes: ['Set'], // Clear with pattern
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/3aaa71b1-33c2-4218-8181-978929c34ca8/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/e3d68acc-8177-4d24-b3e1-b88694316196/image_3840.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/45c5cdf2-4044-4fc3-8801-81ed238b20cf/image_3840.webp'],
        detailPrice: '16.48', detailOldPrice: '20.00',
        detailedDescription: ["Aesthetic acrylic jar set consisting of 6 pieces each of 3 different sizes, ideal for storing groceries or any product you want to store.", "PRODUCT INFO SIZE 2: W: 8 CM L: 8 CM H: 11.5 CM VOL: 500 ML", "PRODUCT INFO SIZE 3: W: 10 CM L: 10 CM H: 14.5 CM VOL: 1000 ML", "PRODUCT INFO SIZE 4: W: 12.5 CM L: 12.5 CM H: 18 CM VOL: 2000 ML", "Ews Kitchenware aims to serve its customers with practical, sturdy, and long-lasting acrylic kitchen utensils.", "Contact us immediately if there is a problem with your purchased products.", "Return Conditions: Products must be returned wrapped in bubble wrap, boxed, and with intact packaging as received. Otherwise, returns will not be accepted."]
    },
     // 32. Ürün
    {
        productId: 'product-32',
        title: "Cotton Box Pera Grey 8-Piece Linen Tablecloth Set",
        category: 'Home & Living', price: '25.76', oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ab32b9aa-da34-40c1-a5bc-fdef1c02143b/3840/24905-cotton-box-pera-beyaz-8-parca-keten-masa-ortusu-14667.webp', // Image is actually white, using grey placeholder
        brand: 'Cotton Box', productCode: 'CB-TABLE-PERAGRY', rating: 4.6, availability: 'In Stock',
        description: '8-piece grey linen blend tablecloth set.', colors: ['#808080'], sizes: ['Set'], // Grey
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/ab32b9aa-da34-40c1-a5bc-fdef1c02143b/3840/24905-cotton-box-pera-beyaz-8-parca-keten-masa-ortusu-14667.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/cb6a7c57-65af-4abb-a405-691fb85b9fc1/3840/24906-cotton-box-pera-beyaz-8-parca-keten-masa-ortusu-14668.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/21726d40-c1dd-40b4-9591-4f1cdc2875fd/3840/24908-cotton-box-pera-beyaz-8-parca-keten-masa-ortusu-14670.webp'],
        detailPrice: '25.76', detailOldPrice: '40.00',
        detailedDescription: ["Tablecloth: 175x240 cm", "Runner: 40x140 cm", "Napkins: 40x40 cm (6 Pieces)", "Fabric: 90% Polyester - 10% Cotton"]
    },
    // 33. Ürün
    {
        productId: 'product-33',
        title: "Cotton Box Pera White 8-Piece Linen Tablecloth Set",
        category: 'Home & Living', price: '25.76', oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/eb598542-6cee-4eff-9a6a-ce0e296bb0eb/3840/24901-cotton-box-pera-toprak-8-parca-keten-masa-ortusu-14663.webp', // Image is actually earth tone, using white placeholder
        brand: 'Cotton Box', productCode: 'CB-TABLE-PERAWHT', rating: 4.7, availability: 'In Stock',
        description: '8-piece white linen blend tablecloth set.', colors: ['#FFFFFF'], sizes: ['Set'], // White
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/eb598542-6cee-4eff-9a6a-ce0e296bb0eb/3840/24901-cotton-box-pera-toprak-8-parca-keten-masa-ortusu-14663.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/fa396749-2f71-44f0-b988-f412e6b5dd95/3840/24903-cotton-box-pera-toprak-8-parca-keten-masa-ortusu-14665.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/030bbc6e-c14a-4ba9-8c18-ac0eb8cd0930/3840/24904-cotton-box-pera-toprak-8-parca-keten-masa-ortusu-14666.webp'],
        detailPrice: '25.76', detailOldPrice: '40.00',
        detailedDescription: ["Tablecloth: 175x240 cm", "Runner: 40x140 cm", "Napkins: 40x40 cm (6 Pieces)", "Fabric: 90% Polyester - 10% Cotton"]
    },
    // 34. Ürün
    {
        productId: 'product-34',
        title: "Cotton Box Pera Ecru 8-Piece Linen Tablecloth Set",
        category: 'Home & Living', price: '25.76', oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/a11f20b8-77ae-4ad0-aebb-0c8faa6adda9/3840/24892-anna-karina-26-parca-masa-ortusu-seti-bahar-murdum-14652.webp', // Image is actually plum, using ecru placeholder
        brand: 'Cotton Box', productCode: 'CB-TABLE-PERAECR', rating: 4.8, availability: 'In Stock',
        description: '8-piece ecru linen blend tablecloth set.', colors: ['#C2B280'], sizes: ['Set'], // Ecru
        detailImages: ['https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/a11f20b8-77ae-4ad0-aebb-0c8faa6adda9/3840/24892-anna-karina-26-parca-masa-ortusu-seti-bahar-murdum-14652.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/8c457884-54dc-4d72-a58b-b4163e8552b4/3840/24893-anna-karina-26-parca-masa-ortusu-seti-bahar-murdum-14653.webp', 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/d8a64339-d1ca-4d58-b727-ce0ca7542f71/3840/24896-anna-karina-26-parca-masa-ortusu-seti-bahar-murdum-14656.webp'],
        detailPrice: '25.76', detailOldPrice: '40.00',
        detailedDescription: ["Tablecloth: 175x240 cm", "Runner: 40x140 cm", "Napkins: 40x40 cm (6 Pieces)", "Fabric: 90% Polyester - 10% Cotton"]
    },
    // 35. Ürün (Son Home & Living ürünü)
    {
        productId: 'product-35',
        title: "Cotton Box Antique Jasmine Grey Linen Tablecloth",
        category: 'Home & Living',
        price: '25.76',
        oldPrice: '40.00',
        imageUrl: 'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/4db18bda-4afa-4bc6-9e4e-491572fdbc12/image_3840.webp',
        brand: 'Cotton Box',
        productCode: 'CB-TABLE-ANTJASGRY', // Placeholder
        rating: 4.5, // Placeholder
        availability: 'In Stock', // Placeholder
        description: 'Antique Jasmine grey linen blend tablecloth set.', // Kısa açıklama
        colors: ['#808080'], // Grey
        sizes: ['Set'], // Placeholder size for potential filtering
        detailImages: [
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/4db18bda-4afa-4bc6-9e4e-491572fdbc12/image_3840.webp',
            'https://cdn.myikas.com/images/41c3d708-7e1f-44e8-8f55-8a3be5a9be11/66fe6ea9-5394-44cd-814e-36760dd7a4da/image_3840.webp'
        ],
        detailPrice: '25.76',
        detailOldPrice: '40.00',
        detailedDescription: [
            "Tablecloth: 155x160 cm",
            "Runner: 35x130 cm",
            "Fabric: 100% Polyester"
        ]
        // sizeChartUrl alanı bu üründe yok
    }
]; 