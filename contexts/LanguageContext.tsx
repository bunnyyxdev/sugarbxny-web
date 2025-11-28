'use client'

import { createContext, useContext, ReactNode } from 'react'

interface LanguageContextType {
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
    'products.pageDescription': 'Browse our complete catalog of virtual products and services',
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
    
    // Product Grid & Details
    'products.noProductsInCategory': 'No Products Available',
    'products.noProductsInCategoryDesc': 'There are no available products in this category right now.',
    'products.stayTuned': 'Stay tuned! New products will be available soon.',
    'products.uncategorized': 'Uncategorized',
    'products.noDescription': 'No description available',
    'products.inclVat': '(incl. VAT)',
    'products.available': 'available',
    'products.loginToBuy': 'Login to Buy',
    'products.details': 'Details',
    'products.outOfStockCannotPurchase': 'This product is out of stock and cannot be purchased.',
    'products.addedToCart': 'Product added to cart!',
    'products.removedFromWishlist': 'Removed from wishlist',
    'products.addedToWishlist': 'Added to wishlist!',
    'products.removeFromWishlistAria': 'Remove from wishlist',
    'products.addToWishlistAria': 'Add to wishlist',
    'products.inStockWithCount': 'In Stock',
    'products.basePrice': 'Base price',
    'products.description': 'Description',
    'products.noDescriptionForProduct': 'No description available for this product.',
    'products.viewFullDetails': 'View Full Details',
    'products.backToProducts': 'Back to Products',
    'products.loadingProduct': 'Loading product...',
    'products.failedToLoad': 'Failed to load product',
    'products.productNotFound': 'Product not found',
    'products.errorLoadingProduct': 'An error occurred while loading product',
    
    // Search & Filter
    'search.searchProducts': 'Search Products',
    'search.placeholder': 'Search by name, description, or category...',
    'search.priceRange': 'Price Range',
    'search.minPrice': 'Min Price',
    'search.maxPrice': 'Max Price',
    'search.clearAllFilters': 'Clear All Filters',
    
    // Products Page
    'productsPage.grid': 'Grid',
    'productsPage.table': 'Table',
    'productsPage.showing': 'Showing',
    'productsPage.of': 'of',
    'productsPage.products': 'products',
    'productsPage.noProductsFound': 'No Products Found',
    'productsPage.tryAdjusting': 'Try adjusting your search or filter criteria.',
    'productsPage.image': 'Image',
    'productsPage.productName': 'Product Name',
    'productsPage.action': 'Action',
    'productsPage.inStockWithCount': 'In Stock',
    
    // Cart Page
    'cart.reviewItems': 'Review your items and proceed to checkout',
    'cart.emptyTitle': 'Your Cart is Empty',
    'cart.emptyDesc': 'Start shopping to add items to your cart!',
    'cart.browseProducts': 'Browse Products',
    'cart.quantity': 'Quantity',
    'cart.each': 'each',
    'cart.orderSummary': 'Order Summary',
    'cart.subtotalItems': 'Subtotal',
    'cart.items': 'items',
    'cart.processing': 'Processing...',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    'cart.continueShopping': 'Continue Shopping',
    
    // Wishlist Page
    'wishlist.itemsSaved': 'items saved',
    'wishlist.itemSaved': 'item',
    'wishlist.clearAllConfirm': 'Are you sure you want to clear all items from your wishlist?',
    'wishlist.cleared': 'Wishlist cleared',
    'wishlist.view': 'View',
    
    // Quick View Modal
    'quickView.description': 'Description',
    
    // Footer
    'footer.companyDesc': 'Your premier destination for virtual products and services.',
    'footer.quickLinks': 'Quick Links',
    'footer.virtualAirlines': 'Virtual Airlines',
    'footer.bots': 'Bots',
    'footer.redeem': 'Redeem',
    'footer.reviews': 'Reviews',
    'footer.support': 'Support',
    'footer.contactUs': 'Contact Us',
    'footer.faq': 'FAQ',
    'footer.termsOfService': 'Terms of Service',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.workingHours': 'Working Hours',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookies',
    
    // Newsletter
    'newsletter.title': 'Subscribe to Our Newsletter',
    'newsletter.description': 'Get the latest updates on new products and exclusive offers.',
    'newsletter.email': 'Email Address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.success': 'Thank you for subscribing!',
    'newsletter.error': 'Please enter a valid email address.',
    'newsletter.alreadySubscribed': 'This email is already subscribed.',
    
