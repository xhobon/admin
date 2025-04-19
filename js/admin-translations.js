/**
 * 管理后台多语言翻译文件
 * 支持中文、英文和印尼文
 */

// 翻译数据
const translations = {
    // 中文翻译
    'zh-CN': {
        // 通用
        'language': '语言',
        'logout': '退出登录',
        'profile': '个人资料',
        'settings': '设置',
        'visit-site': '访问网站',
        'view-details': '查看详情',
        'save-settings': '保存设置',
        'cancel': '取消',
        'notification': '通知',
        'all-rights-reserved': '保留所有权利',
        'page-under-construction': '页面正在建设中',
        'please-fill-required-fields': '请填写所有必填字段',
        'logging-in': '登录中...',
        'login-success': '登录成功，正在跳转...',
        'admin-panel': '管理后台',
        'login-subtitle': '请输入您的账号和密码',
        
        // 导航菜单
        'dashboard': '概述',
        'products': '产品',
        'orders': '订单',
        'customers': '客户',
        'marketing': '营销',
        'payments': '支付设置',
        'shipping': '物流设置',
        'analytics': '分析',
        'staff': '员工管理',
        
        // 仪表盘页面
        'dashboard-title': '仪表盘',
        'total-orders': '总订单',
        'total-revenue': '总收入',
        'total-customers': '总客户',
        'total-products': '总产品',
        'sales-overview': '销售概览',
        'recent-orders': '最近订单',
        'top-products': '热门产品',
        'inventory-alerts': '库存提醒',
        'view-all-orders': '查看所有订单',
        
        // 订单状态
        'completed': '已完成',
        'processing': '处理中',
        'shipped': '已发货',
        'cancelled': '已取消',
        
        // 表格标题
        'order-id': '订单号',
        'customer': '客户',
        'date': '日期',
        'status': '状态',
        'amount': '金额',
        'product': '产品',
        'sales': '销量',
        'revenue': '收入',
        'current-stock': '当前库存',
        'action': '操作',
        'name': '姓名',
        'email': '邮箱',
        'phone': '电话',
        'orders': '订单数',
        'total-spent': '消费总额',
        
        // 库存状态
        'low-stock': '库存低',
        'critical': '紧急',
        'restock': '补货',
        'stock': '库存',
        
        // 登录页面
        'login': '登录',
        'username': '用户名',
        'password': '密码',
        'remember-me': '记住我',
        'login-button': '登录',
        'login-error': '用户名或密码错误',
        
        // 产品管理
        'add-product': '添加产品',
        'edit-product': '编辑产品',
        'delete-product': '删除产品',
        'product-name': '产品名称',
        'product-price': '产品价格',
        'product-original-price': '原价',
        'product-stock': '库存数量',
        'product-category': '产品分类',
        'product-description': '产品描述',
        'product-images': '产品图片',
        'product-is-new': '新品',
        'product-is-flash-sale': '限时特惠',
        'product-filter': '产品筛选',
        'all-categories': '所有分类',
        'sort-by-name': '按名称排序',
        'sort-by-price-asc': '价格从低到高',
        'sort-by-price-desc': '价格从高到低',
        'sort-by-stock': '按库存排序',
        'save-product': '保存产品',
        'confirm-delete': '确认删除',
        'confirm-delete-product': '确定要删除这个产品吗？此操作无法撤销。',
        'product-added': '产品添加成功',
        'product-updated': '产品更新成功',
        'product-deleted': '产品删除成功',
        'multilanguage-info': '多语言信息',
        'new-product': '新品',
        'flash-sale': '限时特惠',
        
        // 支付设置
        'payment-methods': '支付方式',
        'payment-settings': '支付配置',
        'default-currency': '默认货币',
        'tax-rate': '税率',
        'show-tax': '在结账页面显示税费',
        'enable-coupons': '启用优惠券',
        
        // 物流设置
        'shipping-methods': '物流方式',
        'shipping-regions': '配送区域',
        'default-region': '默认区域',
        'shipping-fee': '基础运费',
        'free-shipping-threshold': '免运费阈值',
        'free-shipping-threshold-hint': '订单金额超过此值将免运费',
        'enable-tracking': '启用物流跟踪',
        
        // 网站设置
        'basic-info': '基本信息',
        'site-name': '网站名称',
        'site-description': '网站描述',
        'site-logo': '网站Logo',
        'contact-email': '联系邮箱',
        'contact-phone': '联系电话',
        'social-media': '社交媒体',
        
        // 环境设置
        'environment': '环境',
        'staff-management': '员工管理',
        'page-settings': '页面设置',
        'merchant-notifications': '商家通知',
        'regions': '区域',
        'tax': '税收',
        
        // 客户管理
        'customer-list': '客户列表'
    },
    
    // 英文翻译
    'en-US': {
        // 通用
        'language': 'Language',
        'logout': 'Logout',
        'profile': 'Profile',
        'settings': 'Settings',
        'visit-site': 'Visit Site',
        'view-details': 'View Details',
        'save-settings': 'Save Settings',
        'cancel': 'Cancel',
        'notification': 'Notification',
        'all-rights-reserved': 'All Rights Reserved',
        'page-under-construction': 'Page Under Construction',
        'please-fill-required-fields': 'Please fill all required fields',
        'logging-in': 'Logging in...',
        'login-success': 'Login successful, redirecting...',
        'admin-panel': 'Admin Panel',
        'login-subtitle': 'Please enter your credentials',
        
        // 导航菜单
        'dashboard': 'Dashboard',
        'products': 'Products',
        'orders': 'Orders',
        'customers': 'Customers',
        'marketing': 'Marketing',
        'payments': 'Payment Settings',
        'shipping': 'Shipping Settings',
        'analytics': 'Analytics',
        'staff': 'Staff Management',
        
        // 仪表盘页面
        'dashboard-title': 'Dashboard',
        'total-orders': 'Total Orders',
        'total-revenue': 'Total Revenue',
        'total-customers': 'Total Customers',
        'total-products': 'Total Products',
        'sales-overview': 'Sales Overview',
        'recent-orders': 'Recent Orders',
        'top-products': 'Top Products',
        'inventory-alerts': 'Inventory Alerts',
        'view-all-orders': 'View All Orders',
        
        // 订单状态
        'completed': 'Completed',
        'processing': 'Processing',
        'shipped': 'Shipped',
        'cancelled': 'Cancelled',
        
        // 表格标题
        'order-id': 'Order ID',
        'customer': 'Customer',
        'date': 'Date',
        'status': 'Status',
        'amount': 'Amount',
        'product': 'Product',
        'sales': 'Sales',
        'revenue': 'Revenue',
        'current-stock': 'Current Stock',
        'action': 'Action',
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'orders': 'Orders',
        'total-spent': 'Total Spent',
        
        // 库存状态
        'low-stock': 'Low Stock',
        'critical': 'Critical',
        'restock': 'Restock',
        'stock': 'Stock',
        
        // 登录页面
        'login': 'Login',
        'username': 'Username',
        'password': 'Password',
        'remember-me': 'Remember Me',
        'login-button': 'Login',
        'login-error': 'Invalid username or password',
        
        // 产品管理
        'add-product': 'Add Product',
        'edit-product': 'Edit Product',
        'delete-product': 'Delete Product',
        'product-name': 'Product Name',
        'product-price': 'Product Price',
        'product-original-price': 'Original Price',
        'product-stock': 'Stock Quantity',
        'product-category': 'Product Category',
        'product-description': 'Product Description',
        'product-images': 'Product Images',
        'product-is-new': 'New Product',
        'product-is-flash-sale': 'Flash Sale',
        'product-filter': 'Product Filter',
        'all-categories': 'All Categories',
        'sort-by-name': 'Sort by Name',
        'sort-by-price-asc': 'Price: Low to High',
        'sort-by-price-desc': 'Price: High to Low',
        'sort-by-stock': 'Sort by Stock',
        'save-product': 'Save Product',
        'confirm-delete': 'Confirm Delete',
        'confirm-delete-product': 'Are you sure you want to delete this product? This action cannot be undone.',
        'product-added': 'Product added successfully',
        'product-updated': 'Product updated successfully',
        'product-deleted': 'Product deleted successfully',
        'multilanguage-info': 'Multilanguage Information',
        'new-product': 'New',
        'flash-sale': 'Flash Sale',
        
        // 支付设置
        'payment-methods': 'Payment Methods',
        'payment-settings': 'Payment Settings',
        'default-currency': 'Default Currency',
        'tax-rate': 'Tax Rate',
        'show-tax': 'Show Tax on Checkout Page',
        'enable-coupons': 'Enable Coupons',
        
        // 物流设置
        'shipping-methods': 'Shipping Methods',
        'shipping-regions': 'Shipping Regions',
        'default-region': 'Default Region',
        'shipping-fee': 'Base Shipping Fee',
        'free-shipping-threshold': 'Free Shipping Threshold',
        'free-shipping-threshold-hint': 'Orders above this amount will have free shipping',
        'enable-tracking': 'Enable Tracking',
        
        // 网站设置
        'basic-info': 'Basic Information',
        'site-name': 'Site Name',
        'site-description': 'Site Description',
        'site-logo': 'Site Logo',
        'contact-email': 'Contact Email',
        'contact-phone': 'Contact Phone',
        'social-media': 'Social Media',
        
        // 环境设置
        'environment': 'Environment',
        'staff-management': 'Staff Management',
        'page-settings': 'Page Settings',
        'merchant-notifications': 'Merchant Notifications',
        'regions': 'Regions',
        'tax': 'Tax',
        
        // 客户管理
        'customer-list': 'Customer List'
    },
    
    // 印尼文翻译
    'id-ID': {
        // 通用
        'language': 'Bahasa',
        'logout': 'Keluar',
        'profile': 'Profil',
        'settings': 'Pengaturan',
        'visit-site': 'Kunjungi Situs',
        'view-details': 'Lihat Detail',
        'save-settings': 'Simpan Pengaturan',
        'cancel': 'Batal',
        'notification': 'Notifikasi',
        'all-rights-reserved': 'Hak Cipta Dilindungi',
        'page-under-construction': 'Halaman Dalam Konstruksi',
        'please-fill-required-fields': 'Harap isi semua bidang yang diperlukan',
        'logging-in': 'Masuk...',
        'login-success': 'Login berhasil, mengalihkan...',
        'admin-panel': 'Panel Admin',
        'login-subtitle': 'Silakan masukkan kredensial Anda',
        
        // 导航菜单
        'dashboard': 'Dasbor',
        'products': 'Produk',
        'orders': 'Pesanan',
        'customers': 'Pelanggan',
        'marketing': 'Pemasaran',
        'payments': 'Pengaturan Pembayaran',
        'shipping': 'Pengaturan Pengiriman',
        'analytics': 'Analitik',
        'staff': 'Manajemen Staf',
        
        // 仪表盘页面
        'dashboard-title': 'Dasbor',
        'total-orders': 'Total Pesanan',
        'total-revenue': 'Total Pendapatan',
        'total-customers': 'Total Pelanggan',
        'total-products': 'Total Produk',
        'sales-overview': 'Ikhtisar Penjualan',
        'recent-orders': 'Pesanan Terbaru',
        'top-products': 'Produk Terlaris',
        'inventory-alerts': 'Peringatan Inventaris',
        'view-all-orders': 'Lihat Semua Pesanan',
        
        // 订单状态
        'completed': 'Selesai',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'cancelled': 'Dibatalkan',
        
        // 表格标题
        'order-id': 'ID Pesanan',
        'customer': 'Pelanggan',
        'date': 'Tanggal',
        'status': 'Status',
        'amount': 'Jumlah',
        'product': 'Produk',
        'sales': 'Penjualan',
        'revenue': 'Pendapatan',
        'current-stock': 'Stok Saat Ini',
        'action': 'Tindakan',
        'name': 'Nama',
        'email': 'Email',
        'phone': 'Telepon',
        'orders': 'Pesanan',
        'total-spent': 'Total Pengeluaran',
        
        // 库存状态
        'low-stock': 'Stok Rendah',
        'critical': 'Kritis',
        'restock': 'Restock',
        'stock': 'Stok',
        
        // 登录页面
        'login': 'Masuk',
        'username': 'Nama Pengguna',
        'password': 'Kata Sandi',
        'remember-me': 'Ingat Saya',
        'login-button': 'Masuk',
        'login-error': 'Nama pengguna atau kata sandi tidak valid',
        
        // 产品管理
        'add-product': 'Tambah Produk',
        'edit-product': 'Edit Produk',
        'delete-product': 'Hapus Produk',
        'product-name': 'Nama Produk',
        'product-price': 'Harga Produk',
        'product-original-price': 'Harga Asli',
        'product-stock': 'Jumlah Stok',
        'product-category': 'Kategori Produk',
        'product-description': 'Deskripsi Produk',
        'product-images': 'Gambar Produk',
        'product-is-new': 'Produk Baru',
        'product-is-flash-sale': 'Flash Sale',
        'product-filter': 'Filter Produk',
        'all-categories': 'Semua Kategori',
        'sort-by-name': 'Urutkan berdasarkan Nama',
        'sort-by-price-asc': 'Harga: Rendah ke Tinggi',
        'sort-by-price-desc': 'Harga: Tinggi ke Rendah',
        'sort-by-stock': 'Urutkan berdasarkan Stok',
        'save-product': 'Simpan Produk',
        'confirm-delete': 'Konfirmasi Hapus',
        'confirm-delete-product': 'Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.',
        'product-added': 'Produk berhasil ditambahkan',
        'product-updated': 'Produk berhasil diperbarui',
        'product-deleted': 'Produk berhasil dihapus',
        'multilanguage-info': 'Informasi Multi Bahasa',
        'new-product': 'Baru',
        'flash-sale': 'Flash Sale',
        
        // 支付设置
        'payment-methods': 'Metode Pembayaran',
        'payment-settings': 'Pengaturan Pembayaran',
        'default-currency': 'Mata Uang Default',
        'tax-rate': 'Tarif Pajak',
        'show-tax': 'Tampilkan Pajak di Halaman Checkout',
        'enable-coupons': 'Aktifkan Kupon',
        
        // 物流设置
        'shipping-methods': 'Metode Pengiriman',
        'shipping-regions': 'Wilayah Pengiriman',
        'default-region': 'Wilayah Default',
        'shipping-fee': 'Biaya Pengiriman Dasar',
        'free-shipping-threshold': 'Ambang Bebas Ongkir',
        'free-shipping-threshold-hint': 'Pesanan di atas jumlah ini akan mendapatkan pengiriman gratis',
        'enable-tracking': 'Aktifkan Pelacakan',
        
        // 网站设置
        'basic-info': 'Informasi Dasar',
        'site-name': 'Nama Situs',
        'site-description': 'Deskripsi Situs',
        'site-logo': 'Logo Situs',
        'contact-email': 'Email Kontak',
        'contact-phone': 'Telepon Kontak',
        'social-media': 'Media Sosial',
        
        // 环境设置
        'environment': 'Lingkungan',
        'staff-management': 'Manajemen Staf',
        'page-settings': 'Pengaturan Halaman',
        'merchant-notifications': 'Notifikasi Pedagang',
        'regions': 'Wilayah',
        'tax': 'Pajak',
        
        // 客户管理
        'customer-list': 'Daftar Pelanggan'
    }
};

// 导出翻译数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
