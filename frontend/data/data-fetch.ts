// data/data-fetch.ts

const DEFAULT_TIMEOUT = 8000;

type FetchConfig = RequestInit & {
   next?: {
      revalidate?: number;
   };
};

type ApiError = {
   error: {
      status: number;
      name: string;
      message: string;
      data?: unknown;
   };
};

export async function request<T>(
   url: string,
   config?: FetchConfig,
): Promise<T> {
   const controller = new AbortController();

   const timeout = setTimeout(() => {
      controller.abort();
   }, DEFAULT_TIMEOUT);

   try {
      const response = await fetch(url, {
         ...config,
         signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
         throw {
            error: {
               status: response.status,
               name: "ApiError",
               message:
                  data?.error?.message ??
                  "Something went wrong with the request.",
               data,
            },
         } satisfies ApiError;
      }

      return data as T;
   } catch (error) {
      clearTimeout(timeout);

      console.error("API Request Error:", {
         url,
         method: config?.method,
         status:
            typeof error === "object" && error !== null && "error" in error
               ? (error as ApiError).error.status
               : undefined,
      });

      if (error instanceof DOMException && error.name === "AbortError") {
         throw {
            error: {
               status: 408,
               name: "TimeoutError",
               message: "The request timed out. Please try again.",
            },
         } satisfies ApiError;
      }

      throw error;
   }
}

export const apiFetch = {
   get: <T>(url: string, config?: FetchConfig) =>
      request<T>(url, {
         method: "GET",
         ...config,
      }),

   post: <T, P>(url: string, data: P, config?: FetchConfig) =>
      request<T>(url, {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         },
         ...config,
      }),

   put: <T, P>(url: string, data: P, config?: FetchConfig) =>
      request<T>(url, {
         method: "PUT",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         },
         ...config,
      }),

   patch: <T, P>(url: string, data: P, config?: FetchConfig) =>
      request<T>(url, {
         method: "PATCH",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         },
         ...config,
      }),

   delete: <T>(url: string, config?: FetchConfig) =>
      request<T>(url, {
         method: "DELETE",
         ...config,
      }),
};
