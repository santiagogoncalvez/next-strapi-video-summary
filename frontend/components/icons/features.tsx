export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="1"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <polyline points="20 6 9 17 4 12" />
      </svg>
   );
}

export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="1"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <circle cx="12" cy="12" r="10" />
         <polyline points="12 6 12 12 16 14" />
      </svg>
   );
}

export function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="1"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
   );
}