    // Breadcrumbs
    'breadcrumbs.home': 'Home',
    
    // Related Products
    'relatedProducts.title': 'Related Products',
    'relatedProducts.noRelated': 'No related products found',
    
    // Error Boundary
    'error.somethingWentWrong': 'Something went wrong',
    'error.tryAgain': 'Try Again',
    'error.goHome': 'Go Home',
    
    // Stock Notification
    'stock.invalidEmail': 'Invalid email address',
    'stock.failedToSubscribe': 'Failed to subscribe. Please try again.',
    
    // Common Additional
    'common.uncategorized': 'Uncategorized',
    'common.noDescription': 'No description available',
    'common.inclVat': '(incl. VAT)',
    'common.available': 'available',
    'common.each': 'each',
    'common.items': 'items',
    'common.item': 'item',
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
    'products.pageDescription': 'เรียกดูแคตตาล็อกสินค้าและบริการเสมือนจริงทั้งหมดของเรา',
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
    
    // Product Grid & Details
    'products.noProductsInCategory': 'ไม่มีสินค้า',
    'products.noProductsInCategoryDesc': 'ไม่มีสินค้าในหมวดหมู่นี้ในขณะนี้',
    'products.stayTuned': 'รอติดตาม! สินค้าใหม่จะพร้อมจำหน่ายเร็วๆ นี้',
    'products.uncategorized': 'ไม่มีหมวดหมู่',
    'products.noDescription': 'ไม่มีคำอธิบาย',
    'products.inclVat': '(รวมภาษีมูลค่าเพิ่ม)',
    'products.available': 'มีสินค้า',
    'products.loginToBuy': 'เข้าสู่ระบบเพื่อซื้อ',
    'products.details': 'รายละเอียด',
    'products.outOfStockCannotPurchase': 'สินค้านี้หมดสต็อกและไม่สามารถซื้อได้',
    'products.addedToCart': 'เพิ่มสินค้าลงตะกร้าแล้ว!',
    'products.removedFromWishlist': 'ลบออกจากรายการโปรดแล้ว',
    'products.addedToWishlist': 'เพิ่มในรายการโปรดแล้ว!',
    'products.removeFromWishlistAria': 'ลบออกจากรายการโปรด',
    'products.addToWishlistAria': 'เพิ่มในรายการโปรด',
    'products.inStockWithCount': 'มีสินค้า',
    'products.basePrice': 'ราคาพื้นฐาน',
    'products.description': 'คำอธิบาย',
    'products.noDescriptionForProduct': 'ไม่มีคำอธิบายสำหรับสินค้านี้',
    'products.viewFullDetails': 'ดูรายละเอียดเต็ม',
    'products.backToProducts': 'กลับไปยังสินค้า',
    'products.loadingProduct': 'กำลังโหลดสินค้า...',
    'products.failedToLoad': 'โหลดสินค้าไม่สำเร็จ',
    'products.productNotFound': 'ไม่พบสินค้า',
    'products.errorLoadingProduct': 'เกิดข้อผิดพลาดขณะโหลดสินค้า',
    
    // Search & Filter
    'search.searchProducts': 'ค้นหาสินค้า',
    'search.placeholder': 'ค้นหาตามชื่อ คำอธิบาย หรือหมวดหมู่...',
    'search.priceRange': 'ช่วงราคา',
    'search.minPrice': 'ราคาต่ำสุด',
    'search.maxPrice': 'ราคาสูงสุด',
    'search.clearAllFilters': 'ล้างตัวกรองทั้งหมด',
    
    // Products Page
    'productsPage.grid': 'ตาราง',
    'productsPage.table': 'รายการ',
    'productsPage.showing': 'แสดง',
    'productsPage.of': 'จาก',
    'productsPage.products': 'สินค้า',
    'productsPage.noProductsFound': 'ไม่พบสินค้า',
    'productsPage.tryAdjusting': 'ลองปรับเกณฑ์การค้นหาหรือตัวกรองของคุณ',
    'productsPage.image': 'รูปภาพ',
    'productsPage.productName': 'ชื่อสินค้า',
    'productsPage.action': 'การดำเนินการ',
    'productsPage.inStockWithCount': 'มีสินค้า',
    
