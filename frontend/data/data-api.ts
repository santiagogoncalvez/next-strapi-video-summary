import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_TIMEOUT = 8000;

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
   try {
      const { data } = await axios({
         timeout: DEFAULT_TIMEOUT,
         ...config,
      });

      // console.log("request from api", data);

      return data;
   } catch (error) {
      console.error("API Request Error:", {
         method: config.method,
         url: config.url,
         status: axios.isAxiosError(error) ? error.response?.status : undefined,
      });

      if (axios.isAxiosError(error)) {
         if (error.response?.data) {
            throw error.response.data;
         }

         if (error.code === "ECONNABORTED") {
            throw {
               error: {
                  status: 408,
                  name: "TimeoutError",
                  message: "The request timed out. Please try again.",
               },
            };
         }
      }

      throw error;
   }
}

export const api = {
   get: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({
         method: "GET",
         url,
         ...config,
      }),

   post: <T, P>(url: string, data: P, config?: AxiosRequestConfig) =>
      request<T>({
         method: "POST",
         url,
         data,
         ...config,
      }),

   put: <T, P>(url: string, data: P, config?: AxiosRequestConfig) =>
      request<T>({
         method: "PUT",
         url,
         data,
         ...config,
      }),

   patch: <T, P>(url: string, data: P, config?: AxiosRequestConfig) =>
      request<T>({
         method: "PATCH",
         url,
         data,
         ...config,
      }),

   delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({
         method: "DELETE",
         url,
         ...config,
      }),
};
