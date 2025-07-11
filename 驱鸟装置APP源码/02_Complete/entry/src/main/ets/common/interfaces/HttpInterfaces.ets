import { http } from "@kit.NetworkKit";

// 定义请求数据接口
export interface LaunchRequestData {
  target_device: string;
  horizon_angle: number;
  vertical_angle: number;
}

// 定义请求选项接口
interface GeneratedTypeLiteralInterface_1 {
  'Content-Type': string;
}

export interface HttpRequestOptions {
  method: http.RequestMethod;
  header: GeneratedTypeLiteralInterface_1;
  extraData: string;
}

// 添加 HTTP 响应接口
export interface HttpResponse {
  responseCode: number;
  result: string;
  header: Object;
  cookies: string[];
}

// 添加错误处理接口
export interface ErrorResponse {
  code: number;
  message: string;
}

// 添加提示配置接口
export interface ToastOptions {
  message: string;
  duration?: number;
  bottom?: string;
} 