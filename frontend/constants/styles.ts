import { cva } from "class-variance-authority"


export const BUTTON_VARIANTS = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/80",
                outline:
                    "border-foreground/10 bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
                ghost:
                    "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default:
                    "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                icon: "size-8",
                "icon-xs":
                    "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                "icon-sm":
                    "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
                "icon-lg": "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export const SIGN_UP_FORM_STYLES = {
   container: "w-full max-w-md flex flex-col gap-4 justify-center items-center",
   header: "space-y-1",
   title: "text-3xl font-bold text-center",
   content: "space-y-4",
   fieldGroup: "space-y-2",
   footer: "flex flex-col",
   button: "w-full",
   prompt: "mt-0 text-center text-sm",
   link: "ml-2",
};

export const SIGN_IN_FORM_STYLES = {
    container: "w-full max-w-md flex flex-col gap-4 justify-center items-center",
   header: "space-y-1",
   title: "text-3xl font-bold text-center",
   content: "space-y-4",
   fieldGroup: "space-y-2",
   footer: "flex flex-col",
   button: "w-full",
   prompt: "mt-0 text-center text-sm",
   link: "ml-2",
};

export const HERO_SECTION_STYLES = {
    header: "relative h-[500px] rounded-2xl overflow-hidden rounded-4xl",
    backgroundImage: "absolute inset-0 object-cover w-full h-full ",
    overlay:
        "relative flex flex-col items-center justify-center h-full text-center",
    heading: "text-black text-4xl font-bold md:text-5xl lg:text-6xl",
    subheading: "mt-8 text-black text-lg md:text-xl lg:text-2xl",
    button: "mt-8 ",
};