import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString('en-US')}`
}

// 遠端圖片載入完成前先鋪一層淺灰底，避免出現破圖
// 必須是點陣圖：next/image 會把這張圖塞進它自己的模糊 SVG 的 <image href> 裡，
// 而 SVG 當背景圖時是 secure static mode，巢狀 SVG 不會被渲染（畫面會整片空白）
// 8x8 #EBEBEB 純色 PNG
export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIUlEQVR4AdzKMQ0AABDCwA/+nVbE4wB2mnQ7AZ/WlTaAAQAA//8VLKDUAAAABklEQVQDAAwTHhFcJdbSAAAAAElFTkSuQmCC'
