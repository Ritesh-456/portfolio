import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
    type?: string;
    keywords?: string;
}

export default function SEO({
    title = "Ritesh Brahmachari - Portfolio | Full Stack Developer & Data Analyst",
    description = "Portfolio of Ritesh Brahmachari, a Full Stack Developer and Data Analyst specializing in modern web technologies and data-driven insights.",
    name = "Ritesh Brahmachari",
    type = "website",
    keywords = "Ritesh Brahmachari, Full Stack Developer, Data Analyst, Software Engineer, React, Node.js, Python, Portfolio, Web Development, Data Science, AI Engineering"
}: SEOProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": name,
        "url": window.location.href, // or hardcode if preferred
        "jobTitle": ["Full Stack Developer", "Data Analyst"],
        "sameAs": [
            "https://github.com/Ritesh-456",
            "https://linkedin.com/in/ritesh-brahmachari-1b7b84278/"
        ],
        "description": description
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
            <meta name='author' content={name} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:image" content={image} /> Add image prop if needed later */}
            <meta property="og:url" content={window.location.href} />

            {/* Twitter */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
