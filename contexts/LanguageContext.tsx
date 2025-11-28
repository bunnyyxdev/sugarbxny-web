'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'th' | 'en' | 'zh' | 'ja'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Wishlist',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.admin': 'Admin',
    
    // Common
    'common.addToCart': 'Add to Cart',
    'common.viewDetails': 'View Details',
    'common.quickView': 'Quick View',
    'common.price': 'Price',
    'common.stock': 'Stock',
    'common.inStock': 'In Stock',
    'common.outOfStock': 'Out of Stock',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.category': 'Category',
    'common.allCategories': 'All Categories',
    'common.sortBy': 'Sort By',
    'common.newest': 'Newest First',
    'common.priceLowToHigh': 'Price: Low to High',
    'common.priceHighToLow': 'Price: High to Low',
    'common.nameAZ': 'Name (A-Z)',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Products
    'products.title': 'All Products',
    'products.description': 'Browse our complete catalog of virtual products and services',
    'products.noProducts': 'No Products Available',
    'products.noProductsDesc': 'There are no available products for sale right now.',
    'products.recentlyViewed': 'Recently Viewed Products',
    'products.related': 'Related Products',
    'products.addToWishlist': 'Add to Wishlist',
    'products.removeFromWishlist': 'Remove from Wishlist',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.vat': 'VAT (7%)',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    
    // Wishlist
    'wishlist.title': 'My Wishlist',
    'wishlist.empty': 'Your Wishlist is Empty',
    'wishlist.emptyDesc': 'Start adding products you love to your wishlist!',
    'wishlist.clearAll': 'Clear All',
    
    // Stock Notifications
    'stock.notifyMe': 'Notify Me When Available',
    'stock.notifySuccess': 'You will be notified when this product is back in stock',
    'stock.alreadyNotified': 'You are already subscribed to notifications for this product',
    'stock.email': 'Email Address',
    'stock.subscribe': 'Subscribe',
    
    // Order Tracking
    'order.tracking': 'Order Tracking',
    'order.status': 'Status',
    'order.orderNumber': 'Order Number',
    'order.date': 'Order Date',
    'order.total': 'Total',
    'order.items': 'Items',
    'order.timeline': 'Order Timeline',
    'order.pending': 'Pending',
    'order.processing': 'Processing',
    'order.shipped': 'Shipped',
    'order.delivered': 'Delivered',
    'order.cancelled': 'Cancelled',
  },
  th: {
    // Navigation
    'nav.home': 'หน้าแรก',
    'nav.products': 'สินค้า',
    'nav.cart': 'ตะกร้า',
    'nav.wishlist': 'รายการโปรด',
    'nav.dashboard': 'แดชบอร์ด',
    'nav.login': 'เข้าสู่ระบบ',
    'nav.register': 'สมัครสมาชิก',
    'nav.logout': 'ออกจากระบบ',
    'nav.admin': 'ผู้ดูแล',
    
    // Common
    'common.addToCart': 'เพิ่มลงตะกร้า',
    'common.viewDetails': 'ดูรายละเอียด',
    'common.quickView': 'ดูด่วน',
    'common.price': 'ราคา',
    'common.stock': 'สต็อก',
    'common.inStock': 'มีสินค้า',
    'common.outOfStock': 'สินค้าหมด',
    'common.search': 'ค้นหา',
    'common.filter': 'กรอง',
    'common.category': 'หมวดหมู่',
    'common.allCategories': 'ทุกหมวดหมู่',
    'common.sortBy': 'เรียงตาม',
    'common.newest': 'ใหม่ล่าสุด',
    'common.priceLowToHigh': 'ราคา: ต่ำไปสูง',
    'common.priceHighToLow': 'ราคา: สูงไปต่ำ',
    'common.nameAZ': 'ชื่อ (A-Z)',
    'common.loading': 'กำลังโหลด...',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.success': 'สำเร็จ',
    'common.close': 'ปิด',
    'common.save': 'บันทึก',
    'common.cancel': 'ยกเลิก',
    'common.delete': 'ลบ',
    'common.edit': 'แก้ไข',
    'common.back': 'กลับ',
    'common.next': 'ถัดไป',
    'common.previous': 'ก่อนหน้า',
    
    // Products
    'products.title': 'สินค้าทั้งหมด',
    'products.description': 'เรียกดูแคตตาล็อกสินค้าและบริการเสมือนจริงทั้งหมดของเรา',
    'products.noProducts': 'ไม่มีสินค้า',
    'products.noProductsDesc': 'ไม่มีสินค้าที่พร้อมจำหน่ายในขณะนี้',
    'products.recentlyViewed': 'สินค้าที่ดูล่าสุด',
    'products.related': 'สินค้าที่เกี่ยวข้อง',
    'products.addToWishlist': 'เพิ่มในรายการโปรด',
    'products.removeFromWishlist': 'ลบออกจากรายการโปรด',
    
    // Cart
    'cart.title': 'ตะกร้าสินค้า',
    'cart.empty': 'ตะกร้าของคุณว่างเปล่า',
    'cart.subtotal': 'ยอดรวม',
    'cart.vat': 'ภาษีมูลค่าเพิ่ม (7%)',
    'cart.total': 'รวมทั้งหมด',
    'cart.checkout': 'ชำระเงิน',
    
    // Wishlist
    'wishlist.title': 'รายการโปรดของฉัน',
    'wishlist.empty': 'รายการโปรดของคุณว่างเปล่า',
    'wishlist.emptyDesc': 'เริ่มเพิ่มสินค้าที่คุณชอบลงในรายการโปรด!',
    'wishlist.clearAll': 'ลบทั้งหมด',
    
    // Stock Notifications
    'stock.notifyMe': 'แจ้งเตือนเมื่อมีสินค้า',
    'stock.notifySuccess': 'คุณจะได้รับการแจ้งเตือนเมื่อสินค้านี้กลับมามีสต็อก',
    'stock.alreadyNotified': 'คุณได้สมัครรับการแจ้งเตือนสำหรับสินค้านี้แล้ว',
    'stock.email': 'อีเมล',
    'stock.subscribe': 'สมัครรับการแจ้งเตือน',
    
    // Order Tracking
    'order.tracking': 'ติดตามออเดอร์',
    'order.status': 'สถานะ',
    'order.orderNumber': 'หมายเลขออเดอร์',
    'order.date': 'วันที่สั่งซื้อ',
    'order.total': 'รวมทั้งหมด',
    'order.items': 'รายการ',
    'order.timeline': 'ไทม์ไลน์ออเดอร์',
    'order.pending': 'รอดำเนินการ',
    'order.processing': 'กำลังดำเนินการ',
    'order.shipped': 'จัดส่งแล้ว',
    'order.delivered': 'ส่งมอบแล้ว',
    'order.cancelled': 'ยกเลิก',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.cart': '购物车',
    'nav.wishlist': '愿望清单',
    'nav.dashboard': '仪表板',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.logout': '登出',
    'nav.admin': '管理员',
    
    // Common
    'common.addToCart': '加入购物车',
    'common.viewDetails': '查看详情',
    'common.quickView': '快速查看',
    'common.price': '价格',
    'common.stock': '库存',
    'common.inStock': '有货',
    'common.outOfStock': '缺货',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.category': '类别',
    'common.allCategories': '所有类别',
    'common.sortBy': '排序方式',
    'common.newest': '最新',
    'common.priceLowToHigh': '价格：从低到高',
    'common.priceHighToLow': '价格：从高到低',
    'common.nameAZ': '名称 (A-Z)',
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.close': '关闭',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.back': '返回',
    'common.next': '下一步',
    'common.previous': '上一步',
    
    // Products
    'products.title': '所有产品',
    'products.description': '浏览我们完整的虚拟产品和服务目录',
    'products.noProducts': '暂无产品',
    'products.noProductsDesc': '目前没有可用的产品',
    'products.recentlyViewed': '最近查看的产品',
    'products.related': '相关产品',
    'products.addToWishlist': '添加到愿望清单',
    'products.removeFromWishlist': '从愿望清单中移除',
    
    // Cart
    'cart.title': '购物车',
    'cart.empty': '您的购物车是空的',
    'cart.subtotal': '小计',
    'cart.vat': '增值税 (7%)',
    'cart.total': '总计',
    'cart.checkout': '结账',
    
    // Wishlist
    'wishlist.title': '我的愿望清单',
    'wishlist.empty': '您的愿望清单是空的',
    'wishlist.emptyDesc': '开始将您喜欢的产品添加到愿望清单！',
    'wishlist.clearAll': '全部清除',
    
    // Stock Notifications
    'stock.notifyMe': '有货时通知我',
    'stock.notifySuccess': '当此产品重新有货时，您将收到通知',
    'stock.alreadyNotified': '您已订阅此产品的通知',
    'stock.email': '电子邮件地址',
    'stock.subscribe': '订阅',
    
    // Order Tracking
    'order.tracking': '订单跟踪',
    'order.status': '状态',
    'order.orderNumber': '订单号',
    'order.date': '订单日期',
    'order.total': '总计',
    'order.items': '项目',
    'order.timeline': '订单时间线',
    'order.pending': '待处理',
    'order.processing': '处理中',
    'order.shipped': '已发货',
    'order.delivered': '已交付',
    'order.cancelled': '已取消',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.products': '商品',
    'nav.cart': 'カート',
    'nav.wishlist': 'ウィッシュリスト',
    'nav.dashboard': 'ダッシュボード',
    'nav.login': 'ログイン',
    'nav.register': '登録',
    'nav.logout': 'ログアウト',
    'nav.admin': '管理者',
    
    // Common
    'common.addToCart': 'カートに追加',
    'common.viewDetails': '詳細を見る',
    'common.quickView': 'クイックビュー',
    'common.price': '価格',
    'common.stock': '在庫',
    'common.inStock': '在庫あり',
    'common.outOfStock': '在庫切れ',
    'common.search': '検索',
    'common.filter': 'フィルター',
    'common.category': 'カテゴリー',
    'common.allCategories': 'すべてのカテゴリー',
    'common.sortBy': '並び替え',
    'common.newest': '新着順',
    'common.priceLowToHigh': '価格：安い順',
    'common.priceHighToLow': '価格：高い順',
    'common.nameAZ': '名前 (A-Z)',
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.success': '成功',
    'common.close': '閉じる',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.delete': '削除',
    'common.edit': '編集',
    'common.back': '戻る',
    'common.next': '次へ',
    'common.previous': '前へ',
    
    // Products
    'products.title': 'すべての商品',
    'products.description': 'バーチャル製品とサービスの完全なカタログを閲覧',
    'products.noProducts': '商品がありません',
    'products.noProductsDesc': '現在利用可能な商品はありません',
    'products.recentlyViewed': '最近閲覧した商品',
    'products.related': '関連商品',
    'products.addToWishlist': 'ウィッシュリストに追加',
    'products.removeFromWishlist': 'ウィッシュリストから削除',
    
    // Cart
    'cart.title': 'ショッピングカート',
    'cart.empty': 'カートは空です',
    'cart.subtotal': '小計',
    'cart.vat': '消費税 (7%)',
    'cart.total': '合計',
    'cart.checkout': 'チェックアウト',
    
    // Wishlist
    'wishlist.title': 'マイウィッシュリスト',
    'wishlist.empty': 'ウィッシュリストは空です',
    'wishlist.emptyDesc': 'お気に入りの商品をウィッシュリストに追加しましょう！',
    'wishlist.clearAll': 'すべてクリア',
    
    // Stock Notifications
    'stock.notifyMe': '入荷時に通知',
    'stock.notifySuccess': 'この商品が再入荷されたら通知されます',
    'stock.alreadyNotified': 'この商品の通知を既に購読しています',
    'stock.email': 'メールアドレス',
    'stock.subscribe': '購読',
    
    // Order Tracking
    'order.tracking': '注文追跡',
    'order.status': 'ステータス',
    'order.orderNumber': '注文番号',
    'order.date': '注文日',
    'order.total': '合計',
    'order.items': 'アイテム',
    'order.timeline': '注文タイムライン',
    'order.pending': '保留中',
    'order.processing': '処理中',
    'order.shipped': '発送済み',
    'order.delivered': '配達済み',
    'order.cancelled': 'キャンセル済み',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language
      if (savedLang && ['th', 'en', 'zh', 'ja'].includes(savedLang)) {
        setLanguageState(savedLang)
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0]
        if (browserLang === 'th' || browserLang === 'zh' || browserLang === 'ja') {
          setLanguageState(browserLang as Language)
        }
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

