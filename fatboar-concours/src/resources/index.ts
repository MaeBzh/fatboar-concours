import { router } from "@/plugins";
import axios from "axios";
import { AuthResource } from "./auth.resource";
import { CashRegisterResource } from "./cash-register.resource";
import { ClientResource } from "./client.resource";
import { EmailingListResource } from "./emailing-list.resource";
import { EmployeeResource } from "./employee.resource";
import { GameResource } from "./game.resource";
import { GiftResource } from "./gift.resource";
import { RestaurantResource } from "./restaurant.resource";
import { WinningTicketResource } from "./winning-ticket.resource";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

http.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    return {
      ...config,
      headers: {
        ...(config.headers ?? {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        "Access-Control-Allow-Origin": "*",
      },
    };
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403 || error.response.data.status === 403) {
      router.push({ name: "login" });
    }
    return Promise.reject({
      status: error.response.status,
      ...error.response.data,
    });
  }
);

export const authResource = new AuthResource(http);
export const cashRegisterResource = new CashRegisterResource(http);
export const clientResource = new ClientResource(http);
export const emailingListResource = new EmailingListResource(http);
export const employeeResource = new EmployeeResource(http);
export const giftResource = new GiftResource(http);
export const restaurantResource = new RestaurantResource(http);
export const winningTicketResource = new WinningTicketResource(http);
export const gameResource = new GameResource(http);
