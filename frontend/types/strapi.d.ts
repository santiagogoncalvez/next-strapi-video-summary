export interface StrapiHeroSection {
    heading: string;
    subHeading: string;
    link: { href: string; label: string };
    secondaryLink: { href: string; label: string };
    image: { url: string; alternativeText: string };
};

export interface BaseParams {
    [key: string]: string | string[] | undefined;
}

export interface RouteParams extends BaseParams {
    documentId?: string;
}

export type Params = Promise<RouteParams>;
export type SearchParams = Promise<BaseParams>;

export type Image = {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
};

export type Link = {
    id: number;
    href: string;
    label: string;
    isExternal?: boolean;
};

export type Feature = {
    id: number;
    heading: string;
    subHeading: string;
    icon: string;
};

export type HomePage = {
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: any; // we will change this soon
};

export type Header = {
    logoText: Link;
    ctaButton: Link;
};

export type Footer = {
    logoText: Link;
    text: string;
    socialLink: Link[];
};

export type Global = {
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    header: Header;
    footer: Footer;
};

export type MetaData = {
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type Summary = {
    documentId: string;
    videoId: string;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type AuthUser = {
    id: number;
    documentId: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    credits?: number;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type StrapiResponse<T = null> = {
    success: boolean;
    data?: T;
    error?: {
        status: number;
        name: string;
        message: string;
        details?: Record<string, string[]>;
    };
    meta?: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
    status: number;
};

export interface HeroSectionProps {
    id: number;
    documentId: string;
    __component: string;
    heading: string;
    subHeading: string;
    image: Image;
    link: Link;
    secondaryLink: Link;
}

interface StrapiMediaProps {
    src: string;
    alt: string | null;
    height?: number;
    width?: number;
    className?: string;
    fill?: boolean;
    priority?: boolean;
}