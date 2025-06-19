// Utility functions for generating structured data

export interface StructuredDataProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'product' | 'service' | 'organization';
  image?: string;
  price?: number;
  rating?: {
    value: number;
    count: number;
  };
}

export function generateWebsiteStructuredData(props: StructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": props.title,
    "description": props.description,
    "url": props.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${props.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateSoftwareApplicationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dubbby",
    "applicationCategory": "VideoApplication",
    "operatingSystem": "Web Browser",
    "url": "https://dubbby.com/",
    "description": "AI-powered video dubbing platform that translates content into 15+ languages with perfect lip synchronization",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free trial with 100 minutes included"
    },
    "featureList": [
      "AI Video Dubbing",
      "Perfect Lip Synchronization",
      "15+ Language Support", 
      "30-Second Processing",
      "High-Quality Voice Synthesis",
      "Content Creator Tools"
    ],
    "screenshot": "https://dubbby.com/og-image.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Dubbby",
      "url": "https://dubbby.com/"
    }
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dubbby",
    "url": "https://dubbby.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dubbby.com/logo.png"
    },
    "description": "Leading AI video dubbing platform for content creators",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/dubbby",
      "https://linkedin.com/company/dubbby",
      "https://youtube.com/@dubbby"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@dubbby.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };
}

export function generateServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Video Dubbing Service",
    "description": "Professional AI-powered video dubbing and lip synchronization service",
    "provider": {
      "@type": "Organization",
      "name": "Dubbby",
      "url": "https://dubbby.com/"
    },
    "areaServed": "Worldwide",
    "serviceType": "Video Translation and Dubbing",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free trial with 100 minutes included"
    }
  };
}

export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateVideoStructuredData(title: string, description: string, thumbnailUrl: string, uploadDate: string, duration?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": "https://dubbby.com/demo-video.mp4",
    "embedUrl": "https://dubbby.com/embed/demo"
  };
} 