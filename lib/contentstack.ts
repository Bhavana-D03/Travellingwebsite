import Contentstack from "contentstack";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT || "development";

// --- MOCK TRAVEL DATA ---
const MOCK_DESTINATIONS = [
  {
    uid: "dest-kerala",
    name: "Kerala Backwaters",
    profile_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>Known as 'God's Own Country', experience the tranquil backwaters, lush green tea gardens, and authentic Ayurvedic wellness retreats.</p>"
  },
  {
    uid: "dest-rajasthan",
    name: "Udaipur, Rajasthan",
    profile_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The City of Lakes. Dive into royal heritage, majestic palaces, and stunning lakes in the heart of Rajasthan.</p>"
  },
  {
    uid: "dest-goa",
    name: "Goa Coastline",
    profile_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>Golden beaches, vibrant nightlife, and Portuguese architecture make Goa the ultimate tropical escape in India.</p>"
  },
  {
    uid: "dest-manali",
    name: "Manali, Himachal",
    profile_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>A high-altitude Himalayan resort town known for its snow-capped peaks, adventurous trekking trails, and crisp mountain air.</p>"
  },
  {
    uid: "dest-andaman",
    name: "Andaman Islands",
    profile_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>A pristine archipelago offering crystal clear waters, vibrant coral reefs, and some of the world's most beautiful secluded beaches.</p>"
  },
  {
    uid: "dest-jaipur",
    name: "Jaipur, Rajasthan",
    profile_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The Pink City. Famous for its vibrant culture, stunning forts, and royal palaces like Hawa Mahal and Amber Fort.</p>"
  },
  {
    uid: "dest-agra",
    name: "Agra, Uttar Pradesh",
    profile_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>Home to the iconic Taj Mahal, Agra offers a deep dive into Mughal architecture, history, and rich culinary traditions.</p>"
  },
  {
    uid: "dest-darjeeling",
    name: "Darjeeling, West Bengal",
    profile_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>Famous for its sprawling tea estates, the Darjeeling Himalayan Railway, and breathtaking views of Mount Kanchenjunga.</p>"
  },
  {
    uid: "dest-rishikesh",
    name: "Rishikesh, Uttarakhand",
    profile_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The Yoga Capital of the World, nestled in the Himalayan foothills beside the holy Ganges River.</p>"
  },
  {
    uid: "dest-mysore",
    name: "Mysore, Karnataka",
    profile_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The City of Palaces. Known for its heritage structures, intricate silk sarees, and the spectacular Mysore Palace.</p>"
  },
  {
    uid: "dest-hampi",
    name: "Hampi, Karnataka",
    profile_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>A UNESCO World Heritage site, famous for its magnificent ancient ruins and striking boulder-strewn landscapes.</p>"
  },
  {
    uid: "dest-leh",
    name: "Leh, Ladakh",
    profile_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>A high-altitude desert region known for its stark mountain beauty, Buddhist monasteries, and crystal-clear lakes.</p>"
  },
  {
    uid: "dest-varanasi",
    name: "Varanasi, UP",
    profile_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>One of the world's oldest continuously inhabited cities, offering profound spiritual experiences along the ghats of the Ganges.</p>"
  },
  {
    uid: "dest-pondicherry",
    name: "Pondicherry",
    profile_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The French Riviera of the East, known for its colonial villas, tree-lined streets, chic boutiques, and serene promenades.</p>"
  },
  {
    uid: "dest-shimla",
    name: "Shimla, Himachal",
    profile_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The Queen of Hills. A picturesque colonial hill station surrounded by pine forests and snow-capped peaks.</p>"
  },
  {
    uid: "dest-ooty",
    name: "Ooty, Tamil Nadu",
    profile_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The Queen of Hill Stations, known for its sprawling tea gardens and colonial-era charm.</p>"
  },
  {
    uid: "dest-coorg",
    name: "Coorg, Karnataka",
    profile_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    bio: "<p>The Scotland of India, famous for its lush coffee plantations and breathtaking landscapes.</p>"
  }
];

