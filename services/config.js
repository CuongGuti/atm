const NODE_ENV = process.env.NODE_ENV
const ASSET_HOST = process.env.ASSET_HOST || ''

const danhSachMa = {
  googleMapKey: 'AIzaSyDQrRAKoLYLOFTeedvoY883VoW-b2XLh7k',
}

const prefixHTTP = 'https://'

const thuocTinhCauHinhChung = {
  googleAnalytics: false,
  googleTagManager: false,
  googleMapAPI: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
  apiATM: prefixHTTP + 'vkizkrqfhsxuywsmecck.supabase.co/rest/',
  apiATMKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraXprcnFmaHN4dXl3c21lY2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MTM0MjksImV4cCI6MjA0OTI4OTQyOX0.aomhu4iSNkvK5k5znrfU2OJ6KnB_ftcEpTrRgMABA9w',
  ...danhSachMa,
}

if (NODE_ENV === 'production') {
  // PROD
}

const apiProps = {
  baseURL: '',
  apiKey: '',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${thuocTinhCauHinhChung.apiATMKey}`,
    apiKey: thuocTinhCauHinhChung.apiATMKey,
  },
  timeout: 30000,
}

export const API_ATM = {
  ...apiProps,
  baseURL: thuocTinhCauHinhChung.apiATM,
  apiKey: thuocTinhCauHinhChung.apiATMKey,
}

const thuocTinhCDN = {
  baseURL: ASSET_HOST + '/assets',
}

export const CDN = {
  baseURL: thuocTinhCDN.baseURL,
  hinhDaiDien: thuocTinhCDN.baseURL + '/images/icon.png',
  hinhAnh: thuocTinhCDN.baseURL + '/images/icon.png',
}

export const CONFIG = thuocTinhCauHinhChung
