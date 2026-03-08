import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';

// Import all main service components that will be wrapped
const WebDevService = React.lazy(() => import('./WebDevService'));
const DigitalMarketingService = React.lazy(() => import('./DigitalMarketingService'));
const MediaProductionService = React.lazy(() => import('./MediaProductionService'));
const ITHardwareService = React.lazy(() => import('./ITHardwareService'));
const CyberSecurityService = React.lazy(() => import('./CyberSecurityService'));
const SocialMediaService = React.lazy(() => import('./SocialMediaService'));
const ConsultationService = React.lazy(() => import('./ConsultationService'));
const ContentStrategyService = React.lazy(() => import('./ContentStrategyService'));
const SeoOptimizationService = React.lazy(() => import('./SeoOptimizationService'));
const UiUxDesignService = React.lazy(() => import('./UiUxDesignService'));

// Map URL slugs to actual components
const serviceMap: Record<string, React.FC<{ locationOverride?: string }>> = {
    'web-development': WebDevService,
    'digital-marketing': DigitalMarketingService,
    'media-production': MediaProductionService,
    'it-hardware': ITHardwareService,
    'security': CyberSecurityService,
    'social': SocialMediaService,
    'consultation': ConsultationService,
    'content': ContentStrategyService,
    'seo': SeoOptimizationService,
    'design': UiUxDesignService,
};

// Global loading spinner for Suspense
const PageLoader = () => (
    <div className="flex w-full h-screen items-center justify-center bg-background dark:bg-[#111]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
);

/**
 * Higher-Order Component that catches /in/:location/:serviceId
 * It parses the location, formats it nicely (e.g., 'delhi-ncr' -> 'Delhi NCR'),
 * and passes it down as a `locationOverride` prop to the actual service component.
 */
export default function LocalizedServiceWrapper() {
    const { location, serviceId } = useParams<{ location: string; serviceId: string }>();

    if (!location || !serviceId) {
        return <Navigate to="/services" replace />;
    }

    // Check if the requested service exists in our map
    const ServiceComponent = serviceMap[serviceId.toLowerCase()];

    if (!ServiceComponent) {
        return <Navigate to="/services" replace />;
    }

    // Format location string: 'new-delhi' -> 'New Delhi'
    const formattedLocation = location
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return (
        <Suspense fallback={<PageLoader />}>
            {/* 
              We pass the formatted location to the underlying service component.
              The component itself is responsible for updating its <SEOHead> 
              and h1/text elements to include this location.
            */}
            <ServiceComponent locationOverride={formattedLocation} />
        </Suspense>
    );
}
