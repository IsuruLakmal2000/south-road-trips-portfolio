import turtleVideo from '../assets/blog/sea-turtle-conservation.mp4'
import turtleImage from '../assets/blog/sea-turtle.jpg'
import kayakingVideo from '../assets/blog/kayaking/hikkaduwa-kayaking.mp4'
import kayakingImage from '../assets/blog/kayaking/kayaking-cover.jpeg'
import leapardIMG from '../assets/blog/yala-leapard.jpg'
import srilankanroadsIMG from '../assets/blog/sri-lankan-roads.jpg'

export interface BlogPostPreview {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export interface BlogArticleContent {
  type: 'intro' | 'section' | 'list' | 'highlight-list' | 'video' | 'cta';
  title?: string;
  text?: string;
  content?: string;
  items?: string[] | Array<{ title: string; desc: string }>;
  endText?: string;
  src?: string;
}

export interface BlogArticleData extends BlogPostPreview {
  content: BlogArticleContent[];
  videoUrl?: string;
  metaDescription?: string;
  keywords?: string[];
  slug?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const blogArticles: { [key: string]: BlogArticleData } = {
  'sea-turtle': {
    id: 'sea-turtle',
    title: 'Visit the Sea Turtle Conservation Center Near Ahangama',
    excerpt: 'If you are traveling along the beautiful south coast of Sri Lanka, visiting a Sea Turtle Conservation Center is a wonderful experience you should not miss. Located only about 7 km from Ahangama...',
    date: 'March 14, 2025',
    author: 'South Road Trips Team',
    category: 'Culture & Wildlife',
    image: turtleImage,
    readTime: '8 min read',
    videoUrl: turtleVideo,
    slug: 'sea-turtle-conservation-ahangama',
    metaDescription: 'Visit the Sea Turtle Conservation Center near Ahangama, Sri Lanka. Learn about endangered sea turtles, see hatchlings, and support marine conservation efforts.',
    keywords: ['sea turtle conservation', 'turtle sanctuary Sri Lanka', 'Ahangama wildlife', 'Sri Lanka marine life', 'sea turtle tour', 'marine conservation', 'South coast Sri Lanka attractions'],
    ogTitle: 'Sea Turtle Conservation Center Near Ahangama | South Road Trips',
    ogDescription: 'Experience sea turtle conservation at this dedicated center near Ahangama. See baby turtles, rescued animals, and learn about marine protection.',
    ogImage: turtleImage,
    content: [
      {
        type: 'intro',
        text: 'If you are traveling along the beautiful south coast of Sri Lanka, visiting a Sea Turtle Conservation Center is a wonderful experience you should not miss. Located only about 7 km from Ahangama, this place is dedicated to protecting endangered sea turtles and educating visitors about marine conservation. It is a short and meaningful trip that adds something special to your Sri Lanka travel experience.'
      },
      {
        type: 'section',
        title: 'Why Sea Turtle Conservation is Important',
        content: 'Sri Lanka is home to several species of sea turtles that visit its beaches to lay eggs. Unfortunately, these turtles face many threats such as ocean pollution, fishing nets, and illegal egg collection.\n\nSea Turtle Conservation Centers work hard to:'
      },
      {
        type: 'list',
        items: [
          'Protect turtle eggs from predators and human threats',
          'Care for injured sea turtles',
          'Release baby turtles safely into the ocean',
          'Educate visitors about marine conservation'
        ],
        endText: 'By visiting these centers, travelers also help support the protection of these amazing marine animals.'
      },
      {
        type: 'section',
        title: 'What You Can See at the Conservation Center',
        content: 'When you visit the Sea Turtle Conservation Center near Ahangama, you will have the chance to see different stages of a turtle\'s life. Some of the things you can experience include:'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Baby Turtles (Hatchlings)',
            desc: 'You may see tiny baby turtles that will soon be released into the ocean.'
          },
          {
            title: 'Different Species of Sea Turtles',
            desc: 'The center often protects species such as Green Turtles, Hawksbill Turtles, and Olive Ridley Turtles.'
          },
          {
            title: 'Rescued or Injured Turtles',
            desc: 'Some turtles are brought here after being injured by fishing gear or boat accidents. They are treated and cared for until they recover.'
          }
        ],
        endText: 'Visitors can also learn how conservation teams protect turtle eggs collected from nearby beaches.'
      },
      {
        type: 'section',
        title: 'Best Way to Visit From Ahangama',
        content: 'The Sea Turtle Conservation Center is located only a short 15–20 minute ride from Ahangama. The best and easiest way to reach it is by renting a scooter.\n\nWith your own scooter you can:'
      },
      {
        type: 'list',
        items: [
          'Explore hidden beaches',
          'Visit wildlife spots',
          'Stop at cafes along the coast',
          'Discover local villages and scenic roads'
        ],
        endText: 'Many travelers prefer scooters because they offer freedom and flexibility to explore the south coast at their own pace.'
      },
      {
        type: 'section',
        title: 'Explore More Hidden Places Around Ahangama',
        content: 'The south coast is full of beautiful locations waiting to be discovered. While visiting the Sea Turtle Conservation Center, you can also explore nearby attractions such as:'
      },
      {
        type: 'list',
        items: [
          'Secret Beach in Ahangama',
          'Surfing spots along the coast',
          'Beautiful sunset viewpoints',
          'Local cafes and beach restaurants'
        ],
        endText: 'Having a scooter makes it easy to visit several places in one day.'
      },
      {
        type: 'section',
        title: 'Rent a Scooter and Start Your South Road Trip',
        content: 'If you want to explore amazing places like the Sea Turtle Conservation Center and many other hidden gems along the south coast, renting a scooter is the perfect choice.\n\nWith South Road Trips scooter rentals, you can travel freely and enjoy Sri Lanka\'s coastal beauty without any hassle. Get your scooter today and start exploring!'
      },
      {
        type: 'video',
        src: turtleVideo
      },
      {
        type: 'cta'
      }
    ]
  },

