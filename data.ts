
import { Article, Category } from './types';

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: "The Future of Body Repair: AI-Powered Diagnostics",
    slug: "future-body-repair-ai-diagnostics",
    excerpt: "How artificial intelligence is revolutionizing damage estimation and structural integrity checks after a collision.",
    content: "The collision repair industry is undergoing a digital transformation. Today, AI-assisted scanning tools can detect micro-fractures invisible to the human eye, ensuring total safety after a repair. These technologies reduce waiting times for customers while increasing the accuracy of quotes sent to insurers. Modern sensors and computer vision are now the primary tools for top-tier technicians...",
    category: Category.SAFETY,
    author: "John Smith",
    publishDate: "2024-05-20",
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["AI", "Technology", "Safety"]
  },
  {
    id: '2',
    title: "5 Key Steps to Managing Your Insurance Claim Stress-Free",
    slug: "steps-managing-insurance-claim",
    excerpt: "A practical guide to navigating between adjusters, your insurance company, and the body shop.",
    content: "After an accident, stress levels are high. However, following a rigorous procedure can save you time and money. From the initial report to the claim filing, here is how to maximize your chances of full coverage. Understanding your rights regarding 'Direct Repair Programs' and independent shop choices is vital in the modern insurance landscape...",
    category: Category.INSURANCE,
    author: "Sarah Johnson",
    publishDate: "2024-05-18",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    tags: ["Insurance", "Tips", "Legal"]
  },
  {
    id: '3',
    title: "Electric Vehicle Repair: Specific Challenges and Protocols",
    slug: "electric-vehicle-repair-challenges",
    excerpt: "Why repairing a Tesla or an ID.4 requires specific high-voltage training and safety equipment.",
    content: "An electric car is not like a traditional internal combustion vehicle. The high-voltage circuit requires drastic safety protocols before any intervention on the body. Discover why it is crucial to choose a certified repair center that understands battery insulation and thermal management systems...",
    category: Category.REPAIR,
    author: "Mike Auto",
    publishDate: "2024-05-15",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    tags: ["EV", "Electric", "Repair"]
  },
  {
    id: '4',
    title: "ADAS Calibration: The Invisible Side of Modern Repair",
    slug: "adas-calibration-modern-repair",
    excerpt: "Advanced Driver Assistance Systems must be recalibrated after almost any body work.",
    content: "Modern cars are computers on wheels. After a minor fender bender, your lane-keep assist and emergency braking sensors might be misaligned. Calibration is no longer optional; it's a critical safety step that requires specialized equipment and controlled environments...",
    category: Category.SAFETY,
    author: "Robert Chen",
    publishDate: "2024-05-14",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    tags: ["ADAS", "Tech", "Safety"]
  },
  {
    id: '5',
    title: "Eco-Friendly Paint: Sustainability in the Body Shop",
    slug: "eco-friendly-paint-sustainability",
    excerpt: "How water-borne paints are reducing the carbon footprint of the collision industry.",
    content: "Environmental regulations are driving innovation in automotive finishes. Water-borne paint systems significantly reduce volatile organic compound (VOC) emissions, providing a safer environment for workers and a smaller footprint for the planet, without compromising on color matching or durability...",
    category: Category.INDUSTRY,
    author: "Elena Green",
    publishDate: "2024-05-12",
    imageUrl: "https://images.unsplash.com/photo-1590099433100-344c207a9747?auto=format&fit=crop&w=800&q=80",
    tags: ["Environment", "Paint", "Industry"]
  },
  // Adding the rest to reach 30 articles
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `${i + 6}`,
    title: `Collision Care Insight #${i + 6}: Expert Automotive Advice`,
    slug: `collision-insight-${i + 6}`,
    excerpt: `A comprehensive look at best practices in the modern automotive repair and maintenance industry.`,
    content: `This detailed article explores various aspects of car maintenance and body repair. At Collision Care Center, we strive to offer unparalleled service quality. This text delves into the nuances of laser frame alignment, the importance of genuine OEM parts, and the rising costs of automotive materials in the global market. Readers will learn how to identify quality work and maintain their vehicle's resale value after a major accident...`,
    category: i % 5 === 0 ? Category.REPAIR : i % 5 === 1 ? Category.INSURANCE : i % 5 === 2 ? Category.SAFETY : i % 5 === 3 ? Category.MAINTENANCE : Category.INDUSTRY,
    author: "Collision Care Team",
    publishDate: "2024-05-10",
    imageUrl: `https://picsum.photos/seed/collision_en_${i + 6}/800/600`,
    tags: ["Expertise", "Automotive", "Professional"]
  }))
];