    // Cart Page
    'cart.reviewItems': 'ตรวจสอบรายการของคุณและดำเนินการชำระเงิน',
    'cart.emptyTitle': 'ตะกร้าของคุณว่างเปล่า',
    'cart.emptyDesc': 'เริ่มช้อปปิ้งเพื่อเพิ่มสินค้าลงในตะกร้าของคุณ!',
    'cart.browseProducts': 'เรียกดูสินค้า',
    'cart.quantity': 'จำนวน',
    'cart.each': 'ต่อชิ้น',
    'cart.orderSummary': 'สรุปออเดอร์',
    'cart.subtotalItems': 'ยอดรวม',
    'cart.items': 'รายการ',
    'cart.processing': 'กำลังดำเนินการ...',
    'cart.proceedToCheckout': 'ดำเนินการชำระเงิน',
    'cart.continueShopping': 'ช้อปปิ้งต่อ',
    
    // Wishlist Page
    'wishlist.itemsSaved': 'รายการที่บันทึก',
    'wishlist.itemSaved': 'รายการ',
    'wishlist.clearAllConfirm': 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการทั้งหมดออกจากรายการโปรดของคุณ?',
    'wishlist.cleared': 'ลบรายการโปรดทั้งหมดแล้ว',
    'wishlist.view': 'ดู',
    
    // Quick View Modal
    'quickView.description': 'คำอธิบาย',
    
    // Footer
    'footer.companyDesc': 'จุดหมายปลายทางชั้นนำของคุณสำหรับผลิตภัณฑ์และบริการเสมือนจริง',
    'footer.quickLinks': 'ลิงก์ด่วน',
    'footer.virtualAirlines': 'สายการบินเสมือน',
    'footer.bots': 'บอท',
    'footer.redeem': 'แลกของรางวัล',
    'footer.reviews': 'รีวิว',
    'footer.support': 'การสนับสนุน',
    'footer.contactUs': 'ติดต่อเรา',
    'footer.faq': 'คำถามที่พบบ่อย',
    'footer.termsOfService': 'เงื่อนไขการให้บริการ',
    'footer.privacyPolicy': 'นโยบายความเป็นส่วนตัว',
    'footer.contact': 'ติดต่อ',
    'footer.workingHours': 'เวลาทำการ',
    'footer.allRightsReserved': 'สงวนลิขสิทธิ์',
    'footer.terms': 'เงื่อนไข',
    'footer.privacy': 'ความเป็นส่วนตัว',
    'footer.cookies': 'คุกกี้',
    
    // Newsletter
    'newsletter.title': 'สมัครรับจดหมายข่าวของเรา',
    'newsletter.description': 'รับอัปเดตล่าสุดเกี่ยวกับสินค้าใหม่และข้อเสนอพิเศษ',
    'newsletter.email': 'อีเมล',
    'newsletter.subscribe': 'สมัครรับ',
    'newsletter.subscribing': 'กำลังสมัคร...',
    'newsletter.success': 'ขอบคุณที่สมัครรับ!',
    'newsletter.error': 'กรุณากรอกอีเมลที่ถูกต้อง',
    'newsletter.alreadySubscribed': 'อีเมลนี้สมัครรับแล้ว',
    
    // Breadcrumbs
    'breadcrumbs.home': 'หน้าแรก',
    
    // Related Products
    'relatedProducts.title': 'สินค้าที่เกี่ยวข้อง',
    'relatedProducts.noRelated': 'ไม่พบสินค้าที่เกี่ยวข้อง',
    
    // Error Boundary
    'error.somethingWentWrong': 'เกิดข้อผิดพลาด',
    'error.tryAgain': 'ลองอีกครั้ง',
    'error.goHome': 'กลับหน้าแรก',
    
    // Stock Notification
    'stock.invalidEmail': 'อีเมลไม่ถูกต้อง',
    'stock.failedToSubscribe': 'สมัครรับการแจ้งเตือนไม่สำเร็จ กรุณาลองอีกครั้ง',
    
    // Common Additional
    'common.uncategorized': 'ไม่มีหมวดหมู่',
    'common.noDescription': 'ไม่มีคำอธิบาย',
    'common.inclVat': '(รวมภาษีมูลค่าเพิ่ม)',
    'common.available': 'มีสินค้า',
    'common.each': 'ต่อชิ้น',
    'common.items': 'รายการ',
    'common.item': 'รายการ',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ t }}>
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

