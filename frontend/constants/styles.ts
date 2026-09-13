import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const BUTTON_VARIANTS = cva(
   "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:cursor-pointer",
   {
      variants: {
         variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            "default-dark":
               "bg-primary-foreground text-primary hover:bg-primary-foreground/80",
            outline:
               "border-foreground/10 bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            highlighted:
               "border-muted-foreground/40 bg-secondary hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
            secondary:
               "bg-secondary text-secondary-foreground hover:bg-secondary/90 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            "ghost-dark":
               "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground aria-expanded:bg-primary-foreground/10 aria-expanded:text-primary-foreground",
            destructive:
               "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline",
            subtle:
               "text-sm text-muted-foreground transition-colors hover:text-foreground",
            none: "",
         },
         size: {
            default:
               "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-xl has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-xl has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8 rounded-lg",
            "icon-xs":
               "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm":
               "size-7 rounded-[min(var(--radius-xs),12px)] in-data-[slot=button-group]:rounded-xs rounded-xs",
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
   content: "space-y-4 mt-4",
   fieldGroup: "",
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
   fieldGroup: "",
   footer: "flex flex-col space-y-4",
   button: "w-full",
   prompt:
      "mt-0 text-center text-sm flex flex-wrap justify-center items-center gap-2",
   link: "ml-2",
};

export const HERO_SECTION_STYLES = {
   header:
      "relative  border-0 rounded-b-none rounded-3xl overflow-hidden rounded-4xl flex justify-center items-center",
   backgroundImage: "absolute inset-0 object-cover w-full h-full ",
   overlay:
      "relative flex flex-col items-center justify-center h-full text-center bg-background/0 md:py-20 py-16 px-4 max-w-2xl",
   heading: "text-foreground text-4xl font-medium md:text-5xl lg:text-6xl",
   subheading: "mt-8 text-foreground text-lg md:text-lg lg:text-xl text-pretty",
   button: "mt-8 ",
};

export const PROFILE_FORM_STYLES = {
   form: "w-full",
   container: "w-full max-w-2xl flex flex-col gap-4 justify-center items-start",

   title: "sm:text-2xl text-xl  font-medium",

   content: "space-y-4",

   fieldGroup: "w-full",

   nameRow: "flex flex-col gap-4 md:flex-row",

   footer: "flex flex-col space-y-4",

   textarea: "min-h-56 resize-none",

   countBox:
      "flex items-center justify-center h-10 w-full rounded-xl border border-input/80 bg-transparent px-3 py-1 text-sm transition-colors",

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
   fieldGroup: "",
   footer: "flex flex-col space-y-4",
   button: "mr-2",
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

   fieldGroup: "",

   editor: "font-sans!",

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