  'hikkaduwa-kayaking': {
    id: 'hikkaduwa-kayaking',
    title: 'Kayaking in Hikkaduwa Lagoon',
    excerpt: 'Explore calm lagoon waters, guided paddleboard and kayak tours, plus a traditional catamaran safari in Hikkaduwa for an unforgettable day on the water.',
    date: 'May 5, 2026',
    author: 'South Road Trips Team',
    category: 'Adventure',
    image: kayakingImage,
    readTime: '6 min read',
    videoUrl: kayakingVideo,
    slug: 'kayaking-hikkaduwa-lagoon',
    metaDescription: 'Discover the best kayaking experience in Hikkaduwa Lagoon, Sri Lanka. Explore guided paddleboard tours, kayak adventures, and traditional catamaran safaris with South Road Trips.',
    keywords: [
      'Kayaking in sri lanka',
      'sri lanka kayaking',
      'Kayaking in Hikkaduwa',
      'kayaking in galle',
      'Sri lanka kayak',
      'sri lanka tours',
      'sri lanka activities'
    ],
    ogTitle: 'Best Kayaking Tours in Hikkaduwa Lagoon | South Road Trips',
    ogDescription: 'Experience guided kayaking, paddleboarding, and catamaran safaris in Hikkaduwa Lagoon. Perfect for families, couples, and adventure seekers in Sri Lanka.',
    ogImage: kayakingImage,
    content: [
      {
        type: 'intro',
        text: 'Hikkaduwa Lagoon is a wonderful destination for paddling through calm waters, spotting birdlife, and enjoying a traditional Sri Lankan lagoon safari. Whether you choose a guided paddleboard tour, kayak tour, or a classic catamaran ride, this adventure is perfect for families, couples, and groups seeking a peaceful nature escape.'
      },
      {
        type: 'section',
        title: 'Paddleboard Guided Tour',
        content: 'A guided paddleboard tour in Hikkaduwa Lagoon is ideal for beginners and experienced paddlers alike. Your guide will help you find the best routes through the mangroves, point out local wildlife, and share insights about the lagoon ecosystem.'
      },
      {
        type: 'list',
        items: [
          'Easy-to-follow instructions from the guide',
          'Smooth paddling across calm lagoon water',
          'Close sightings of herons, kingfishers, and native birds',
          'A fun activity for couples and friends'
        ],
        endText: 'The paddleboard tour offers a relaxed way to connect with nature while enjoying impressive lagoon scenery.'
      },
      {
        type: 'section',
        title: 'Kayak Guided Tour',
        content: 'The kayak guided tour is a great choice for a more immersive experience on the water. Glide through narrow channels, discover hidden lagoon corners, and enjoy the peaceful rhythm of your paddle as you explore this coastal paradise.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Expert Local Guides',
            desc: 'Experienced guides lead the tour, ensuring your safety and sharing stories about the lagoon and its wildlife.'
          },
          {
            title: 'Flexible Pacing',
            desc: 'Move at your own pace and stop whenever you want to take photos or simply admire the view.'
          },
          {
            title: 'Perfect for Adventure Seekers',
            desc: 'Kayaking is an active way to explore the lagoon while still feeling calm and connected to nature.'
          }
        ],
        endText: 'A guided kayak tour is both energizing and relaxing, and it makes the Hikkaduwa Lagoon experience truly memorable.'
      },
      {
        type: 'section',
        title: 'Traditional Lagoon Safari by Catamaran',
        content: 'For a classic lagoon excursion, the traditional catamaran safari offers a gentle cruise through the water, complete with local charm and scenic views. This is a wonderful way to experience the lagoon without needing any paddling skill.'
      },
      {
        type: 'list',
        items: [
          'Relaxing catamaran ride through the lagoon',
          'Perfect for guests who prefer a slower pace',
          'Chance to learn about local fishing and lagoon life',
          'Beautiful photo opportunities at sunset or in soft morning light'
        ],
        endText: 'The traditional catamaran safari adds a cultural touch to your Hikkaduwa adventure, especially when shared with family or friends.'
      },
      {
        type: 'section',
        title: 'Tips for Your Hikkaduwa Kayaking Trip',
        content: 'Bring sunscreen, a hat, and a refillable water bottle. Wear comfortable swimwear and lightweight clothing that dries quickly. If you want the best conditions, plan your tour for early morning or late afternoon when the lagoon is calm and the light is soft.'
      },
      {
        type: 'video',
        src: kayakingVideo
      },
      {
        type: 'cta'
      }
    ]
  },

  'hidden-beaches': {
    id: 'hidden-beaches',
    title: 'Hidden Gems: Secret Beaches of Sri Lanka',
    excerpt: 'Discover the most beautiful and secluded beaches that only locals know about. From pristine white sands to crystal clear waters...',
    date: 'March 12, 2025',
    author: 'South Road Trips Team',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
    readTime: '5 min read',
    slug: 'hidden-beaches-sri-lanka',
    metaDescription: 'Discover secret beaches in Sri Lanka with our guide to hidden gems. Find pristine white sand beaches, crystal clear waters, and authentic beach experiences.',
    keywords: ['secret beaches Sri Lanka', 'hidden beaches', 'Sri Lanka beaches', 'beach travel guide', 'south coast beaches', 'secluded beaches', 'beach vacation Sri Lanka'],
    ogTitle: 'Hidden Secret Beaches of Sri Lanka | South Road Trips',
    ogDescription: 'Explore the most beautiful and secluded beaches in Sri Lanka that only locals know about. Pristine white sands and crystal clear waters await.',
    ogImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'intro',
        text: 'Sri Lanka boasts some of the world\'s most stunning and secluded beaches. While many travelers flock to popular spots, we\'ve discovered hidden gems that offer pristine white sands, crystal clear waters, and an authentic Sri Lankan beach experience. Here are our top secret beaches that deserve a place on your road trip itinerary.'
      },
      {
        type: 'section',
        title: 'Why Explore Hidden Beaches?',
        content: 'Hidden beaches offer a unique experience away from the crowds. You\'ll find authentic local culture, untouched natural beauty, and the chance to swim in pristine waters. Each beach has its own character and charm, making them perfect for photography, swimming, or simply relaxing.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Talalla Beach',
            desc: 'A quiet crescent bay with golden sand and clear turquoise waters, perfect for swimming and watching dolphins at sunset.'
          },
          {
            title: 'Polhena Beach',
            desc: 'A protected lagoon with calm waters, ideal for snorkeling and spotting colorful tropical fish.'
          },
          {
            title: 'Unawatuna Beach',
            desc: 'A picturesque palm-fringed beach with underwater coral formations and vibrant marine life.'
          }
        ],
        endText: 'Each of these beaches is accessible by scooter rental and offers something special that you won\'t find in guidebooks.'
      },
      {
        type: 'section',
        title: 'Best Time to Visit',
        content: 'The south coast is best visited during the dry season from December to April. During this period, you\'ll enjoy sunny days, calm seas, and perfect conditions for beach activities. Pro tip: Visit early in the morning to avoid crowds and capture stunning sunrise photos.'
      },
      {
        type: 'list',
        items: [
          'Pack sunscreen and UV protection',
          'Bring a waterproof camera or smartphone case',
          'Wear water shoes for rocky areas',
          'Carry plenty of water and snacks',
          'Respect local customs and the environment'
        ],
        endText: 'A scooter makes it easy to visit multiple beaches in one day and discover new spots.'
      },
      {
        type: 'section',
        title: 'Photography Tips for Beach Lovers',
        content: 'These hidden beaches are a photographer\'s paradise. The golden hour (sunrise and sunset) provides the best light for capturing the beauty of these untouched landscapes. Long exposure photography can create stunning images of the waves, while macro photography allows you to capture the intricate details of shells and coral.'
      },
      {
        type: 'cta'
      }
    ]
  },

  'wildlife-photography': {
    id: 'wildlife-photography',
    title: 'Wildlife Photography Guide: Capturing Leopards in Yala',
    excerpt: 'Professional tips on how to photograph elusive leopards and other wildlife in Sri Lanka\'s most famous national park...',
    date: 'March 5, 2025',
    author: 'South Road Trips Team',
    category: 'Photography',
    image: leapardIMG,
    readTime: '7 min read',
    slug: 'wildlife-photography-yala-leopards',
    metaDescription: 'Learn professional wildlife photography techniques for capturing leopards and wildlife in Yala National Park. Expert tips for Sri Lanka safari photography.',
    keywords: ['wildlife photography', 'leopard photography', 'Yala National Park', 'safari photography', 'wildlife guide', 'Sri Lanka wildlife tour', 'nature photography tips'],
    ogTitle: 'Wildlife Photography Guide: Leopards in Yala Park | South Road Trips',
    ogDescription: 'Master wildlife photography with our expert guide to capturing leopards and animals in Yala National Park, Sri Lanka\'s premier wildlife destination.',
    ogImage: leapardIMG,
    content: [
      {
        type: 'intro',
        text: 'Yala National Park is home to one of the highest concentrations of leopards in the world. A safari here offers incredible opportunities for wildlife photography, but capturing these elusive big cats requires planning, patience, and the right techniques. In this guide, we\'ll share professional tips from experienced wildlife photographers.'
      },
      {
        type: 'section',
        title: 'Essential Camera Settings for Wildlife',
        content: 'To capture wildlife effectively, you need to understand your camera\'s capabilities. Fast shutter speeds are crucial to freeze motion, while appropriate apertures help you achieve the right depth of field and lighting. Learn the settings that professional wildlife photographers use when photographing predators in action.'
      },
      {
        type: 'list',
        items: [
          'Use aperture priority mode (f/5.6-f/8) for maximum depth of field',
          'Set shutter speed to minimum 1/1000s for moving subjects',
          'Use ISO 800-3200 depending on light conditions',
          'Enable continuous autofocus tracking',
          'Use burst mode to capture multiple frames per second'
        ],
        endText: 'These settings will help you capture sharp, well-exposed images of wildlife in their natural habitat.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Preparing Your Gear',
            desc: 'Invest in a quality telephoto lens (200-400mm), weather-sealed camera body, and multiple memory cards. Bring protective bags and cleaning kits for dust protection during safaris.'
          },
          {
            title: 'Timing and Patience',
            desc: 'Leopards are most active during early morning and late afternoon. Plan your safari drives during these golden hours for the best sightings and photography light.'
          },
          {
            title: 'Composition Techniques',
            desc: 'Use rule of thirds, leading lines, and negative space. Capture animals in their environment, not just close-ups. Include behavioral shots that tell a story.'
          }
        ],
        endText: 'Great wildlife photography combines technical knowledge with artistic vision and patience.'
      },
      {
        type: 'cta'
      }
    ]
  },

  'best-time-visit': {
    id: 'best-time-visit',
    title: 'Best Time to Visit: Seasons in Sri Lanka',
    excerpt: 'A comprehensive guide to understanding Sri Lankan weather patterns and choosing the perfect time for your road trip adventure...',
    date: 'February 28, 2025',
    author: 'South Road Trips Team',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop',
    readTime: '6 min read',
    slug: 'best-time-visit-sri-lanka',
    metaDescription: 'Discover the best time to visit Sri Lanka with our comprehensive guide to seasons, weather, and travel conditions throughout the year.',
    keywords: ['best time to visit Sri Lanka', 'Sri Lanka weather', 'Sri Lanka seasons', 'when to visit Sri Lanka', 'travel guide Sri Lanka', 'monsoon season', 'Sri Lanka climate'],
    ogTitle: 'Best Time to Visit Sri Lanka | Complete Seasonal Guide | South Road Trips',
    ogDescription: 'Plan your perfect trip with our guide to Sri Lanka\'s seasons and weather patterns. Discover the best time to visit for your adventure.',
    ogImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'intro',
        text: 'Sri Lanka\'s tropical climate means the island has diverse weather patterns throughout the year. Understanding the monsoons and seasons will help you plan your perfect road trip. Let\'s explore what to expect in each season and which time is best for your South Road Trips adventure.'
      },
      {
        type: 'section',
        title: 'The Four Seasons Explained',
        content: 'Sri Lanka experiences two monsoon seasons and two inter-monsoon periods. The Southwest Monsoon (May-September) and Northeast Monsoon (December-February) significantly impact weather patterns across the island. The south and west coasts have different patterns than the north and east coasts.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Dry Season (December-April)',
            desc: 'Perfect for the south coast. Sunny days, minimal rainfall, calm seas, and excellent visibility. This is the peak season for tourism and the best time for beach activities and wildlife safaris.'
          },
          {
            title: 'Southwest Monsoon (May-September)',
            desc: 'Brings strong winds and heavy rains to the west and southwest coasts. While challenging for beach activities, this season offers lush landscapes and fewer tourists. Best for experiencing authentic Sri Lanka.'
          },
          {
            title: 'Shoulder Seasons (March-April, October-November)',
            desc: 'Transitional periods with mixed weather. Can be excellent for travel with fewer crowds and better prices. September-October is particularly good for adventurous travelers.'
          }
        ],
        endText: 'The dry season is ideal for most travelers, but off-season visits have their own charm and advantages.'
      },
      {
        type: 'section',
        title: 'What to Pack for Different Seasons',
        content: 'Your packing list will vary depending on when you visit. During dry season, focus on sun protection and light clothing. During monsoon season, prepare for heavy rains with waterproof gear. Regardless of season, certain items are always essential for an enjoyable road trip.'
      },
      {
        type: 'list',
        items: [
          'High SPF sunscreen (50+)',
          'Lightweight, breathable clothing',
          'Quick-dry clothes and towels',
          'Waterproof bag for electronics',
          'Hat or cap for sun protection',
          'Insect repellent',
          'Rain jacket or poncho'
        ],
        endText: 'Proper preparation ensures you\'re comfortable and safe regardless of when you visit.'
      },
      {
        type: 'cta'
      }
    ]
  },

  'local-cuisine': {
    id: 'local-cuisine',
    title: 'Local Cuisine You Must Try on Your Sri Lankan Road Trip',
    excerpt: 'Explore the authentic flavors of Sri Lanka. From street food to traditional curries, here are the must-try dishes...',
    date: 'February 21, 2025',
    author: 'South Road Trips Team',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
    readTime: '5 min read',
    slug: 'sri-lankan-cuisine-guide',
    metaDescription: 'Explore Sri Lankan cuisine with our food guide. Discover authentic dishes, traditional recipes, and the best restaurants for local flavors.',
    keywords: ['Sri Lankan food', 'Sri Lankan cuisine', 'local dishes', 'curry recipes', 'street food Sri Lanka', 'food guide', 'authentic Sri Lankan recipes'],
    ogTitle: 'Sri Lankan Food Guide: Must-Try Dishes & Recipes | South Road Trips',
    ogDescription: 'Discover authentic Sri Lankan cuisine. Learn about traditional dishes, get recipes, and find the best places to eat local food.',
    ogImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'intro',
        text: 'Sri Lankan cuisine is a vibrant blend of spices, coconut, and fresh ingredients. A road trip along the south coast provides the perfect opportunity to experience authentic local food, from bustling street markets to family-run restaurants. Here are the must-try dishes that will make your culinary journey unforgettable.'
      },
      {
        type: 'section',
        title: 'Street Food Delights',
        content: 'The streets of Sri Lanka are alive with the aroma of spiced food and fresh preparations. Street food offers an authentic taste of local life and is often incredibly affordable. Here are some popular street food items you absolutely must try.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Kottu Roti',
            desc: 'Chopped flatbread mixed with curry, vegetables, and meat. This energetic street food is prepared right in front of you with rhythmic chopping sounds.'
          },
          {
            title: 'Hoppers',
            desc: 'Bowl-shaped pancakes made with rice flour and coconut milk, often topped with curry or egg. A breakfast favorite that\'s both delicious and affordable.'
          },
          {
            title: 'Lamprais',
            desc: 'A unique Portuguese-influenced dish of rice, meat, and spices baked inside banana leaves. A true Lankan favorite.'
          }
        ],
        endText: 'Street food is not just about the food; it\'s about experiencing local culture and connecting with people.'
      },
      {
        type: 'section',
        title: 'Traditional Curries and Rice',
        content: 'No Sri Lankan meal is complete without curry. The island has perfected the art of balancing heat, flavor, and authenticity. From fish curries using fresh local catch to vegetable curries bursting with spices, each dish tells a story of Sri Lankan tradition.'
      },
      {
        type: 'list',
        items: [
          'Fish Curry - made with fresh local catch and coconut milk',
          'Chicken Curry - tender meat in fragrant spice blend',
          'Vegetable Curry - seasonal vegetables in creamy sauce',
          'Dhal Curry - lentil-based protein-rich dish',
          'Sambols - spicy coconut and chili condiments'
        ],
        endText: 'Ask locals for their favorite curry spots - they always know the best places to eat authentic food.'
      },
      {
        type: 'cta'
      }
    ]
  },

  'road-trip-safety': {
    id: 'road-trip-safety',
    title: 'Road Trip Safety: Essential Tips for Driving in Sri Lanka',
    excerpt: 'Everything you need to know about road conditions, vehicle requirements, and safety protocols for a secure journey...',
    date: 'February 14, 2025',
    author: 'South Road Trips Team',
    category: 'Safety',
    image: srilankanroadsIMG,
    readTime: '8 min read',
    slug: 'road-trip-safety-sri-lanka',
    metaDescription: 'Stay safe on your Sri Lanka road trip with our complete safety guide. Learn about scooter rental, traffic rules, and essential travel tips.',
    keywords: ['road trip safety', 'scooter rental safety', 'Sri Lanka driving rules', 'travel safety tips', 'road safety guide', 'adventure safety', 'transportation safety'],
    ogTitle: 'Safe Road Trip Guide for Sri Lanka | South Road Trips',
    ogDescription: 'Complete road trip safety guide for Sri Lanka. Learn driving rules, scooter safety, and essential tips for a safe adventure.',
    ogImage: srilankanroadsIMG,
    content: [
      {
        type: 'intro',
        text: 'Renting a scooter for your Sri Lankan road trip is exciting and liberating, but safety should always be your top priority. Understanding local driving conditions, practicing defensive driving, and following safety protocols will ensure you have a secure and enjoyable adventure. Here\'s everything you need to know.'
      },
      {
        type: 'section',
        title: 'Understanding Local Road Conditions',
        content: 'Sri Lankan roads vary significantly in quality and traffic patterns. From well-maintained highways to narrow village roads, each presents unique challenges. The south coast roads are generally good, but they can be busy during peak season. Understanding these conditions helps you ride defensively and confidently.'
      },
      {
        type: 'list',
        items: [
          'Main roads are generally well-maintained but can be narrow',
          'Expect three-wheel taxis (tuk-tuks) and buses in traffic',
          'Livestock and pedestrians often share the road',
          'Potholes and broken road surfaces are common in some areas',
          'Traffic flows on the left side of the road (British legacy)'
        ],
        endText: 'Adapt your speed and awareness to conditions. Slow down in villages and be extra cautious at night.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Essential Safety Gear',
            desc: 'Always wear an approved helmet, protective clothing, and closed-toe shoes. Use reflective gear for visibility, especially during low-light conditions.'
          },
          {
            title: 'Vehicle Checks',
            desc: 'Inspect your scooter before each ride. Check tires, brakes, lights, and fuel. Ensure mirrors are properly adjusted for maximum visibility.'
          },
          {
            title: 'Defensive Riding Techniques',
            desc: 'Assume vehicles and pedestrians may act unpredictably. Maintain safe following distances, use turn signals consistently, and avoid riding at night when possible.'
          }
        ],
        endText: 'Your safety is our priority. South Road Trips provides well-maintained vehicles and safety equipment.'
      },
      {
        type: 'section',
        title: 'Insurance and Legal Requirements',
        content: 'Before renting a scooter, understand the insurance requirements and legal obligations. Most rental companies require proof of international driving permit or a valid motorcycle license. Insurance is typically included in the rental package, but verify coverage details.'
      },
      {
        type: 'cta'
      }
    ]
  },

  'adventure-activities': {
    id: 'adventure-activities',
    title: 'Adventure Activities Beyond the Standard Tours',
    excerpt: 'Looking for adrenaline? Discover rock climbing, surfing, hiking, and other exciting activities throughout Sri Lanka...',
    date: 'February 7, 2025',
    author: 'South Road Trips Team',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    readTime: '6 min read',
    slug: 'adventure-activities-sri-lanka',
    metaDescription: 'Discover thrilling adventure activities in Sri Lanka. Rock climbing, paragliding, surfing, diving, and more exciting activities for adrenaline seekers.',
    keywords: ['adventure activities Sri Lanka', 'rock climbing', 'paragliding', 'surfing Sri Lanka', 'scuba diving', 'water sports', 'extreme sports Sri Lanka'],
    ogTitle: 'Top Adventure Activities in Sri Lanka | Thrilling Experiences | South Road Trips',
    ogDescription: 'Explore exciting adventure activities in Sri Lanka. Surfing, rock climbing, paragliding, diving, and more thrilling experiences for adventure seekers.',
    ogImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'intro',
        text: 'Sri Lanka isn\'t just about relaxing on beaches and visiting temples. For thrill-seekers and adventure enthusiasts, the island offers incredible opportunities for rock climbing, surfing, paragliding, and more. Discover adrenaline-pumping activities that will make your road trip utterly unforgettable.'
      },
      {
        type: 'section',
        title: 'Water Sports Paradise',
        content: 'The south coast is a hotspot for water sports enthusiasts. From world-class surfing breaks to pristine diving sites, there\'s something for every water lover. Many activities are accessible near your road trip route.'
      },
      {
        type: 'highlight-list',
        items: [
          {
            title: 'Surfing',
            desc: 'The south coast has excellent surf breaks suitable for beginners and experts. Dikwella, Arugam Bay, and Mirissa are popular spots with local instructors available.'
          },
          {
            title: 'Scuba Diving & Snorkeling',
            desc: 'Explore underwater coral gardens and tropical fish. Multiple dive sites offer opportunities to see turtles, rays, and even reef sharks.'
          },
          {
            title: 'Whale Watching & Dolphin Tours',
            desc: 'During season (November-April), boat tours offer chances to see blue whales and spinner dolphins in their natural habitat.'
          }
        ],
        endText: 'Always use licensed operators and follow safety guidelines for water sports.'
      },
      {
        type: 'section',
        title: 'Land-Based Adventures',
        content: 'Beyond the water, Sri Lanka offers exciting terrestrial adventures. Hiking through tea plantations, rock climbing, and jungle treks provide different ways to experience the island\'s natural beauty.'
      },
      {
        type: 'list',
        items: [
          'Hiking Ella Rock for 360-degree hill country views',
          'Rock climbing at Railwaya Rocks near Ella',
          'Jungle trekking in Yala National Park',
          'Canyoning in Kitulgala',
          'Paragliding near Ella for breathtaking aerial views'
        ],
        endText: 'Combine multiple activities during your road trip for a complete adventure experience.'
      },
      {
        type: 'cta'
      }
    ]
  }
};

export const blogPostPreviews: BlogPostPreview[] = [
  blogArticles['sea-turtle'],
  blogArticles['hidden-beaches'],
  blogArticles['wildlife-photography'],
  blogArticles['best-time-visit'],
  blogArticles['local-cuisine'],
  blogArticles['road-trip-safety'],
  blogArticles['adventure-activities'],
  blogArticles['hikkaduwa-kayaking']
];
