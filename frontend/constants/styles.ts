import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const BUTTON_VARIANTS = cva(
   "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:cursor-pointer",
   {
      variants: {
         variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline:
               "border-foreground/10 bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary:
               "bg-secondary text-secondary-foreground hover:bg-secondary/90 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive:
               "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline",
            none: "",
         },
         size: {
            default:
               "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs":
               "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm":
               "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9",
            none: "",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
);

export const SIGN_UP_FORM_STYLES = {
   container: "w-full max-w-sm flex flex-col gap-4 justify-center items-center",
   header: "space-y-1",
   title: "sm:text-2xl text-xl  font-medium text-center",
   content: "space-y-4",
   fieldGroup: "space-y-2",
   footer: "flex flex-col space-y-4",
   button: "w-full",
   prompt:
      "mt-0 text-center text-sm flex flex-wrap justify-center items-center gap-2",
   link: "ml-2",
};

export const SIGN_IN_FORM_STYLES = {
   container: "w-full max-w-sm flex flex-col gap-4 justify-center items-center",
   header: "space-y-1",
   title: "sm:text-2xl text-xl  font-medium text-center",
   content: "space-y-4",
   fieldGroup: "space-y-2",
   footer: "flex flex-col space-y-4",
   button: "w-full",
   prompt:
      "mt-0 text-center text-sm flex flex-wrap justify-center items-center gap-2",
   link: "ml-2",
};

export const HERO_SECTION_STYLES = {
   header: "relative h-[500px] rounded-2xl overflow-hidden rounded-4xl",
   backgroundImage: "absolute inset-0 object-cover w-full h-full ",
   overlay:
      "relative flex flex-col items-center justify-center h-full text-center bg-white/0 md:p-8 p-4",
   heading: "text-black text-4xl font-medium md:text-5xl lg:text-6xl",
   subheading: "mt-8 text-black text-lg md:text-xl lg:text-2xl text-pretty",
   button: "mt-8 ",
};

export const FEATURES_SECTION_STYLES = {
   container: "flex-1",
   section: "container px-4 py-12 md:px-6 lg:py-24",
   grid: "grid gap-8 md:grid-cols-3",
   featureCard: "flex flex-col items-center text-center",
   icon: "w-12 h-12 mb-4 text-gray-900",
   heading: "mb-4 text-2xl font-medium",
   description: "text-gray-500",
};

export const FOOTER_STYLES = {
   footer:
      "w-full border-t border-t-foreground/10  text-black flex justify-center",
   container:
      "w-full md:px-8 px-4 flex flex-col md:flex-row items-center md:justify-between justify-center md:gap-0 gap-2",
   text: "text-sm text-gray-800 text-center",
   socialContainer: "md:w-40 w-fit flex justify-end gap-4",
   socialLink: "transition-all hover:text-gray-800",
   icon: "h-6 w-6",
   srOnly: "sr-only",
};

export const NOT_FOUND_STYLES = {
   container:
      "bg-gradient-to-br flex items-center justify-center p-16 w-full h-full flex-1",
   content: "w-full max-w-2xl  text-center space-y-8",
   textSection: "space-y-4",
   heading404:
      "text-black text-2xl font-medium md:text-3xl lg:text-4xl select-none",
   headingContainer: "relative flex flex-col items-center justify-center",
   pageTitle: "sm:text-2xl text-xl  font-normal text-gray-800 mb-4",
   description: "text-lg text-gray-600 max-w-md  leading-relaxed",
   illustrationContainer: "flex justify-center",
   illustration: "relative animate-pulse",
   searchCircle:
      "w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-300",
   searchIcon: "w-8 h-8 text-gray-400",
   errorBadge:
      "absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center animate-bounce",
   errorSymbol: "text-gray-500 text-xs font-medium",
   buttonContainer:
      "flex flex-col sm:flex-row gap-4 justify-center items-center",
   button: "min-w-[160px]",
   buttonContent: "flex items-center gap-2",
   buttonIcon: "w-4 h-4",
   outlineButton: "min-w-[160px] bg-transparent",
   errorDetails:
      "mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left text-sm text-red-800",
   errorTitle: "font-medium mb-2",
};

export const LOADING_STYLES = {
   overlay:
      "fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60",
   spinner: "animate-spin h-12 w-12",
};

export const PROFILE_FORM_STYLES = {
   form: "w-full",
   container: "w-full max-w-2xl flex flex-col gap-4 justify-center items-start",

   title: "sm:text-2xl text-xl  font-medium",

   content: "space-y-4",

   fieldGroup: "space-y-2 w-full",

   nameRow: "flex flex-col gap-4 md:flex-row",

   footer: "flex flex-col space-y-4",

   textarea: "min-h-56 resize-none",

   countBox:
      "flex items-center justify-center h-10 w-full rounded-lg border border-input/80 bg-transparent px-3 py-1 text-sm transition-colors",

   creditText: "font-medium text-md mx-1",

   button: "w-full",
};

export const IMAGE_FORM_STYLES = {
   container: "w-full max-w-2xl flex flex-col gap-4 justify-start items-center",
   fieldGroup: "space-y-2 w-full flex flex-col justify-center items-center",
};

export const SUMMARY_FORM_STYLES = {
   container:
      "w-full max-w-2xl flex flex-col gap-4 justify-center items-center",
   header: "space-y-1",
   title: "sm:text-2xl text-xl  font-medium text-center text-pretty",
   content: "space-y-4",
   fieldGroup: "space-y-2",
   footer: "flex flex-col space-y-4",
   button: "absolute top-1/2 -translate-y-1/2 right-3",
   prompt:
      "mt-0 text-center text-sm flex flex-wrap justify-center items-center gap-2",
   link: "ml-2",
};

export const SUMMARY_UPDATE_FORM_STYLES = {
   container:
      "w-full max-w-2xl flex flex-col gap-4 justify-center items-center",
   content: "flex flex-col gap-y-4",
   header: "space-y-1",
   title: "sm:text-2xl text-xl  font-medium text-start",

   fieldGroup: "space-y-2",

   editor: "font-geist!",

   footer: "flex flex-col justify-center items-center  gap-4",

   submitButton: "w-full",

   deleteButton: "font-normal w-full justify-start hover:cursor-pointer",
};

export const SUMMARY_GRID_STYLES = {
   grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

   card: cn(" relative flex h-full flex-col bg-card-surface!", "p-4!"),

   header: "flex flex-row gap-2 items-start justify-between",

   title: cn(
      "line-clamp-2",
      "text-base leading-snug",
      "group-hover:text-primary transition-colors",
   ),

   content: "flex-1 relative overflow-hidden",

   markdown: cn(
      "prose prose-sm max-w-none",
      "prose-headings:hidden",
      "prose-p:text-muted-foreground",
      "prose-p:leading-relaxed",
      "prose-p:mb-2",
      "prose-ul:text-muted-foreground",
      "prose-ol:text-muted-foreground",
      "prose-li:mb-1",
      "[&>*:nth-child(n+3)]:hidden",
   ),

   footer:
      "py-0 text-sm text-muted-foreground/80 flex flex-row justify-start items-center gap-2",
};

export const THUMBNAIL_AVATAR_VARIANTS = cva(
   "aspect-video rounded-sm object-cover",
   {
      variants: {
         size: {
            xs: "h-4 w-auto",
            sm: "h-6 w-auto",
            default: "h-8 w-auto",
            md: "h-10 w-auto",
            lg: "h-12 w-auto",
         },
      },
      defaultVariants: {
         size: "default",
      },
   },
);