const MOCK_RESORTS = [
  {
    uid: "resort-kerala",
    title: "Kumarakom Lake Resort",
    url: "/resort/kumarakom-lake-resort",
    published_date: "2024-04-10T10:00:00Z",
    author: [MOCK_DESTINATIONS[0]],
    featured_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Set on the banks of Lake Vembanad, this luxury heritage resort offers traditional Kerala villas rebuilt with modern comforts.</p><p>Enjoy a sunset cruise on a traditional houseboat, world-class Ayurvedic spa treatments, and authentic local cuisine.</p>",
    price: "₹25,000 / night",
    rating: "4.9/5",
    amenities: "Ayurvedic Spa, Houseboats, Infinity Pool"
  },
  {
    uid: "resort-udaipur",
    title: "The Oberoi Udaivilas",
    url: "/resort/oberoi-udaivilas",
    published_date: "2024-04-12T14:30:00Z",
    author: [MOCK_DESTINATIONS[1]],
    featured_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Experience royal grandeur at this spectacular palace resort located on the banks of Lake Pichola.</p><p>Features sprawling courtyards, rippling fountains, reflecting pools, and manicured gardens that transport you to an era of kings.</p>",
    price: "₹65,000 / night",
    rating: "5.0/5",
    amenities: "Private Pools, Royal Dining, Spa"
  },
  {
    uid: "resort-goa",
    title: "Taj Exotica Resort & Spa",
    url: "/resort/taj-exotica-goa",
    published_date: "2024-04-15T09:15:00Z",
    author: [MOCK_DESTINATIONS[2]],
    featured_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Spread across 56 acres of lush gardens along Benaulim Beach, this Mediterranean-style resort offers pure relaxation.</p><p>Enjoy private beach access, a 9-hole golf course, and Jiva Spa treatments to rejuvenate your senses.</p>",
    price: "₹30,000 / night",
    rating: "4.8/5",
    amenities: "Private Beach, Golf Course, Jiva Spa"
  },
  {
    uid: "resort-munnar",
    title: "Panoramic Getaway Munnar",
    url: "/resort/panoramic-getaway",
    published_date: "2024-04-18T11:45:00Z",
    author: [MOCK_DESTINATIONS[0]],
    featured_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Perched high in the misty tea gardens of Munnar, this ultra-modern resort offers heated infinity pools with breathtaking mountain views.</p><p>A perfect romantic getaway wrapped in clouds, offering international cuisine and luxurious climate-controlled rooms.</p>",
    price: "₹18,000 / night",
    rating: "4.7/5",
    amenities: "Heated Infinity Pool, Mountain View, Heli-pad"
  },
  {
    uid: "resort-manali",
    title: "The Himalayan Resort",
    url: "/resort/the-himalayan",
    published_date: "2024-04-20T10:00:00Z",
    author: [MOCK_DESTINATIONS[3]],
    featured_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Built in the Victorian Gothic Revival style, this resort is nestled amidst apple orchards with a magnificent backdrop of snow-capped mountains.</p><p>Enjoy the antique-furnished rooms, a heated outdoor pool, and proximity to Rohtang Pass.</p>",
    price: "₹22,000 / night",
    rating: "4.8/5",
    amenities: "Heated Pool, Apple Orchards, Gothic Architecture"
  },
  {
    uid: "resort-andaman",
    title: "Taj Exotica Andamans",
    url: "/resort/taj-andamans",
    published_date: "2024-04-22T14:00:00Z",
    author: [MOCK_DESTINATIONS[4]],
    featured_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Occupying 46 acres on Radhanagar Beach, Havelock Island, this sustainable luxury resort is flanked by lush forest and the azure waters of the Bay of Bengal.</p><p>Stay in luxurious villas modeled after traditional Jarawa huts and explore world-class scuba diving.</p>",
    price: "₹45,000 / night",
    rating: "4.9/5",
    amenities: "Private Beach, Scuba Diving, Sustainable Villas"
  },
  {
    uid: "resort-jaipur",
    title: "Rambagh Palace",
    url: "/resort/rambagh-palace",
    published_date: "2024-04-23T10:00:00Z",
    author: [MOCK_DESTINATIONS[5]],
    featured_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Once the residence of the Maharaja of Jaipur, this palace hotel offers an extraordinary experience of royal heritage.</p><p>Explore sprawling gardens, marble corridors, and elegant dining rooms fit for royalty.</p>",
    price: "₹75,000 / night",
    rating: "5.0/5",
    amenities: "Royal Suites, Polo Grounds, Jiva Grande Spa"
  },
  {
    uid: "resort-agra",
    title: "The Oberoi Amarvilas",
    url: "/resort/oberoi-amarvilas",
    published_date: "2024-04-24T10:00:00Z",
    author: [MOCK_DESTINATIONS[6]],
    featured_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Located just 600 meters from the Taj Mahal, every room at Amarvilas offers breathtaking, uninterrupted views of the monument.</p><p>Features Mughal-inspired architecture, terraced lawns, and reflection pools.</p>",
    price: "₹80,000 / night",
    rating: "5.0/5",
    amenities: "Taj Mahal Views, Mughal Dining, Luxury Spa"
  },
  {
    uid: "resort-darjeeling",
    title: "Glenburn Tea Estate",
    url: "/resort/glenburn-tea-estate",
    published_date: "2024-04-25T10:00:00Z",
    author: [MOCK_DESTINATIONS[7]],
    featured_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>A heavenly little boutique hotel situated on a working tea estate established by a Scottish tea company in 1859.</p><p>Enjoy panoramic views of Kanchenjunga, personalized tea tours, and colonial-era charm.</p>",
    price: "₹35,000 / night",
    rating: "4.9/5",
    amenities: "Tea Tasting, Hiking Trails, Colonial Suites"
  },
  {
    uid: "resort-rishikesh",
    title: "Ananda in the Himalayas",
    url: "/resort/ananda-himalayas",
    published_date: "2024-04-26T10:00:00Z",
    author: [MOCK_DESTINATIONS[8]],
    featured_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>An award-winning luxury destination spa resort situated on a 100-acre Maharaja's Palace Estate.</p><p>Offers transformational wellness programs combining Ayurveda, Yoga, and Vedanta.</p>",
    price: "₹55,000 / night",
    rating: "4.9/5",
    amenities: "Ayurvedic Spa, Yoga Pavilion, Wellness Cuisine"
  },
  {
    uid: "resort-mysore",
    title: "Royal Orchid Metropole",
    url: "/resort/royal-orchid-metropole",
    published_date: "2024-04-27T10:00:00Z",
    author: [MOCK_DESTINATIONS[9]],
    featured_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>A heritage hotel originally built as a guesthouse for the Maharaja of Mysore's distinguished British guests.</p><p>Experience vintage charm, grand arches, and royal hospitality in the heart of the city.</p>",
    price: "₹15,000 / night",
    rating: "4.6/5",
    amenities: "Heritage Suites, Pool, Vintage Lounge"
  },
  {
    uid: "resort-hampi",
    title: "Evolve Back Kamalapura",
    url: "/resort/evolve-back-hampi",
    published_date: "2024-04-28T10:00:00Z",
    author: [MOCK_DESTINATIONS[10]],
    featured_image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Inspired by the glorious Vijayanagara Empire, this palace resort features grand architecture, courtyards, and luxurious jal mahals (water palaces).</p><p>A perfect base to explore the mystical ruins of Hampi in sheer luxury.</p>",
    price: "₹40,000 / night",
    rating: "4.9/5",
    amenities: "Water Villas, Vijayanagara Architecture, Spa"
  },
  {
    uid: "resort-leh",
    title: "The Grand Dragon",
    url: "/resort/the-grand-dragon",
    published_date: "2024-04-29T10:00:00Z",
    author: [MOCK_DESTINATIONS[11]],
    featured_image: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>One of the first luxury hotels in Ladakh, completely eco-friendly and deeply rooted in local culture.</p><p>Offers stunning views of the Stok Kangri mountains and features centralized heating for year-round comfort.</p>",
    price: "₹20,000 / night",
    rating: "4.7/5",
    amenities: "Mountain Views, Oxygen Lounge, Eco-friendly"
  },
  {
    uid: "resort-varanasi",
    title: "BrijRama Palace",
    url: "/resort/brijrama-palace",
    published_date: "2024-04-30T10:00:00Z",
    author: [MOCK_DESTINATIONS[12]],
    featured_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>A 210-year-old palace situated directly on the Darbhanga Ghat, overlooking the holy Ganges.</p><p>Accessible only by boat, offering a deeply spiritual and luxurious experience with classical music and rich vegetarian cuisine.</p>",
    price: "₹28,000 / night",
    rating: "4.8/5",
    amenities: "River Views, Boat Access, Classical Music"
  },
  {
    uid: "resort-pondicherry",
    title: "Palais de Mahe",
    url: "/resort/palais-de-mahe",
    published_date: "2024-05-01T10:00:00Z",
    author: [MOCK_DESTINATIONS[13]],
    featured_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Located just steps from the seaside promenade, this hotel beautifully captures the essence of Pondicherry's French colonial history.</p><p>Features deep verandahs, a courtyard pool, and exquisite Indo-French cuisine.</p>",
    price: "₹18,000 / night",
    rating: "4.7/5",
    amenities: "Courtyard Pool, French Colonial Design, Cafe"
  },
  {
    uid: "resort-shimla",
    title: "Wildflower Hall",
    url: "/resort/wildflower-hall",
    published_date: "2024-05-02T10:00:00Z",
    author: [MOCK_DESTINATIONS[14]],
    featured_image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Set at 8,250 feet above sea level, this grand Oberoi property was formerly the residence of Lord Kitchener.</p><p>Experience fairy-tale luxury surrounded by cedar forests and majestic views of the Himalayas.</p>",
    price: "₹45,000 / night",
    rating: "4.9/5",
    amenities: "Indoor Heated Pool, Ice Skating, Luxury Spa"
  },
  {
    uid: "resort-ooty",
    title: "Savoy Hotel, Ooty",
    url: "/resort/savoy-ooty",
    published_date: "2024-05-03T10:00:00Z",
    author: [MOCK_DESTINATIONS[15]],
    featured_image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>Step back in time at this 19th-century colonial heritage hotel nestled in the Nilgiri Mountains.</p>",
    price: "₹16,000 / night",
    rating: "4.8/5",
    amenities: "Colonial Suites, Fireplaces, Heritage Walks"
  },
  {
    uid: "resort-coorg",
    title: "Taj Madikeri Resort",
    url: "/resort/taj-madikeri-coorg",
    published_date: "2024-05-04T10:00:00Z",
    author: [MOCK_DESTINATIONS[16]],
    featured_image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    content: "<p>A sprawling rainforest resort perched 4000 feet above sea level, offering panoramic views of the Western Ghats.</p>",
    price: "₹28,000 / night",
    rating: "4.9/5",
    amenities: "Rainforest Views, Infinity Pool, Jiva Spa"
  }
];

class MockQuery {
  private contentType: string;
  private conditions: Record<string, string> = {};

  constructor(contentType: string) {
    this.contentType = contentType;
  }

  includeReference() { return this; }
  toJSON() { return this; }
  
  where(field: string, value: string) {
    this.conditions[field] = value;
    return this;
  }

  async find() {
    let data: any[] = [];
    if (this.contentType === "author" || this.contentType === "destination") {
      data = [...MOCK_DESTINATIONS];
    } else if (this.contentType === "blog" || this.contentType === "resort") {
      data = [...MOCK_RESORTS];
    }

    // Apply filters
    for (const [key, value] of Object.entries(this.conditions)) {
      data = data.filter(item => {
        // Special case for url with leading slash mismatch
        if (key === 'url') {
          return item[key] === value || item[key] === `/${value}` || `/${item[key]}` === value;
        }
        return item[key] === value;
      });
    }

    return [data, data.length];
  }
}

const Stack = apiKey && deliveryToken
  ? Contentstack.Stack({ api_key: apiKey, delivery_token: deliveryToken, environment })
  : {
      ContentType: (uid: string) => ({ Query: () => new MockQuery(uid) }),
    };

export { Stack };
